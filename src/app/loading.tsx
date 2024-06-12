// loading.tsx
"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const LoadingWrapper = styled(Box)({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	height: "100vh",
	width: "100%",
	background: "radial-gradient(circle, #3F024F, #000515)",
});

export default function Loading() {
	return (
		<LoadingWrapper>
			<CircularProgress
				sx={{
					color: "#fff",
				}}
				size={100}
			/>
		</LoadingWrapper>
	);
}
