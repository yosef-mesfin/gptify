"use client";
import { useState, useEffect, useRef } from "react";
import { blobToBase64, createMediaStream } from "@/libs/utils";

export const useRecordVoice = () => {
	// State to hold the current transcription text
	const [text, setText] = useState("");

	// State to hold the media recorder instance
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
		null
	);
	// State to track whether recording is currently in progress
	const [recording, setRecording] = useState(false);
	const isRecording = useRef(false);
	const [Error, setError] = useState<string | null>(null);

	// Ref to store audio chunks during recording
	const chunks = useRef<Blob[]>([]);

	// Function to start recording
	const startRecording = () => {
		if (mediaRecorder) {
			isRecording.current = true;
			mediaRecorder.start();
			setRecording(true);
		} else {
			setError("Error: MediaRecorder not initialized");
		}
	};

	// Function to stop recording
	const stopRecording = () => {
		if (mediaRecorder) {
			isRecording.current = false;
			mediaRecorder.stop();
			setRecording(false);
		} else {
			setError("Error: MediaRecorder not initialized");
		}
	};

	// Function to reset the recording
	const resetRecording = () => {
		chunks.current = [];
	};

	// Function to convert the audio blob to base64 and get the transcription
	const getText = async (base64data: string) => {
		try {
			const response = await fetch("/api/speechToText", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ audio: base64data }),
			}).then((res) => res.json());

			const { text } = response;
			setText(text);
			setError(null);
		} catch (error) {
			console.error("Error transcribing audio:", error);
			setError("Error transcribing audio");
		}
	};

	// Function to initialize the media recorder with the provided stream
	const initializeMediaRecorder = (stream: MediaStream) => {
		try {
			const mediaRecorder = new MediaRecorder(stream);

			mediaRecorder.onstart = () => {
				// create media stream for audio analysis
				createMediaStream(stream, isRecording.current, (peakLevel) => {
					if (isRecording.current) {
						console.log("🚀 ~ peakLevel:", peakLevel);
					}
				});

				resetRecording();
			};

			mediaRecorder.ondataavailable = (event: BlobEvent) => {
				chunks.current.push(event.data);
			};

			mediaRecorder.onstop = () => {
				const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
				// convert the audio blob to base64
				blobToBase64(audioBlob, getText);
			};

			setMediaRecorder(mediaRecorder);
		} catch (error) {
			setError("Error initializing MediaRecorder");
		}
	};

	// Effect to initialize the media recorder when the component mounts
	useEffect(() => {
		if (typeof window !== "undefined" && navigator.mediaDevices) {
			navigator.mediaDevices
				.getUserMedia({ audio: true })
				.then(initializeMediaRecorder)
				.catch((error) => {
					console.error("Error accessing microphone:", error);
					setError("Error accessing microphone");
				});
		}
	}, []);

	return {
		mediaRecorder,
		startRecording,
		stopRecording,
		recording,
		text,
		Error,
	};
};
