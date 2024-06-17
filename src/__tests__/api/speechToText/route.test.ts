import { POST } from "@/app/api/speechToText/route";
import { NextRequest, NextResponse } from "next/server";

// Mock the OpenAI module
jest.mock("openai", () => {
	const mockOpenAI = {
		audio: {
			transcriptions: {
				create: jest.fn(async () => ({
					text: "This is a test transcription.",
				})),
			},
		},
	};

	return jest.fn(() => mockOpenAI);
});

// Mock the NextResponse
jest.mock("next/server", () => ({
	NextRequest: jest.fn(),
	NextResponse: {
		json: jest.fn((data) => ({ status: 200, json: async () => data })),
		error: jest.fn(() => ({ status: 500 })),
	},
}));

// let's mock the fs module
jest.mock("fs", () => ({
	writeFileSync: jest.fn(),
	createReadStream: jest.fn(),
	unlinkSync: jest.fn(),
}));

describe("POST /api/speechToText", () => {
	it("should return a successful transcription with valid base64 audio data", async () => {
		const base64Audio =
			"UklGRk4AAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YU4AAA==";
		const mockResponseData = {
			text: "This is a test transcription.",
		};

		// Mock the request
		const req = {
			json: async () => ({ audio: base64Audio }),
		} as NextRequest;

		const res = await POST(req);

		// Validate the response
		expect(NextResponse.json).toHaveBeenCalled();
		expect(res.status).toBe(200);

		const jsonResponse = await res.json();
		expect(jsonResponse.text).toBe(mockResponseData.text);
	});

	it("should handle missing audio field in the request body", async () => {
		const req = {
			json: async () => ({}),
		} as NextRequest;

		const res = await POST(req);

		// Validate the response
		expect(NextResponse.error).toHaveBeenCalled();
		expect(res.status).toBe(500);
	});

	it("should create a temporary WAV file and remove it after processing", async () => {
		const base64Audio =
			"UklGRk4AAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YU4AAA==";

		const req = {
			json: async () => ({ audio: base64Audio }),
		} as NextRequest;

		await POST(req);

		// Validate the fs module functions
		expect(require("fs").writeFileSync).toHaveBeenCalled();
		expect(require("fs").createReadStream).toHaveBeenCalled();
		expect(require("fs").unlinkSync).toHaveBeenCalled();
	});
});
