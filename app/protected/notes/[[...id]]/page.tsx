import { getAllNotes } from "@/app/actions";
import { NotesContextSetter } from "@/components/notes/notes-context";
import { NotesEmptyState } from "@/components/notes/notes-empty-state";
import { NotesTextEditor } from "@/components/notes/notes-text-editor";
import { DesktopNotesSidebar } from "@/components/notes/sidebars";

export default async function NotesPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const id = (await params).id;
	const notes = await getAllNotes();

	const noNotes = !notes || notes.length === 0;
	const generalPage = id == null;

	if (noNotes) {
		return (
			<div className="flex flex-col justify-start items-start flex-1 p-4">
				<NotesEmptyState />
			</div>
		);
	}
	// Different empty state, this means that we selected the main view
	// probably like a callout for selecting one Note from the side or create a new
	if (generalPage) {
		return (
			<>
				<div className="flex flex-col justify-start items-start flex-1 p-4 md:mr-72">
					<NotesEmptyState
						title="Notes!"
						description="Create or select a new note to improve your judo knowledge!"
					/>
				</div>
				<DesktopNotesSidebar notes={notes} />
			</>
		);
	}
	const selectedNote = notes.find((note) => note.id === Number(id));
	// Different empty state, this means that we have notes but the id does not exist
	// probably like a callout for selecting a different notes or create a new one
	if (!selectedNote) {
		return <NotesEmptyState />;
	}
	return (
		<>
			<NotesContextSetter notes={notes} />
			<div className="flex flex-col justify-start items-start flex-1 p-4 md:mr-72">
				<NotesTextEditor note={selectedNote} />
			</div>
			<DesktopNotesSidebar notes={notes} />
		</>
	);
}
