import { blobToBase64 } from "@/libs/utils";
import { getPeakLevel } from "@/libs/utils";
import { Analyzer } from "@/types/utils";

//Mock FileReader

class FileReaderMock {
	DONE = FileReader.DONE;
	EMPTY = FileReader.EMPTY;
	LOADING = FileReader.LOADING;
	readyState = 0;
	error: FileReader["error"] = null;
	result: FileReader["result"] = null;
	abort = jest.fn();
	addEventListener = jest.fn();
	dispatchEvent = jest.fn();
	onabort = jest.fn();
	onerror = jest.fn();
	onload = jest.fn();
	onloadend = jest.fn();
	onloadprogress = jest.fn();
	onloadstart = jest.fn();
	onprogress = jest.fn();
	readAsArrayBuffer = jest.fn();
	readAsBinaryString = jest.fn();
	readAsDataURL = jest.fn();
	readAsText = jest.fn();
	removeEventListener = jest.fn();
}

describe("blobToBase64", () => {
	let FileReaderOriginal: typeof FileReader;

	beforeAll(() => {
		FileReaderOriginal = global.FileReader;
	});

	afterAll(() => {
		global.FileReader = FileReaderOriginal;
	});

	it("should call the callback with the base64 data", async () => {
		const blob = new Blob(["test"]);
		const callback = jest.fn();
		const reader = new FileReaderMock();
		const base64Result = "data:text/plain;base64,dGVzdA==";

		jest.spyOn(global, "FileReader").mockImplementation(() => reader as any);

		blobToBase64(blob, callback);

		// Simulate the onload event
		reader.result = base64Result;
		reader.onload?.({} as any);

		// Assert
		expect(reader.readAsDataURL).toHaveBeenCalledWith(blob);
		expect(callback).toHaveBeenCalledWith(base64Result);
	});
});

describe("getPeakLevel", () => {
	const mockAnalyzer: Analyzer = {
		fftSize: 256,
		frequencyBinCount: 127,
		getByteFrequencyData: jest.fn(),
	};

	it("should return the peak level from the analyzer data", () => {
		const mockData = new Uint8Array(mockAnalyzer.fftSize);
		mockAnalyzer.getByteFrequencyData = (array: Uint8Array) => {
			array.set(mockData);
		};

		// Test Case: Peak level is 0
		mockData.fill(127);
		expect(getPeakLevel(mockAnalyzer)).toBe(0);

		// Test Case: Peak level is 1
		mockData.fill(255);
		expect(getPeakLevel(mockAnalyzer)).toBe(1);

		// Test Case: Peak level is close to 1 (0.9921875)
		mockData.fill(0);
		expect(getPeakLevel(mockAnalyzer)).toBeCloseTo(0.9921875, 0);

		// Test Case: Mixed peak level
		mockData.set([127, 200, 50, 180, 90, 150, 30]);
		expect(getPeakLevel(mockAnalyzer)).toBeCloseTo((200 - 127) / 128, 0);
	});
});
