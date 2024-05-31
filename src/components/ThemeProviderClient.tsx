"use client";
import theme from "../themes";
import { ThemeProvider } from "@mui/material";

type ThemeProviderClientProps = {
  children: React.ReactNode;
};

export default function ThemeProviderClient({
  children,
}: ThemeProviderClientProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
