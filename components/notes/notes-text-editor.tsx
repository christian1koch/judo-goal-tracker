"use client";
import { Input } from "@heroui/react";
import TextEditor, { SuggestionOption } from "../ui/text-editor/text-editor";
import { INote } from "@/types";
import { updateNoteContent, updateNoteTitle } from "@/app/actions";
import { useLayoutEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useNotesContext } from "./notes-context";
import { getURL } from "@/lib/utils";

interface NoteTextEditorProps {
	note: INote;
}
export function NotesTextEditor({ note }: NoteTextEditorProps) {
	const { onCurrentNoteTitleUpdate, notes } = useNotesContext();
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

	const notesToSuggestionOption = () => {
		const suggestionsOptionsList: SuggestionOption[] = notes.map(
			(note) => ({
				title: note.title || "Untitled Note",
				searchTerms: [note.title || "Untitled Note"],
				command({ editor, range }) {
					const noteTitle = note.title || "Untitled Note";

					// First delete the range (the slash command)
					editor.chain().focus().deleteRange(range).run();

					// Then insert the text
					editor.chain().focus().insertContent(noteTitle).run();

					// Calculate the position after insertion
					const from = range.from;
					const to = from + noteTitle.length;

					// Create a mark for this text range
					editor
						.chain()
						.setTextSelection({ from, to })
						.setLink({
							href: `${getURL()}protected/notes/${note.id}`,
						})
						.run();
				},
				id: note.id,
			})
		);
		return suggestionsOptionsList;
	};

	return (
		<>
			<Input
				defaultValue={title}
				label="Title"
				className="m-auto mb-4 w-auto flex-grow-0"
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
				suggestionsList={notesToSuggestionOption()}
			/>
		</>
	);
}
