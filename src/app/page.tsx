"use client";
import { useState } from "react";
import { gpt3 } from "@/actions/chat";
import SideNav from "@/components/SideNav";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ChatPlayground from "@/components/ChatPlayground";
import Image from "next/image";

type Output = {
	title: string;
	content: string | null;
};

const PageWrapper = styled(Box)({
	padding: 0,
	margin: 0,
	width: "100%",
	height: "100vh",
});

const LogoWrapper = styled(Box)<{ open: boolean }>(({ theme, open }) => ({
	position: "fixed",
	top: theme.spacing(1.5),
	left: open
		? `calc(260px + ${theme.spacing(2)})`
		: `calc(${theme.spacing(9.5)})`,
	transition: theme.transitions.create("left", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	zIndex: theme.zIndex.drawer + 1,

	[theme.breakpoints.down("sm")]: {
		left: "auto",
		right: theme.spacing(2),
		top: theme.spacing(0.5),
	},
}));

export default function Home() {
	const [openDrawer, setOpenDrawer] = useState(false);

	const handleToggleDrawer = () => {
		setOpenDrawer(!openDrawer);
	};

	const [currentOutput, setCurrentOutput] = useState<Output>({
		title: "Welcome to Friendly AI",
		content: "Ask me anything!",
	});

	const handleFinish = async (query: string) => {
		const result = await gpt3(query);
		if (result.length === 0) {
			return;
		}
		setCurrentOutput({
			title: query,
			content: result[0].message.content,
		});
	};

	return (
		<PageWrapper
			style={{
				padding: 0,
				margin: 0,
				width: "100%",
			}}
		>
			<SideNav open={openDrawer} onToggle={handleToggleDrawer} />
			<LogoWrapper open={openDrawer}>
				<Image src="/assets/logo43.png" alt="logo" width="40" height="50" />
			</LogoWrapper>
			<ChatPlayground
				open={openDrawer}
				onFinish={handleFinish}
				currentOutput={currentOutput}
			/>
		</PageWrapper>
	);
}
