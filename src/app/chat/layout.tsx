import React from "react";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return <main style={{ width: "100%" }}>{children}</main>;
};
export default Layout;
