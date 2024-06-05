"use client";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import MicIcon from "@mui/icons-material/Mic";
import { useEffect, useRef } from "react";

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
	boxShadow: "0 0 0.3rem #fff",
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
	const recognition = useRef<any>(null);

	const handleClick = () => {
		if (recognition.current) {
			recognition.current.start();
		}
	};

	useEffect(() => {
		// recognition.onstart = function () {
		//   action.innerHTML = ;
		// };

		// recognition.onspeechend = function () {
		//   recognition.stop();
		// };

		recognition.current = new (window.SpeechRecognition ||
			window.webkitSpeechRecognition)();

		recognition.current.onresult = function (event: any) {
			const transcript = event.results[0][0].transcript;
			const confidence = event.results[0][0].confidence;
			onFinish && onFinish(transcript);
		};
	}, [recognition, onFinish]);

	return (
		<ButtonStyle onClick={handleClick}>
			<MicIconStyle />
		</ButtonStyle>
	);
}
