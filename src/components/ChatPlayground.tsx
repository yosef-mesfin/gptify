import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import FriendlyMic from "./FriendlyMic";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import WelcomeContainer from "./WelcomeContainer";
import ThreeDPlaceholder from "./ThreeDPlaceholder";
import useResponsive from "@/hooks/useResponsive";

type ChatPlaygroundProps = {
	open: boolean;
	onFinish: (query: string) => Promise<void>;
	currentOutput: {
		title: string;
		content: string | null;
	};
};

const PlaygroundWrapper = styled(Box, {
	shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})<{
	open: boolean;
	isMobile: boolean | undefined;
}>(({ theme, open, isMobile }) => ({
	flexGrow: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: `${theme.spacing(3)} 0`,
	marginLeft: isMobile
		? 0
		: open
		? `calc(260px + ${theme.spacing(8)})`
		: theme.spacing(8),
	paddingBottom: theme.spacing(5),
	height: "100%",
	transition: theme.transitions.create(["margin-left", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	[theme.breakpoints.between("md", "lg")]: {
		marginLeft: 0,
	},
	[theme.breakpoints.down("md")]: {
		marginLeft: 0,
	},
}));

const ChatBodyWrapper = styled(Box)(({ theme }) => ({
	flexGrow: 1,
	width: "70%",
	overflowY: "auto",

	[theme.breakpoints.down("md")]: {
		width: "100%",
	},
}));

const PromptWrapper = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	width: "70%",
	padding: theme.spacing(2),
	height: "100px",

	[theme.breakpoints.down("md")]: {
		width: "100%",
		// height: "90px",
		Padding: theme.spacing(1),
		marginBottom: theme.spacing(2),
	},

	[theme.breakpoints.down("sm")]: {
		justifyContent: "space-between",
		gap: theme.spacing(1),
		alignItems: "flex-end",
		height: "fit-content",
	},
}));

const FancyTextField = styled(TextField)(({ theme }) => ({
	width: "60%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "50px 4px 4px 50px",
	background: "#41044cf7",
	backgroundOrigin: "border-box",
	backgroundClip: "content-box, border-box",
	"& .MuiOutlinedInput-root": {
		color: "white",
		height: "100%",
		width: "100%",
		borderRadius: "50px 0 0 50px",
		paddingLeft: theme.spacing(1),
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
	// "& .MuiOutlinedInput-input": {
	// 	height: "100%",
	// },
	"& .MuiInputAdornment-root": {
		marginRight: theme.spacing(1),
	},

	[theme.breakpoints.between("md", "lg")]: {
		width: "100%",
	},

	[theme.breakpoints.down("md")]: {
		width: "70%",
	},
	[theme.breakpoints.down("sm")]: {
		width: "100%",
		borderRadius: "50px",
		height: "70px",
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

	[theme.breakpoints.down("sm")]: {
		flexDirection: "column",
		justifyContent: "flex-start",
		background: "transparent",
		borderRadius: "0px",
		gap: theme.spacing(0.5),
	},
}));

const ThreeDPlaceHolderWrapper = styled(Box)(({ theme }) => ({
	position: "absolute",
	top: theme.spacing(0),
	right: theme.spacing(0),
	height: "200px",
	width: "200px",
	// scale: "0.8",
	[theme.breakpoints.down("lg")]: {
		scale: "0.8",
		top: theme.spacing(-2),
		right: theme.spacing(-2),
	},
}));

const FancyIconButton = styled(IconButton)(({ theme }) => ({
	borderRadius: "50%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "50px",
	width: "50px",
	margin: theme.spacing(0.5),
	color: "#88728d",
	"&:hover": {
		background: "#390442f7",
		boxShadow: "0 0 8px rgba(255, 0, 255, 0.5)",
	},
	"&:hover svg": {
		color: "#ff00ff",
	},

	[theme.breakpoints.down("md")]: {
		height: "40px",
		width: "40px",
	},
}));

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

	const isMobile = useResponsive("down", "sm");

	return (
		<PlaygroundWrapper open={open} isMobile={isMobile}>
			<ChatBodyWrapper>
				{/* <ThreeDPlaceholder /> */}
				<WelcomeContainer userName="Rodya" />
			</ChatBodyWrapper>
			{/* {isMobile && <FriendlyMic onFinish={onFinish} />} */}
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
					{isMobile && <FriendlyMic onFinish={onFinish} />}
					<FancyIconButton>
						<AttachFileIcon sx={{ fontSize: "2rem" }} />
					</FancyIconButton>
					<FancyIconButton>
						<AddPhotoAlternateIcon sx={{ fontSize: "2rem" }} />
					</FancyIconButton>
					{!isMobile && <FriendlyMic onFinish={onFinish} />}
				</PromptIconButtonsWrapper>
			</PromptWrapper>
			<ThreeDPlaceHolderWrapper>
				<ThreeDPlaceholder />
			</ThreeDPlaceHolderWrapper>
		</PlaygroundWrapper>
	);
};

export default ChatPlayground;
