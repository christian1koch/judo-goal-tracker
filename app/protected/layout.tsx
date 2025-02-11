import { MainSidebar } from "@/components/main-sidebar";

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex">
			<MainSidebar />
			<div className="flex pt-10 justify-center flex-1 md:pl-10">
				{children}
			</div>
		</div>
	);
}
