import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProviderClient from "@/components/ThemeProviderClient";
import "./globals.css";
import RootContainer from "@/components/RootContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		template: "%s | GPTify",
		default: "GPTify",
	},
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
