import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Judoapp",
	description: "The fastest way to get your goals",
};

const geistSans = Geist({
	display: "swap",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={geistSans.className}
			suppressHydrationWarning
		>
			<head>
				<link rel="icon" href="./favicon.ico" sizes="any" />
			</head>
			<body className="bg-background text-foreground">
				<HeroUIProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<main className="min-h-screen h-screen flex flex-col items-center antialiased">
							<div className="flex-1 w-full flex flex-col items-center h-full">
								<nav className="w-full flex justify-center h-16 fixed top-0 z-20 bg-background border-b">
									{/* <div className="w-full  bg-background">
										{!hasEnvVars ? (
											<EnvVarWarning />
										) : (
											<div className="flex flex-row gap-2">
												<HeaderAuth />
												<ThemeSwitcher />
											</div>
										)}
									</div> */}
								</nav>
								<div className="w-full flex-1 h-full mt-16">
									{children}
								</div>
							</div>
						</main>
					</ThemeProvider>
				</HeroUIProvider>
			</body>
		</html>
	);
}
