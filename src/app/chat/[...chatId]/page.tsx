"use client";
import { useCallback, useState, useEffect } from "react";
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

type CurrentOutput = {
	question: string;
	answer: string;
};

export default function Page({ params }: { params: { chatId: string } }) {
	const [input, setInput] = useState("");

	const [currentOutput, setCurrentOutput] = useState<CurrentOutput>({
		question: sampleQuestion,
		answer: sampleAnswer,
	});

	// const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	setInput(event.target.value);
	// };
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("submitted");
	};

	const handleKeyDown = async (
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === "Enter" && input) {
			await handleFinish(input);
			setInput("");
		}
	};

	const isMobile = useResponsive("down", "sm");

	const handleFinish = useCallback(async (query: string) => {
		console.log("query", query);
		const result = await gpt3(query);
		console.log("result", result);
		if (result.length === 0) {
			return;
		}
		setCurrentOutput({
			question: query,
			answer: result[0].message.content as string,
		});
	}, []);

	// useEffect(() => {
	// 	console.log("Page component rendered");
	// });

	return (
		<PlaygroundWrapper isMobile={isMobile}>
			<ChatBodyWrapper>
				<ChatContainer
					question={currentOutput.question}
					answer={currentOutput.answer}
				/>
			</ChatBodyWrapper>

			<PromptWrapper>
				<FancyTextField
					variant="outlined"
					placeholder="Enter your prompt here..."
					value={input}
					// onChange={handleInputChange}
					onKeyDown={handleKeyDown}
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
