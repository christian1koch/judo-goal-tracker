"use client";
import { Button, ButtonGroup } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NotesTimelineButtonGroup() {
	const pathname = usePathname();
	let isTimeline = false;
	if (pathname.toLowerCase().includes("timeline")) {
		isTimeline = true;
	}
	const isGridView = !isTimeline;
	return (
		<ButtonGroup>
			<Button
				prefetch
				as={Link}
				href="/protected/notes"
				isDisabled={isGridView}
			>
				Grid View
			</Button>
			<Button
				prefetch
				as={Link}
				href="/protected/notes/timeline"
				isDisabled={isTimeline}
			>
				Timeline View
			</Button>
		</ButtonGroup>
	);
}
