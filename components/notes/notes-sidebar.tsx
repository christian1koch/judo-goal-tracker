import { getAllNotes } from "@/app/actions";
import { DesktopNotesSidebar } from "./sidebars";

export async function NotesSidebar() {
	const notes = await getAllNotes();
	if (!notes || notes.length === 0) return null;
	return (
		<>
			<DesktopNotesSidebar notes={notes} />
		</>
	);
}
