"use client";
import { createDiaryEntry } from "@/app/actions";
import { Button } from "@heroui/react";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateNewDiaryEntryButton() {
	const router = useRouter();
	const onCreateDiaryEntry = async () => {
		// TODO: try catch
		setIsCreating(true);
		const diaryEntry = await createDiaryEntry("", "");
		router.push(`/protected/diary-entries/edit/${diaryEntry.id}`);
	};
	const [isCreating, setIsCreating] = useState(false);
	return (
		<Button
			color="primary"
			variant="bordered"
			onPress={onCreateDiaryEntry}
			isDisabled={isCreating}
			startContent={<IconCirclePlusFilled />}
		>
			New diary entry
		</Button>
	);
}
