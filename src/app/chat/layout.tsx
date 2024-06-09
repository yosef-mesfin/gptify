"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SideNav from "@/components/chat/SideNav";
import Image from "next/image";
import ThreeDPlaceholder from "@/components/chat/ThreeDPlaceholder";
import { PageWrapper } from "@/components/landing page/styled";

const LogoWrapper = styled(Box)<{ open: boolean }>(({ theme, open }) => ({
	position: "fixed",
	top: theme.spacing(1.5),
	left: open
		? `calc(260px + ${theme.spacing(2)})`
		: `calc(${theme.spacing(9.5)})`,
	transition: theme.transitions.create("left", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	zIndex: theme.zIndex.drawer + 1,

	[theme.breakpoints.down("sm")]: {
		left: "auto",
		right: theme.spacing(2),
		top: theme.spacing(0.5),
	},
}));

const ThreeDPlaceHolderWrapper = styled(Box)(({ theme }) => ({
	position: "absolute",
	top: theme.spacing(0),
	right: theme.spacing(0),
	height: "200px",
	width: "200px",
	// scale: "0.8",
	[theme.breakpoints.down("lg")]: {
		scale: "0.8",
		top: theme.spacing(-2),
		right: theme.spacing(-2),
	},
}));

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const [openDrawer, setOpenDrawer] = useState(false);

	const handleToggleDrawer = () => {
		setOpenDrawer(!openDrawer);
	};

	return (
		<main style={{ width: "100%" }}>
			<SideNav onToggle={handleToggleDrawer} open={openDrawer} />
			<LogoWrapper open={openDrawer}>
				<Image src="/assets/logo43.png" alt="logo" width="40" height="50" />
			</LogoWrapper>

			<ThreeDPlaceHolderWrapper>
				<ThreeDPlaceholder />
			</ThreeDPlaceHolderWrapper>
			<PageWrapper>{children}</PageWrapper>
		</main>
	);
};
export default Layout;
