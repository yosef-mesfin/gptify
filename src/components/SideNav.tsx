"use client";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
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
import { Stack, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import useResponsive from "@/hooks/useResponsive";
import useIsMounted from "@/hooks/useIsMounted";
import ChatIcon from "@mui/icons-material/Chat";

const drawerWidth = 260;
const mobileDrawerWidth = "80vw";

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

const openedMixin = (theme: Theme, isMobile: boolean): CSSObject => ({
	background: "#000515",
	color: "white",
	width: isMobile ? mobileDrawerWidth : drawerWidth,
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
	width: `calc(${theme.spacing(2)} + 1px)`,
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

const StyledDrawer = styled(Drawer, {
	shouldForwardProp: (prop) => prop !== "isMobile",
})<{
	isMobile: boolean;
	open: boolean;
}>(({ theme, open, isMobile }) => ({
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",

	...(open && {
		...openedMixin(theme, isMobile),
		"& .MuiDrawer-paper": {
			...openedMixin(theme, isMobile),
			width: isMobile ? mobileDrawerWidth : drawerWidth,
		},
	}),

	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": {
			...closedMixin(theme),
			width: `calc(${theme.spacing(7)} + 1px)`,
		},
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

const AddChatButton = styled(Box, {
	shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
	cursor: "pointer",
	background: "transparent",
	alignSelf: "center",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: 1,
	color: "#88728d",
	marginBottom: theme.spacing(2),
	paddingRight: open ? theme.spacing(2) : 0,
	borderRadius: open ? "24px" : "50%",
	width: open ? "fit-content" : "48px",
	border: "1px solid rgba(255, 0, 255, 0.3)",

	"&:hover": {
		background: "#390442f7",
		borderColor: "rgba(255, 0, 255, 0.7)",
		boxShadow: "0 0 8px rgba(255, 0, 255, 0.5)",
	},
}));
const ChatHistoryItem = styled("div")<{ open: boolean }>(({ theme, open }) => ({
	display: open ? "flex" : "none",
	flexDirection: "column",
	justifyContent: "flex-start",
	paddingTop: theme.spacing(1),
	color: "#88728d",
}));

const ChatHistoryItemText = styled(Typography)(({ theme }) => ({
	color: "#cab8ce",
	paddingTop: theme.spacing(1),
	paddingBottom: theme.spacing(1),
	cursor: "pointer",
	"&:hover": {
		color: "white",
	},
	...theme.typography.body1,
}));

const sampleChatHistory = [
	{
		id: 1,
		query: "What is the capital of France?",
	},
	{
		id: 2,
		query: "What is the capital of Germany?",
	},
	{
		id: 3,
		query: "What is the capital of Italy?",
	},
	{
		id: 4,
		query: "What is the capital of Spain?",
	},
];

interface SideNavProps {
	onToggle: () => void;
	open: boolean;
}

export default function SideNav({ onToggle, open }: SideNavProps) {
	const theme = useTheme();
	const isMobile = useResponsive("down", "sm");
	const isDesktop = useResponsive("up", "md");
	const isMounted = useIsMounted();
	const [shouldRender, setShouldRender] = React.useState(false);

	React.useEffect(() => {
		if (isMounted()) {
			setShouldRender(true);
		}
	}, [isMounted]);

	if (!shouldRender) {
		return null;
	}

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />

			{!isDesktop && !open && (
				<DrawerHeader
					sx={{
						margin: theme.spacing(0),
						position: "fixed",
					}}
				>
					<IconButton
						color="inherit"
						sx={{ color: "white" }}
						onClick={onToggle}
					>
						{<MenuIcon />}
					</IconButton>
				</DrawerHeader>
			)}

			<StyledDrawer
				variant={!isDesktop ? "temporary" : "permanent"}
				open={open}
				isMobile={isMobile ?? false}
				onClose={onToggle}
			>
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
						<AddChatButton open={open}>
							<IconButton color="inherit" sx={{ color: "white" }}>
								<AddIcon />
							</IconButton>
							{open ? "Add New Chat" : null}
						</AddChatButton>
						{open && (
							<Typography
								sx={{
									fontSize: "1rem",
									marginTop: theme.spacing(1),
								}}
							>
								Recent
							</Typography>
						)}
						<ChatHistoryItem open={open}>
							{sampleChatHistory.map((chat) => (
								<Stack
									key={chat.id}
									sx={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
										gap: 1,
										padding: `0 ${theme.spacing(1)}`,
										"&:hover": {
											background: "#390442f7",
										},
									}}
								>
									<ChatIcon
									// sx={{
									// 	color: "#88728d",
									// }}
									/>
									<ChatHistoryItemText key={chat.id}>
										{chat.query.length > 25
											? chat.query.slice(0, 25) + "..."
											: chat.query}
									</ChatHistoryItemText>
								</Stack>
							))}
						</ChatHistoryItem>
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
			</StyledDrawer>
		</Box>
	);
}
