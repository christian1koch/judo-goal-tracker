"use client";
import { createNote } from "@/app/actions";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export function CreateNewNoteButton() {
	const router = useRouter();
	const onCreateNote = async () => {
		// TODO: try catch
		const newNote = await createNote("", "");
		router.push(`/protected/notes/${newNote.id}`);
	};
	return (
		<Button color="primary" variant="light" onPress={onCreateNote}>
			Create New Note
		</Button>
	);
}
