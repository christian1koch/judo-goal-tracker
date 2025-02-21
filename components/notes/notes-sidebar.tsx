import { Button } from "@heroui/react";

export function DesktopNotesSidebar() {
	return (
		<div className="h-[calc(100vh-5rem)] hidden md:block md:fixed right-0 top-16">
			<div className="w-60 bg-default-50 h-full border flex flex-col flex-shrink-0 overflow-y-auto rounded-b-lg">
				<SidebarItem />
				<SidebarItem isSelected />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem /> <SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
			</div>
		</div>
	);
}

export function MobileNotesSidebar() {
	return (
		<div className="md:hidden relative w-full mt-2">
			<div className="w-full bg-default-50 h-full border flex flex-col flex-shrink-0 overflow-y-auto rounded-b-lg">
				<SidebarItem />
				<SidebarItem isSelected />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem /> <SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
				<SidebarItem />
			</div>
		</div>
	);
}

interface SidebarItem {
	isSelected?: boolean;
	title?: string;
	onClick?: () => void;
}
export function SidebarItem({ isSelected }: SidebarItem) {
	return (
		<Button
			size="sm"
			variant={isSelected ? "shadow" : "light"}
			radius="none"
			className="flex-shrink-0"
		>
			Sidebar Link
		</Button>
	);
}
