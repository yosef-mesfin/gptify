"use client";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const Root = styled(Container)(({ theme }) => ({
	display: "flex",
	background: "radial-gradient(circle, #3F024F, #000515)",
	width: "100%",
	height: "100vh",
	maxWidth: "100% !important",

	[theme.breakpoints.down("md")]: {
		padding: theme.spacing(0),
	},
}));

type RootContainerProps = Readonly<{
	children?: React.ReactNode;
}>;
export default function RootContainer({ children }: RootContainerProps) {
	return <Root>{children}</Root>;
}
