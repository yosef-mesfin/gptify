import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import FriendlyMic from "./FriendlyMic";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import ThreeDPlaceholder from "./ThreeDPlaceholder";
import WelcomeContainer from "./WelcomeContainer";
import ThreeDPlaceholder from "./ThreeDPlaceholder";

type ChatPlaygroundProps = {
	open: boolean;
	onFinish: (query: string) => Promise<void>;
	currentOutput: {
		title: string;
		content: string | null;
	};
};

const PlaygroundWrapper = styled(Box)<{ open: boolean }>(({ theme, open }) => ({
	flexGrow: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: theme.spacing(3),
	marginLeft: open ? `calc(240px + ${theme.spacing(8)})` : theme.spacing(15),
	paddingBottom: theme.spacing(5),
	height: "100%",
	transition: theme.transitions.create(["margin-left", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
}));

const ChatBodyWrapper = styled(Box)(({ theme }) => ({
	flexGrow: 1,
	width: "70%",
	overflowY: "auto",
	padding: theme.spacing(2),
}));

const PromptWrapper = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	width: "70%",
	padding: theme.spacing(2),
	height: "100px",
}));

const FancyTextField = styled(TextField)(({ theme }) => ({
	width: "65%",
	borderRadius: "50px 4px 4px 50px",
	border: "2px solid rgba(255, 0, 255, 0.3)",
	background: "#390442f7",
	backgroundOrigin: "border-box",
	backgroundClip: "content-box, border-box",
	"& .MuiOutlinedInput-root": {
		color: "white",
		borderRadius: "50px 0 0 50px",
		"&:hover fieldset": {
			borderColor: "rgba(255, 0, 255, 0.5)",
		},
		"&.Mui-focused fieldset": {
			borderColor: "rgba(255, 0, 255, 0.7)",
			boxShadow: "0 0 8px rgba(255, 0, 255, 0.5)",
		},
		"& fieldset": {
			borderWidth: "0",
		},
	},
	"& .MuiOutlinedInput-input": {
		padding: theme.spacing(2.7),
	},
	"& .MuiInputAdornment-root": {
		marginRight: theme.spacing(1),
	},
}));

const PromptIconButtonsWrapper = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "start",
	alignItems: "center",
	borderRadius: "0 50px 50px 0",
	background: "#000515",
	borderLeft: "0px",
	paddingRight: 0,
	marginLeft: 0,
	height: "100%",
}));

const FancyIconButton = styled(IconButton)(({ theme }) => ({}));

const ChatPlayground: React.FC<ChatPlaygroundProps> = ({
	open,
	onFinish,
	currentOutput,
}) => {
	const [input, setInput] = useState("");

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value);
	};

	const handleSubmit = async () => {
		await onFinish(input);
		setInput("");
	};

	// let's have a wrapper for threedPlaceholder which is going to be at the top right corner of the chat playground

	const ThreeDPlaceHolderWrapper = styled(Box)(({ theme }) => ({
		position: "absolute",
		top: theme.spacing(2),
		right: theme.spacing(2),
		height: "200px",
		width: "200px",
	}));

	return (
		<PlaygroundWrapper open={open}>
			<ChatBodyWrapper>
				{/* <ThreeDPlaceholder /> */}
				<WelcomeContainer userName="Rodya" />
			</ChatBodyWrapper>
			<PromptWrapper>
				<FancyTextField
					variant="outlined"
					placeholder="Enter your prompt here..."
					InputProps={{
						endAdornment: (
							<IconButton sx={{ color: "#88728d" }}>
								<SendIcon />
							</IconButton>
						),
					}}
				/>
				<PromptIconButtonsWrapper>
					<FancyIconButton sx={{ color: "#88728d" }}>
						<AttachFileIcon sx={{ fontSize: "2rem" }} />
					</FancyIconButton>
					<FancyIconButton
						sx={{
							color: "#88728d",
							paddingLeft: "0",
							marginRight: ".5rem",
						}}
					>
						<AddPhotoAlternateIcon sx={{ fontSize: "2rem" }} />
					</FancyIconButton>
					<FriendlyMic onFinish={onFinish} />
				</PromptIconButtonsWrapper>
			</PromptWrapper>
			<ThreeDPlaceHolderWrapper>
				<ThreeDPlaceholder />
			</ThreeDPlaceHolderWrapper>
		</PlaygroundWrapper>
	);
};

export default ChatPlayground;