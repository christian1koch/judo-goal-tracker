import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";
const config = {
	darkMode: "class",
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require("tailwindcss-animate"),
		heroui({
			themes: {
				light: {
					colors: {
						// background: "#FFFFFF", // or DEFAULT
						// foreground: "#11181C", // or 50 to 900 DEFAULT
						primary: {
							100: "#E2FEED",
							200: "#C6FEE1",
							300: "#AAFCDA",
							400: "#94FAD9",
							500: "#71F8D9",
							600: "#52D5C3",
							700: "#38B2AD",
							800: "#24898F",
							900: "#156877",
							DEFAULT: "#71F8D9",
							foreground: "#FFFFFF",
						},
						success: {
							100: "#F2FBD2",
							200: "#E3F7A7",
							300: "#C7E877",
							400: "#A8D252",
							500: "#7FB522",
							600: "#669B18",
							700: "#508211",
							800: "#3B680A",
							900: "#2D5606",
							DEFAULT: "#7FB522",
							foreground: "#FFFFFF",
						},
						warning: {
							100: "#FEF9CC",
							200: "#FEF199",
							300: "#FEE866",
							400: "#FDDE40",
							500: "#FCCE02",
							600: "#D8AC01",
							700: "#B58D01",
							800: "#926F00",
							900: "#785900",
							DEFAULT: "#FCCE02",
							foreground: "#FFFFFF",
						},
						danger: {
							100: "#FFEFDA",
							200: "#FFDBB5",
							300: "#FFC190",
							400: "#FFA975",
							500: "#FF8147",
							600: "#DB5D33",
							700: "#B73E23",
							800: "#932516",
							900: "#7A130D",
							DEFAULT: "#DB5D33",
							foreground: "#FFFFFF",
						},
					},
				},
				dark: {
					colors: {
						// background: "#000000", // or DEFAULT
						// foreground: "#ECEDEE", // or 50 to 900 DEFAULT
						primary: {
							100: "#E2FEED",
							200: "#C6FEE1",
							300: "#AAFCDA",
							400: "#94FAD9",
							500: "#71F8D9",
							600: "#52D5C3",
							700: "#38B2AD",
							800: "#24898F",
							900: "#156877",
							DEFAULT: "#52D5C3",
						},
						success: {
							100: "#F2FBD2",
							200: "#E3F7A7",
							300: "#C7E877",
							400: "#A8D252",
							500: "#7FB522",
							600: "#669B18",
							700: "#508211",
							800: "#3B680A",
							900: "#2D5606",
							DEFAULT: "#7FB522",
						},
						warning: {
							100: "#FEF9CC",
							200: "#FEF199",
							300: "#FEE866",
							400: "#FDDE40",
							500: "#FCCE02",
							600: "#D8AC01",
							700: "#B58D01",
							800: "#926F00",
							900: "#785900",
							DEFAULT: "#FCCE02",
						},
						danger: {
							100: "#FFEFDA",
							200: "#FFDBB5",
							300: "#FFC190",
							400: "#FFA975",
							500: "#FF8147",
							600: "#DB5D33",
							700: "#B73E23",
							800: "#932516",
							900: "#7A130D",
							DEFAULT: "#DB5D33",
						},
					},
				},
			},
		}),
	],
} satisfies Config;

export default config;
