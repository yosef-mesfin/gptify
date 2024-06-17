"use client";
import { Button } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
import MicIcon from "@mui/icons-material/Mic";
import { useRecordVoice } from "@/hooks/useRecordVoice";
import { useEffect } from "react";

const ButtonStyle = styled(Button)(({ theme }: { theme: Theme }) => ({
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

	"&:hover svg": {
		color: "#ff00ff",
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

	"&:hover": {
		color: "#ff00ff",
	},
});

type FriendlyMicProps = Readonly<{
	onFinish: (output: string) => void;
}>;

export default function FriendlyMic({ onFinish }: FriendlyMicProps) {
	const { startRecording, stopRecording, text } = useRecordVoice();
	console.log("🚀 ~ FriendlyMic ~ text:", text);

	useEffect(() => {
		if (text) {
			onFinish(text);
		}
	}, [text, onFinish]);

	return (
		<ButtonStyle
			onMouseDown={startRecording}
			onMouseUp={stopRecording}
			onTouchStart={startRecording}
			onTouchEnd={stopRecording}
		>
			<MicIconStyle />
		</ButtonStyle>
	);
}
