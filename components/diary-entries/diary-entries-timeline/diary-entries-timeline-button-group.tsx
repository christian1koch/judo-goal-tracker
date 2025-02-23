"use client";
import { Button, ButtonGroup } from "@heroui/react";
import { IconLayoutDashboard, IconTimelineEvent } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DiaryEntriesTimelineButtonGroup() {
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
				href="/protected/diary-entries"
				isDisabled={isGridView}
				startContent={<IconLayoutDashboard />}
			>
				Grid View
			</Button>
			<Button
				prefetch
				as={Link}
				href="/protected/diary-entries/timeline"
				isDisabled={isTimeline}
				startContent={<IconTimelineEvent />}
			>
				Timeline View
			</Button>
		</ButtonGroup>
	);
}
