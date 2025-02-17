import { Button } from "@heroui/react";

export function NotesSidebar() {
	return (
		<div className="max-h-[calc(100vh-5rem)]">
			<div className="w-60 bg-default-50 h-full border flex flex-col flex-shrink-0 overflow-y-scroll">
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
