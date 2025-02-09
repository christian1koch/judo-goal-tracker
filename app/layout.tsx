import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Button, HeroUIProvider, Link } from "@heroui/react";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Next.js and Supabase Starter Kit",
	description: "The fastest way to build apps with Next.js and Supabase",
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
			<body className="bg-background text-foreground">
				<HeroUIProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<main className="min-h-screen h-screen flex flex-col items-center">
							<div className="flex-1 w-full flex flex-col items-center h-full">
								<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
									<div className="w-full max-w-5xl flex justify-end items-center p-3 px-5 text-sm">
										{!hasEnvVars ? (
											<EnvVarWarning />
										) : (
											<div className="flex flex-row gap-2">
												<HeaderAuth />
												<ThemeSwitcher />
											</div>
										)}
									</div>
								</nav>
								<div className="w-full flex-1 h-full">
									{children}
								</div>

								<footer className="w-full bottom-0 fixed flex items-center justify-center border-t mx-auto text-center text-xs gap-8">
									<p>Christian Koch Echeverria</p>
								</footer>
							</div>
						</main>
					</ThemeProvider>
				</HeroUIProvider>
			</body>
		</html>
	);
}
