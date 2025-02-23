"use client";
import { Input } from "@heroui/react";
import TextEditor from "../text-editor";
import { INote } from "@/types";
import { updateNoteContent, updateNoteTitle } from "@/app/actions";
import { useLayoutEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useNotesContext } from "./notes-context";

interface NoteTextEditorProps {
	note: INote;
}
export function NotesTextEditor({ note }: NoteTextEditorProps) {
	const { onCurrentNoteTitleUpdate } = useNotesContext();
	const [title, setTitle] = useState(note.title || "");
	const onTitleUpdate = async () => {
		try {
			await updateNoteTitle(note.id, title);
		} catch (e) {
			console.log(e);
		}
	};

	const updateContentDebounced = useDebouncedCallback(
		async (value: string) => {
			await updateNoteContent(note.id, value);
		},
		1000
	);
	/**
	 * Keeping the initial currentNoteTitle in sync
	 */
	useLayoutEffect(() => {
		onCurrentNoteTitleUpdate(title);
	}, [title, onCurrentNoteTitleUpdate]);

	return (
		<>
			<Input
				defaultValue={title}
				label="Title"
				className="m-auto mt-5 w-auto flex-grow-0"
				onChange={(e) => setTitle(e.target.value)}
				variant="bordered"
				onKeyUp={(e) => {
					if (e.key === "Enter") {
						onTitleUpdate();
					}
				}}
				onBlur={onTitleUpdate}
			/>
			<TextEditor
				content={note.text || ""}
				onUpdate={({ editor }) =>
					updateContentDebounced(editor.getHTML())
				}
			/>
		</>
	);
}
