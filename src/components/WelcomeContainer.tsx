import React from "react";
import { styled } from "@mui/material/styles";
import { IconButton, Container, Typography, Box, Stack } from "@mui/material";
import theme from "@/themes";

const WelcomeContainerWrapper = styled(Container)(({ theme }) => ({
	height: "100%",
	background: "transparent",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: theme.spacing(5),

	[theme.breakpoints.down("md")]: {
		padding: theme.spacing(2),
	},
}));

const GreetingsContainer = styled(Stack)(({ theme }) => ({
	marginTop: theme.spacing(5),
	display: "inline-block",
}));

const Greeting = styled(Typography)(({ theme }) => ({
	fontSize: "3rem",
	background: "linear-gradient(90deg, #5b09ef, #c805f9 66%)",
	fontWeight: theme.typography.fontWeightBold,
	WebkitBackgroundClip: "text",
	WebkitTextFillColor: "transparent",

	[theme.breakpoints.down("md")]: {
		fontSize: "2.5rem",
	},
}));

const Subtitle = styled(Typography)(({ theme }) => ({
	marginBottom: theme.spacing(2),
	fontSize: "2rem",
	color: "#88728d",

	[theme.breakpoints.down("md")]: {
		fontSize: "1.5rem",
	},
}));

const SuggestionBoxWrapper = styled(Box)(({ theme }) => ({
	marginTop: theme.spacing(5),
	display: "flex",
	justifyContent: "center",
	flexWrap: "wrap",
	alignItems: "center",
	gap: theme.spacing(2),
	paddingBottom: theme.spacing(2),
	[theme.breakpoints.down("sm")]: {
		overflowX: "auto",
		flexWrap: "nowrap",
		width: "100%",
		justifyContent: "flex-start",
		paddingLeft: `calc(10% - ${theme.spacing(2)})`,
		"&::-webkit-scrollbar": {
			display: "none",
		},
		"-ms-overflow-style": "none",
		"scrollbar-width": "none",
	},
}));

const BackgroundGlow = styled(Box)(({ theme }) => ({
	position: "relative",
	width: "200px",
	height: "200px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	background: "linear-gradient(235deg, #ff00ff, #010615, #00bcd4)",
}));

const SuggestionBox = styled(Box)(({ theme }) => ({
	background: "#000515",
	width: "198px",
	height: "198px",
	display: "flex",
	flexDirection: "column",
	alignItems: "start",
	color: "#fff",
	paddingTop: theme.spacing(1),
	paddingLeft: theme.spacing(1),
	gap: theme.spacing(1),
}));

const Suggestions = [
	{
		id: 1,
		suggestion: "Create vibrant & playful image with lots of details",
		icon: "🎨",
	},
	{
		id: 2,
		suggestion: "Create a minimalistic & modern logo",
		icon: "🖌️",
	},
	{
		id: 3,
		suggestion: "Create a professional & clean business card",
		icon: "📇",
	},
	{
		id: 4,
		suggestion: "Create a sleek & modern website",
		icon: "🌐",
	},
];

interface WelcomeContainerProps {
	userName: string;
}

const WelcomeContainer: React.FC<WelcomeContainerProps> = ({ userName }) => {
	return (
		<WelcomeContainerWrapper>
			<GreetingsContainer>
				<Greeting>Hello, {userName}</Greeting>
				<Subtitle>How can I help you today?</Subtitle>
			</GreetingsContainer>
			<SuggestionBoxWrapper>
				{Suggestions.map((suggestion) => (
					<BackgroundGlow key={suggestion.id}>
						<SuggestionBox>
							<IconButton>{suggestion.icon}</IconButton>
							<Typography
								sx={{
									flexGrow: "1",
									margin: theme.spacing(2),
									color: "#cab8ce",
								}}
								variant="body1"
							>
								{suggestion.suggestion}
							</Typography>
						</SuggestionBox>
					</BackgroundGlow>
				))}
			</SuggestionBoxWrapper>
		</WelcomeContainerWrapper>
	);
};

export default WelcomeContainer;
