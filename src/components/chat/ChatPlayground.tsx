import React, { ReactEventHandler, useState } from "react";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import FriendlyMic from "../FriendlyMic";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import WelcomeContainer from "../WelcomeContainer";
import useResponsive from "@/hooks/useResponsive";
import Link from "next/link";
import {
	PlaygroundWrapper,
	ChatBodyWrapper,
	FancyTextField,
	PromptIconButtonsWrapper,
	PromptWrapper,
	FancyIconButton,
	StyledForm,
} from "../chatStyledComponentsLib";

type ChatPlaygroundProps = {
	onFinish: (query: string) => Promise<void>;
};

const ChatPlayground: React.FC<ChatPlaygroundProps> = ({ onFinish }) => {
	const [input, setInput] = useState("");

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (input.trim()) {
			console.log("input", input);
			await onFinish(input);
			setInput("");
		}
	};

	const isMobile = useResponsive("down", "sm");

	return (
		<PlaygroundWrapper isMobile={isMobile}>
			<ChatBodyWrapper>
				<WelcomeContainer userName="Rodya" />
			</ChatBodyWrapper>
			<PromptWrapper>
				<StyledForm onSubmit={handleSubmit}>
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
				</StyledForm>
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
		</PlaygroundWrapper>
	);
};

export default ChatPlayground;
