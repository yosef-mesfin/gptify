"use client";
import { useState } from "react";
import ChatContainer from "@/components/chat/ChatContainer";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import FriendlyMic from "@/components/FriendlyMic";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
	ChatBodyWrapper,
	PlaygroundWrapper,
	PromptWrapper,
	FancyTextField,
	PromptIconButtonsWrapper,
	FancyIconButton,
} from "@/components/chat/chatStyledComponentsLib";
import useResponsive from "@/hooks/useResponsive";
import Link from "next/link";
import { gpt3 } from "@/actions/chat";

const sampleQuestion = "What can you do?";
const sampleAnswer =
	"I can help you with a variety of tasks, such as answering questions, providing information, and even generating creative content. I'm here to assist you in any way I can. If you have any questions or need help with something, feel free to ask! ";

export default function Page({ params }: { params: { chatId: string } }) {
	const [input, setInput] = useState("");

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value);
	};

	const isMobile = useResponsive("down", "sm");
	const handleFinish = async (query: string) => {
		const result = await gpt3(query);
		if (result.length === 0) {
			return;
		}
	};
	return (
		<PlaygroundWrapper isMobile={isMobile}>
			<ChatBodyWrapper>
				<ChatContainer question={sampleQuestion} answer={sampleAnswer} />
			</ChatBodyWrapper>

			<PromptWrapper>
				<FancyTextField
					variant="outlined"
					placeholder="Enter your prompt here..."
					value={input}
					onChange={handleInputChange}
					InputProps={{
						endAdornment: input && (
							<Link href={`/chat/123`}>
								<IconButton sx={{ color: "#88728d" }}>
									<SendIcon />
								</IconButton>
							</Link>
						),
					}}
				/>
				<PromptIconButtonsWrapper>
					{isMobile && <FriendlyMic onFinish={handleFinish} />}
					<FancyIconButton>
						<AttachFileIcon sx={{ fontSize: "2rem" }} />
					</FancyIconButton>
					<FancyIconButton>
						<AddPhotoAlternateIcon sx={{ fontSize: "2rem" }} />
					</FancyIconButton>
					{!isMobile && <FriendlyMic onFinish={handleFinish} />}
				</PromptIconButtonsWrapper>
			</PromptWrapper>
		</PlaygroundWrapper>
	);
}
