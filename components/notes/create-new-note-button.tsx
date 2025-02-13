"use client";
import { createNote } from "@/app/actions";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateNewNoteButton() {
	const router = useRouter();
	const onCreateNote = async () => {
		// TODO: try catch
		setIsCreating(true);
		const newNote = await createNote("", "");
		router.push(`/protected/notes/${newNote.id}`);
	};
	const [isCreating, setIsCreating] = useState(false);
	return (
		<Button
			className="flex-grow-0"
			color="primary"
			variant="bordered"
			onPress={onCreateNote}
			isDisabled={isCreating}
		>
			Create New Note
		</Button>
	);
}
