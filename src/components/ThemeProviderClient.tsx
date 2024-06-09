"use client";
import { useMemo } from "react";
import theme from "../themes";
import { ThemeProvider } from "@mui/material";

type ThemeProviderClientProps = {
	children: React.ReactNode;
};

export default function ThemeProviderClient({
	children,
}: ThemeProviderClientProps) {
	const memoizedTheme = useMemo(() => theme, []);
	return <ThemeProvider theme={memoizedTheme}>{children}</ThemeProvider>;
}
