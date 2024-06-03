import Box from "@mui/material/Box";

type FlexBetweenProps = {
	children: React.ReactNode;
};

export const FlexBetween: React.FC<FlexBetweenProps> = ({ children }) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			{children}
		</Box>
	);
};
