import { Root } from "./styled";

type RootContainerProps = Readonly<{
	children?: React.ReactNode;
}>;
export default function RootContainer({ children }: RootContainerProps) {
	return <Root>{children}</Root>;
}
