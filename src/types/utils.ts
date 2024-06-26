export type Analyzer = {
	fftSize: number;
	frequencyBinCount: number;
	getByteFrequencyData: (array: Uint8Array) => void;
};
