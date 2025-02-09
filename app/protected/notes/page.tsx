"use client";
import { createNote, getGoals, getQuestions } from "@/app/actions";
import { Button } from "@heroui/react";

export default function Page() {
	const createNewNote = async () => {
		await createNote("", "");
	};
	return (
		<Button color="primary" onPress={createNewNote}>
			Create New Note
		</Button>
	);
}
