"use client";
import Box from "@mui/material/Box";
import Image from "next/image";
import {
	FadeInLink,
	Greeting,
	PageWrapper,
} from "@/components/landing page/styled";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";
import theme from "@/themes";

export default function Home() {
	const { user, error, isLoading } = useUser();

	// if (isLoading) {
	// 	return <PageWrapper>Loading...</PageWrapper>;
	// }

	// if (error) {
	// 	return <PageWrapper>{error.message}</PageWrapper>;
	// }

	if (user) {
		redirect("/chat");
	}

	return (
		<PageWrapper>
			<Box
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
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: "1rem",
						marginTop: theme.spacing(2),
					}}
				>
					<FadeInLink href="/api/auth/login">Login</FadeInLink>
					<FadeInLink href="/api/auth/signup">Sign up</FadeInLink>
				</Box>
			</Box>
		</PageWrapper>
	);
}
