"use client";
import { NotesSidebar } from "@/components/notes/notes-sidebar";
import TextEditor from "@/components/text-editor";
import { Input } from "@heroui/react";

export default function PlaygroundPage() {
	return (
		<div className="flex flex-row">
			<div className="flex flex-col">
				<Input
					defaultValue="Note Title"
					label="Title"
					className="m-auto mt-5 w-auto"
					variant="bordered"
				/>
				<TextEditor />
			</div>
			<NotesSidebar />
		</div>
	);
}
