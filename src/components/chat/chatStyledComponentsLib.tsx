"use client";
import { Box, TextField, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PageWrapper = styled(Box)({
	padding: 0,
	margin: 0,
	width: "100%",
	height: "100vh",
});

/**********************| ChatContainer Styled Components |**********************/

export const ChatContainerWrapper = styled(Box)(({ theme }) => ({
	height: "100%",
	background: "transparent",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: theme.spacing(5),

	[theme.breakpoints.down("md")]: {
		padding: theme.spacing(2),
	},
}));

export const UserIcon = styled(IconButton)(({ theme }) => ({
	width: "50px",
	height: "50px",
	borderRadius: "50%",
	background: "transparent",
	overflow: "hidden",
}));

export const GptfyIcon = styled(IconButton)(({ theme }) => ({
	width: "50px",
	height: "50px",
	borderRadius: "50%",
	background: "transparent",
	overflow: "hidden",
}));

export const QuestionContainer = styled(Box)(({ theme }) => ({
	marginTop: theme.spacing(5),
	display: "flex",
	justifyContent: "flex-start",
	padding: theme.spacing(1),
	width: "75%",
	gap: theme.spacing(2),

	[theme.breakpoints.down("sm")]: {
		width: "100%",
	},
}));

export const Question = styled(Box)(({ theme }) => ({
	...theme.typography.body1,
	marginTop: theme.spacing(2),
	paddingRight: theme.spacing(2),
	color: "#88728d",
}));

export const AnswerContainer = styled(Box)(({ theme }) => ({
	marginTop: theme.spacing(5),
	display: "flex",
	justifyContent: "flex-start",
	padding: theme.spacing(1),
	width: "75%",
	gap: theme.spacing(2),

	[theme.breakpoints.down("sm")]: {
		width: "100%",
	},
}));

export const Answer = styled(Box)(({ theme }) => ({
	...theme.typography.body1,
	marginTop: theme.spacing(2),
	paddingRight: theme.spacing(2),
	color: "#88728d",
}));

export const ReadAnswer = styled(IconButton)(({ theme }) => ({
	borderRadius: "50%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "50px",
	width: "50px",
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

/**********************| Chat Playground Styled Components |**********************/

export const PlaygroundWrapper = styled(Box, {
	shouldForwardProp: (prop) => prop !== "isMobile",
})<{
	isMobile: boolean | undefined;
}>(({ theme, isMobile }) => ({
	flexGrow: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: `${theme.spacing(3)} 0`,
	marginLeft: isMobile ? 0 : theme.spacing(5),
	paddingBottom: theme.spacing(5),
	height: "100%",
	width: "100%",
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

export const ChatBodyWrapper = styled(Box)(({ theme }) => ({
	flexGrow: 1,
	width: "70%",
	overflowY: "auto",

	[theme.breakpoints.down("md")]: {
		width: "100%",
	},
}));

export const PromptWrapper = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	width: "70%",
	padding: theme.spacing(2),
	height: "100px",

	[theme.breakpoints.down("md")]: {
		width: "100%",
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

export const FancyTextField = styled(TextField)(({ theme }) => ({
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
		height: "65px",
		"& .MuiOutlinedInput-root": {
			borderRadius: "50px",
		},
	},
}));

export const PromptIconButtonsWrapper = styled(Box)(({ theme }) => ({
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
		marginBottom: theme.spacing(1),
	},
}));

export const FancyIconButton = styled(IconButton)(({ theme }) => ({
	borderRadius: "50%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "50px",
	width: "50px",
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
