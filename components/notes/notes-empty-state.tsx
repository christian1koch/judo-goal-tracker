import { IconNotes } from "@tabler/icons-react";
import { AddNewNotesButton } from "./add-new-note";

interface NotesEmptyState {
	title?: string;
	description?: string;
}
export function NotesEmptyState({ title, description }: NotesEmptyState) {
	return (
		<div className="m-auto flex flex-col items-start gap-2">
			<div className="w-full h-40 relative rounded-xl bg-primary-500">
				<IconNotes className=" absolute p-4 w-full h-full top-0 left-0 bg-black opacity-40 z-10 transition-opacity duration-300 hover:opacity-20 " />
			</div>
			<h1 className="font-bold">{title || "No notes created"}</h1>
			<p>
				{description ||
					"Create a new note to save all your judo knowledge!"}
			</p>
			<AddNewNotesButton className="self-stretch" />
		</div>
	);
}
