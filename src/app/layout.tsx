import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProviderClient from "@/components/ThemeProviderClient";
import NavBar from "@/components/NavBar";
import "./globals.css";
import RootContainer from "@/components/RootContainer";
import SideNav from "@/components/SideNav";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Children } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "GPTify",
	description: "GPT power unleashed with speech-to-text and text-to-speech",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProviderClient>
					<RootContainer>{children}</RootContainer>
				</ThemeProviderClient>
			</body>
		</html>
	);
}
