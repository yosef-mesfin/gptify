import { styled } from "@mui/material/styles";
import { Box, IconButton, Stack } from "@mui/material";
import Image from "next/image";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import theme from "@/themes";

const ChatContainerWrapper = styled(Box)(({ theme }) => ({
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

const UserIcon = styled(IconButton)(({ theme }) => ({
	width: "50px",
	height: "50px",
	borderRadius: "50%",
	background: "transparent",
	overflow: "hidden",
}));

const GptfyIcon = styled(IconButton)(({ theme }) => ({
	width: "50px",
	height: "50px",
	borderRadius: "50%",
	background: "transparent",
	overflow: "hidden",
}));

const QuestionContainer = styled(Box)(({ theme }) => ({
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

const Question = styled(Box)(({ theme }) => ({
	...theme.typography.body1,
	marginTop: theme.spacing(2),
	paddingRight: theme.spacing(2),
	color: "#88728d",
}));

const AnswerContainer = styled(Box)(({ theme }) => ({
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

const Answer = styled(Box)(({ theme }) => ({
	...theme.typography.body1,
	marginTop: theme.spacing(2),
	paddingRight: theme.spacing(2),
	color: "#88728d",
}));

const ReadAnswer = styled(IconButton)(({ theme }) => ({
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

type ChatContainerProps = Readonly<{
	question: string;
	answer: string;
}>;

export default function ChatContainer({
	question,
	answer,
}: ChatContainerProps) {
	return (
		<ChatContainerWrapper>
			<QuestionContainer>
				<UserIcon>
					<Image src="/assets/user.jpg" alt="User" width={50} height={50} />
				</UserIcon>
				<Question>{question}</Question>
			</QuestionContainer>
			<AnswerContainer>
				<Stack sx={{ gap: "theme.spacing(1)", alignItems: "center" }}>
					<GptfyIcon>
						<Image
							src="/assets/logo43.png"
							alt="GPTfy"
							width={50}
							height={50}
						/>
					</GptfyIcon>
					<ReadAnswer>
						<VolumeUpIcon />
					</ReadAnswer>
				</Stack>
				<Answer>{answer}</Answer>
			</AnswerContainer>
		</ChatContainerWrapper>
	);
}
