"use client";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Link from "next/link";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Image from "next/image";

const PageWrapper = styled(Box)({
	padding: 0,
	margin: 0,
	width: "100%",
	height: "100vh",
	display: "flex",
});

const Greeting = styled(Typography)(({ theme }) => ({
	fontSize: "2.5rem",
	background: "linear-gradient(90deg, #5b09ef, #c805f9 66%)",
	fontWeight: theme.typography.fontWeightBold,
	WebkitBackgroundClip: "text",
	WebkitTextFillColor: "transparent",
	opacity: 0,
	animation: "rotateIn 1s forwards",

	"@keyframes rotateIn": {
		"0%": {
			transform: "rotateY(90deg)",
			opacity: 0,
		},
		"100%": {
			transform: "rotateY(0deg)",
			opacity: 1,
		},
	},

	[theme.breakpoints.down("md")]: {
		fontSize: "2.5rem",
	},
}));

const FadeInLink = styled(Link)(({ theme }) => ({
	cursor: "pointer",
	background: "transparent",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	color: "#88728d",
	marginBottom: theme.spacing(3),
	padding: theme.spacing(1) + " " + theme.spacing(2),
	border: "1px solid rgba(255, 0, 255, 0.3)",
	borderRadius: "24px",
	fontSize: "1.5rem",

	"&:hover": {
		background: "#390442f7",
		borderColor: "rgba(255, 0, 255, 0.7)",
		boxShadow: "0 0 8px rgba(255, 0, 255, 0.5)",
	},
	opacity: 0,
	animation: "fadeIn 2s 1s forwards",

	"@keyframes fadeIn": {
		"0%": {
			opacity: 0,
		},
		"100%": {
			opacity: 1,
		},
	},
}));

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
				<Image src="/assets/logo43.png" alt="logo" width="64" height="80" />
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
