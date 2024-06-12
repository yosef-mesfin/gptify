import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProviderClient from "@/components/ThemeProviderClient";
import "./globals.css";
import RootContainer from "@/components/RootContainer";
import { UserProvider } from "@auth0/nextjs-auth0/client";

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
			<UserProvider>
				<body className={inter.className}>
					<ThemeProviderClient>
						<RootContainer>{children}</RootContainer>
					</ThemeProviderClient>
				</body>
			</UserProvider>
		</html>
	);
}
