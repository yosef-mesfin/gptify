import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

type RequestBody = {
	audio: string;
};

type ResponseDataType = {
	text: string;
};

export async function POST(req: NextRequest) {
	const body: RequestBody = await req.json();

	const { audio: base64Audio } = body;

	if (!base64Audio) {
		return NextResponse.error();
	}

	let audio;
	try {
		// Convert the base64 audio data to a Buffer
		audio = Buffer.from(base64Audio, "base64");
	} catch (error) {
		return NextResponse.error();
	}

	// Define the file path for storing the temporary WAV file
	const filePath = "tmp/input.wav";

	try {
		// Write the audio data to a temporary WAV file synchronously
		fs.writeFileSync(filePath, audio);

		// Create a readable stream from the temporary WAV file
		const readStream = fs.createReadStream(filePath);

		const data: ResponseDataType = await openai.audio.transcriptions.create({
			file: readStream,
			model: "whisper-1",
		});

		// Remove the temporary file after successful processing
		fs.unlinkSync(filePath);

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error processing audio:", error);
		return NextResponse.error();
	}
}
