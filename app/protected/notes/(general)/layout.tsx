export default function NotesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className="flex flex-col w-full">{children}</div>;
}
