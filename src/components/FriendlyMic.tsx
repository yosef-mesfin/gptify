"use client";
import "regenerator-runtime/runtime";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import MicIcon from "@mui/icons-material/Mic";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

const ButtonStyle = styled(Button)(({ theme }) => ({
	alignSelf: "center",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	background: "linear-gradient(90deg, #0E1D52, #762B89 66%)",
	borderRadius: "50%",
	height: "93%",
	width: "100%",
	minWidth: "64px",
	"&:hover": {
		boxShadow: "0 0 0.5rem #fff",
	},

	[theme.breakpoints.down("md")]: {
		height: "64px",
		width: "64px",
		minWidth: "64px",
	},
}));

const MicIconStyle = styled(MicIcon)({
	filter: "drop-shadow(0 0 .1rem #fff)",
	color: "#000",
	fontSize: "3rem",
});

type FriendlyMicProps = Readonly<{
	onFinish: (output: string) => void;
}>;

export default function FriendlyMic({ onFinish }: FriendlyMicProps) {
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();
	const [isClient, setIsClient] = useState(false);

	const handleClick = () => {
		if (listening) {
			SpeechRecognition.stopListening();
		} else {
			SpeechRecognition.startListening();
		}
	};

	useEffect(() => {
		console.log("FriendlyMic component rendered");
	});

	useEffect(() => {
		setIsClient(true);
	}, [browserSupportsSpeechRecognition]);

	useEffect(() => {
		if (!listening && transcript) {
			console.log("transcript", transcript);
			onFinish(transcript);
			resetTranscript();
		}
	}, [listening, transcript, onFinish, resetTranscript]);

	if (isClient && !browserSupportsSpeechRecognition) {
		return (
			<Alert severity="error">
				Your browser does not support speech recognition
			</Alert>
		);
	}

	return (
		<ButtonStyle onClick={handleClick}>
			<MicIconStyle />
		</ButtonStyle>
	);
}
