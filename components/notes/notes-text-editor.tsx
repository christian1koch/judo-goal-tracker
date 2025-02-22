"use client";
import { Input } from "@heroui/react";
import TextEditor from "../text-editor";

export function NotesTextEditor() {
	return (
		<>
			<Input
				defaultValue="Note Title"
				label="Title"
				className="m-auto mt-5 w-auto flex-grow-0"
				variant="bordered"
			/>
			<TextEditor />
		</>
	);
}
