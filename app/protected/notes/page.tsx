"use client";
import { NotesSidebar } from "@/components/notes/notes-sidebar";
import TextEditor from "@/components/text-editor";
import { Input } from "@heroui/react";

export default function NotesPage() {
	return (
		<>
			<div className="flex flex-col justify-start items-start flex-1 mr-72">
				<Input
					defaultValue="Note Title"
					label="Title"
					className="m-auto mt-5 w-auto flex-grow-0"
					variant="bordered"
				/>
				<TextEditor />
			</div>
			<NotesSidebar />
		</>
	);
}
