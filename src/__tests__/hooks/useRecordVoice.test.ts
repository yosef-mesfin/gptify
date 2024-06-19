import { act, renderHook } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import { useRecordVoice } from "@/hooks/useRecordVoice";
import { createMediaStream } from "@/libs/utils";

// Mock the media recorder and navigator.mediaDevices
const mockMediaRecorder = jest.fn().mockImplementation((stream) => ({
	start: jest.fn(),
	stop: jest.fn(),
	pause: jest.fn(),
	resume: jest.fn(),
	state: "inactive",
	ondataavailable: null,
	onstart: null,
	onstop: null,
}));

Object.defineProperty(global, "MediaRecorder", {
	writable: true,
	value: mockMediaRecorder,
});

Object.defineProperty(MediaRecorder, "isTypeSupported", {
	writable: true,
	value: () => true,
});

// Mock MediaStream
class MockMediaStream {
	getTracks() {
		return [{ stop: jest.fn() }];
	}
}

// Mock getUserMedia
const mockGetUserMedia = jest.fn(() => Promise.resolve(new MockMediaStream()));

// Override navigator.mediaDevices property
Object.defineProperty(global.navigator, "mediaDevices", {
	value: {
		getUserMedia: mockGetUserMedia,
	},
	configurable: true,
});

// Mock the blobToBase64 utility
jest.mock("@/libs/utils", () => ({
	blobToBase64: jest.fn((blob, callback) => callback("base64audio")),
	createMediaStream: jest.fn(),
}));

class MockBlobEvent extends Event {
	data: Blob;
	timecode: number;

	constructor(
		type: string,
		eventInitDict: EventInit & { data: Blob; timecode: number }
	) {
		super(type, eventInitDict);
		this.data = eventInitDict.data;
		this.timecode = eventInitDict.timecode;
	}
}

// Mock fetch globally
global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({ text: "base64audio" }),
	})
) as jest.Mock;

describe("useRecordVoice", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	// Test case 1 - initialize state values
	it("should initialize state values", () => {
		const { result } = renderHook(() => useRecordVoice());

		expect(result.current.text).toBe("");
		expect(result.current.recording).toBe(false);
		expect(typeof result.current.startRecording).toBe("function");
		expect(typeof result.current.stopRecording).toBe("function");
	});

	//Test case  2 - initialize media recorder
	it("should initialize the media recorder", async () => {
		renderHook(() => useRecordVoice());

		// Check if getUserMedia is called with the correct constraints
		expect(mockGetUserMedia).toHaveBeenCalledWith({ audio: true });

		await waitFor(() => {
			expect(MediaRecorder).toHaveBeenCalledWith(expect.any(MockMediaStream));
		});

		// Check if CreateMediaStream is called with the correct parameters
		const mediaRecorderInstance = mockMediaRecorder.mock.results[0].value;
		if (mediaRecorderInstance.onstart) {
			mediaRecorderInstance.onstart(new Event("start"));
		}

		expect(createMediaStream).toHaveBeenCalledWith(
			expect.any(MockMediaStream),
			false,
			expect.any(Function)
		);
	});

	// Test case 3 - start recording
	it("should set the recording to true when startRecording is called", async () => {
		const { result, waitForNextUpdate } = renderHook(() => useRecordVoice());

		// wait for mediaRecorder to be initialized
		await waitForNextUpdate();

		act(() => {
			result.current.startRecording();
		});

		// Asserts
		expect(result.current.recording).toBe(true);
	});

	// Test case 4 - stop recording
	it("should set recording to false and handle data available when stopRecording is called", async () => {
		const { result, waitForNextUpdate } = renderHook(() => useRecordVoice());

		await waitForNextUpdate();

		act(() => {
			result.current.startRecording();
		});

		expect(result.current.recording).toBe(true);

		act(() => {
			const mediaRecorderInstance = mockMediaRecorder.mock.results[0].value;

			if (mediaRecorderInstance.ondataavailable) {
				const dataAvailableEvent = new MockBlobEvent("dataavailable", {
					data: new Blob(["audio data"], { type: "audio/wav" }),
					timecode: 0,
				});
				mediaRecorderInstance.ondataavailable(dataAvailableEvent);
			}

			if (mediaRecorderInstance.onstop) {
				mediaRecorderInstance.onstop(new Event("stop"));
			}

			result.current.stopRecording();
		});

		expect(result.current.recording).toBe(false);
		const { blobToBase64 } = require("@/libs/utils");
		expect(blobToBase64).toHaveBeenCalledWith(
			expect.any(Blob),
			expect.any(Function)
		);

		await waitFor(() => {
			expect(result.current.text).toBe("base64audio");
		});
	});

	// Test case 5 - set error when failing to access the microphone
	it("should set error when the failing to access the microphone", async () => {
		const error = new Error("Error accessing microphone");
		mockGetUserMedia.mockRejectedValueOnce(error);

		const { result, waitForNextUpdate } = renderHook(() => useRecordVoice());

		await waitForNextUpdate();

		// Asserts
		expect(result.current.Error).toBe("Error accessing microphone");
	});

	// Test case 6 - error handling for transcription failure
	it("should set error when failing to transcribe audio", async () => {
		// Mock the fetch function to reject the promise
		global.fetch = jest.fn(() =>
			Promise.reject(new Error("Error transcribing audio"))
		);

		const { result, waitForNextUpdate } = renderHook(() => useRecordVoice());

		await waitForNextUpdate();

		act(() => {
			result.current.startRecording();
		});

		act(() => {
			const mediaRecorderInstance = result.current.mediaRecorder;

			if (mediaRecorderInstance && mediaRecorderInstance.ondataavailable) {
				const dataAvailableEvent = new MockBlobEvent("dataavailable", {
					data: new Blob(["audio data"], { type: "audio/wav" }),
					timecode: 0,
				});
				mediaRecorderInstance.ondataavailable(dataAvailableEvent);
			}

			if (mediaRecorderInstance && mediaRecorderInstance.onstop) {
				mediaRecorderInstance.onstop(new Event("stop"));
			}

			result.current.stopRecording();
		});

		expect(result.current.recording).toBe(false);

		await waitFor(() => {
			expect(result.current.Error).toBe("Error transcribing audio");
		});
	});
});
