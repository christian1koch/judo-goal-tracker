export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex justify-center align-middle items-center h-full">
			<div className="max-w-7xl flex flex-col justify-center gap-12 items-start">
				{children}
			</div>
		</div>
	);
}
