import { MainSidebar } from "@/components/main-sidebar";

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex">
			<MainSidebar />
			<div className="flex justify-center flex-1 md:ml-16">
				{children}
			</div>
		</div>
	);
}
