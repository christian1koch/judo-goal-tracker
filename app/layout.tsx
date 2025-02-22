import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import { CurrentNoteContextProvider } from "@/components/notes/notes-context";

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
						<CurrentNoteContextProvider>
							<main className="min-h-screen h-screen flex flex-col items-center antialiased">
								<div className="flex-1 w-full flex flex-col items-center h-full">
									<div className="w-full flex-1 h-full mt-16">
										{children}
									</div>
								</div>
							</main>
						</CurrentNoteContextProvider>
					</ThemeProvider>
				</HeroUIProvider>
			</body>
		</html>
	);
}
