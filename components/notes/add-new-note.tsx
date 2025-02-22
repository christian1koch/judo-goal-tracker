"use client";
import { createNewNote } from "@/app/actions";
import { Button } from "@heroui/react";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AddNewNotesButton() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const handleOnClick = async () => {
		try {
			setIsLoading(true);
			const newNote = await createNewNote();
			router.push(`/protected/notes/${newNote.id}`);
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Button
			startContent={<IconCirclePlusFilled />}
			color="primary"
			isLoading={isLoading}
			isDisabled={isLoading}
			onPress={handleOnClick}
		>
			New note
		</Button>
	);
}
