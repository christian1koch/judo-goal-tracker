import { MainSidebar } from "@/components/main-sidebar";
import { Spacer } from "@heroui/react";

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex">
			<MainSidebar />
			<Spacer x={16} />
			{children}
		</div>
	);
}
