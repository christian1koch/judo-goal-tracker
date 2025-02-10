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
			<div className="flex justify-center flex-1 md:pl-10">
				{children}
			</div>
		</div>
	);
}
