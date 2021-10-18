import { useMediaQuery } from "react-responsive";

export default function useScreen() {
	const isSmallScreen = useMediaQuery({
		query: "(min-width: 640px)",
	});
	const isMediumScreen = useMediaQuery({ query: "(min-width: 768px)" });
	const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
	const isExtraLargeScreen = useMediaQuery({ query: "(min-width: 1280px)" });
	const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
	const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

	return {
		isSmallScreen,
		isMediumScreen,
		isLargeScreen,
		isExtraLargeScreen,
		isPortrait,
		isRetina,
	};
}
