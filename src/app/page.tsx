import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import {
	FadeInLink,
	Greeting,
	PageWrapper,
} from "@/components/landing page/styled";

export default function Home() {
	return (
		<PageWrapper>
			<Stack
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					margin: "auto",
				}}
			>
				<Image
					priority={true}
					src="/assets/logo43.png"
					alt="logo"
					width="64"
					height="80"
				/>
				<Greeting>Welcome to GPTify</Greeting>
				<FadeInLink href="/chat">
					Go To Chat
					<KeyboardDoubleArrowRightIcon
						style={{
							fontSize: "2.5rem",
						}}
					/>
				</FadeInLink>
			</Stack>
		</PageWrapper>
	);
}
