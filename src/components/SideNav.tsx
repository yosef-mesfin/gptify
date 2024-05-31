"use client";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { Stack } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const drawerWidth = 240;

const BottomDrawerElements = [
	{
		text: "Account",
		icon: <AccountBoxIcon />,
	},
	{
		text: "Help",
		icon: <HelpCenterIcon />,
	},
	{
		text: "Settings",
		icon: <SettingsIcon />,
	},
];

const openedMixin = (theme: Theme): CSSObject => ({
	background: "#000515",
	color: "white",
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
	background: "#000515",
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	alignItems: "center",
	background: "#390442f7",
	border: "1px solid rgba(255, 0, 255, 0.3)",
	boxShadow: "0 0 10px 2px rgba(255, 0, 255, 0.5)",
	display: "flex",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const ChatHistoryWrapper = styled(Box, {
	shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
	flexGrow: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: open ? "flex-start" : "center",
	padding: theme.spacing(2),
	height: "100%",
}));

interface SideNavProps {
	onToggle: () => void;
	open: boolean;
}

export default function SideNav({ onToggle, open }: SideNavProps) {
	const theme = useTheme();

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Drawer variant="permanent" open={open}>
				<Stack sx={{ height: "100%", justifyContent: "space-between" }}>
					<DrawerHeader>
						<IconButton
							color="inherit"
							sx={{ color: "white" }}
							onClick={onToggle}
						>
							{open ? <ChevronLeftIcon /> : <MenuIcon />}
						</IconButton>
					</DrawerHeader>
					<Divider />
					<ChatHistoryWrapper open={open}>
						<IconButton color="inherit" sx={{ color: "white" }}>
							<AddIcon />
						</IconButton>
					</ChatHistoryWrapper>
					<List>
						{BottomDrawerElements.map((element, index) => (
							<Tooltip
								key={element.text}
								title={element.text}
								placement="right"
								arrow
							>
								<ListItem
									key={element.text}
									disablePadding
									sx={{ display: "block" }}
								>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open ? "initial" : "center",
											px: 2.5,
											color: "white",
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 3 : "auto",
												justifyContent: "center",
												color: "#88728d",
											}}
										>
											{element.icon}
										</ListItemIcon>
										<ListItemText
											primary={element.text}
											sx={{ opacity: open ? 1 : 0 }}
										/>
									</ListItemButton>
								</ListItem>
							</Tooltip>
						))}
					</List>
				</Stack>
			</Drawer>
		</Box>
	);
}
