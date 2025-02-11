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
						primary: {
							100: "#F4DEFE",
							200: "#E6BEFE",
							300: "#D49DFC",
							400: "#C384FA",
							500: "#A75CF8",
							600: "#8243D5",
							700: "#612EB2",
							800: "#431D8F",
							900: "#2E1177",
							DEFAULT: "#A75CF8",
							foreground: "#FFFFFF",
						},
						success: {
							100: "#E7FCD7",
							200: "#CBF9B0",
							300: "#A4ED85",
							400: "#7DDC63",
							500: "#49C635",
							600: "#2EAA26",
							700: "#1A8E1C",
							800: "#10721A",
							900: "#0A5F19",
							DEFAULT: "#49C635",
							foreground: "#FFFFFF",
						},
						warning: {
							100: "#FFF6D9",
							200: "#FFEBB4",
							300: "#FFDC8E",
							400: "#FFCE72",
							500: "#FFB744",
							600: "#DB9331",
							700: "#B77222",
							800: "#935415",
							900: "#7A3F0D",
							DEFAULT: "#FFB744",
							foreground: "#FFFFFF",
						},
						danger: {
							100: "#FFDDD7",
							200: "#FFB3AF",
							300: "#FF878C",
							400: "#FF697D",
							500: "#FF3866",
							600: "#DB2863",
							700: "#B71C5D",
							800: "#931155",
							900: "#7A0A4F",
							DEFAULT: "#FF3866",
							foreground: "#FFFFFF",
						},
					},
				},
				dark: {
					colors: {
						primary: {
							100: "#F4DEFE",
							200: "#E6BEFE",
							300: "#D49DFC",
							400: "#C384FA",
							500: "#A75CF8",
							600: "#8243D5",
							700: "#612EB2",
							800: "#431D8F",
							900: "#2E1177",
							DEFAULT: "#8243D5",
						},
						success: {
							100: "#E7FCD7",
							200: "#CBF9B0",
							300: "#A4ED85",
							400: "#7DDC63",
							500: "#49C635",
							600: "#2EAA26",
							700: "#1A8E1C",
							800: "#10721A",
							900: "#0A5F19",
							DEFAULT: "#2EAA26",
						},
						warning: {
							100: "#FFF6D9",
							200: "#FFEBB4",
							300: "#FFDC8E",
							400: "#FFCE72",
							500: "#FFB744",
							600: "#DB9331",
							700: "#B77222",
							800: "#935415",
							900: "#7A3F0D",
							DEFAULT: "#DB9331",
						},
						danger: {
							100: "#FFDDD7",
							200: "#FFB3AF",
							300: "#FF878C",
							400: "#FF697D",
							500: "#FF3866",
							600: "#DB2863",
							700: "#B71C5D",
							800: "#931155",
							900: "#7A0A4F",
							DEFAULT: "#DB2863",
						},
					},
				},
			},
		}),
	],
} satisfies Config;

export default config;
