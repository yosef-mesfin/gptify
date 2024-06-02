import { useRef, useEffect, useCallback } from "react";

export default function useIsMounted(): () => boolean {
	const isMounted = useRef(true);

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	return useCallback(() => isMounted.current, []);
}
