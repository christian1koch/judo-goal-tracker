"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/responsiveIconButton";
import { useDisclosure } from "@heroui/react";

const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const ICON_SIZE = 16;

	return (
		<DropdownMenu onOpenChange={onOpenChange} open={isOpen}>
			<DropdownMenuTrigger asChild>
				<Button onPress={onOpen} variant="light" size={"sm"} isIconOnly>
					{theme === "light" ? (
						<Sun
							key="light"
							size={ICON_SIZE}
							className={"text-muted-foreground"}
						/>
					) : theme === "dark" ? (
						<Moon
							key="dark"
							size={ICON_SIZE}
							className={"text-muted-foreground"}
						/>
					) : (
						<Laptop
							key="system"
							size={ICON_SIZE}
							className={"text-muted-foreground"}
						/>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-content" align="start">
				<DropdownMenuRadioGroup
					value={theme}
					onValueChange={(e) => setTheme(e)}
				>
					<DropdownMenuRadioItem className="flex gap-2" value="light">
						<Sun
							size={ICON_SIZE}
							className="text-muted-foreground"
						/>{" "}
						<span>Light</span>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem className="flex gap-2" value="dark">
						<Moon
							size={ICON_SIZE}
							className="text-muted-foreground"
						/>{" "}
						<span>Dark</span>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						className="flex gap-2"
						value="system"
					>
						<Laptop
							size={ICON_SIZE}
							className="text-muted-foreground"
						/>{" "}
						<span>System</span>
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export { ThemeSwitcher };
