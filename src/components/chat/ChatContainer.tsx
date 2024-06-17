import Image from "next/image";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Stack } from "@mui/material";
import {
	ChatContainerWrapper,
	QuestionContainer,
	UserIcon,
	Question,
	AnswerContainer,
	Answer,
	GptfyIcon,
	ReadAnswer,
} from "../chatStyledComponentsLib";

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
