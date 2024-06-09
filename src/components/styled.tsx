"use client";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ButtonStyle = styled(Button)({
	borderRadius: "50%",
});

import { Container } from "@mui/material";

export const Root = styled(Container)(({ theme }) => ({
	display: "flex",
	background: "radial-gradient(circle, #3F024F, #000515)",
	width: "100%",
	height: "100vh",
	maxWidth: "100% !important",
	padding: theme.spacing(0),

	[theme.breakpoints.down("md")]: {
		padding: theme.spacing(0),
	},
}));
