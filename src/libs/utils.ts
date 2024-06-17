export const blobToBase64 = async (
	blob: Blob,
	callback: (base64: string) => void
) => {
	const reader = new FileReader();
	reader.onload = () => {
		const base64 = reader.result as string;
		callback(base64);
	};
	reader.readAsDataURL(blob);
};

type Analyzer = {
	fftSize: number;
	frequencyBinCount: number;
	getByteFrequencyData: (array: Uint8Array) => void;
};

// Function to  calculate the pick level from the analyser data
const getPeakLevel = (analyzer: Analyzer) => {
	const array = new Uint8Array(analyzer.fftSize);

	// Get the time domain data from the analyzer and store it in the array
	analyzer.getByteFrequencyData(array);

	// Calculate the peak level by finding the maximum absolute deviation from 127
	return (
		array.reduce((max, current) => Math.max(max, Math.abs(current - 127)), 0) /
		128
	);
};

export const createMediaStream = (
	stream: MediaStream,
	isRecording: boolean,
	callback: (peakLevel: number) => void
) => {
	//create  anew audio context
	const context = new AudioContext();

	// Create a media stream source node from the input stream
	const source = context.createMediaStreamSource(stream);

	// Create an analyzer node for audio analysis
	const analyzer = context.createAnalyser();

	// Connect the source node to the analyzer node
	source.connect(analyzer);

	// Function to continuously analyze audio data and invoke the callback
	const tick = () => {
		// Calculate the peak level using the getPeakLevel function
		const peakLevel = getPeakLevel(analyzer);
		if (isRecording) {
			callback(peakLevel);

			// Request the next animation frame for continuous analysis
			requestAnimationFrame(tick);
		}
	};

	// Start the continuous analysis loop
	tick();
};
