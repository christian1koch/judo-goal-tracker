import { NotesSidebar } from "@/components/notes/notes-sidebar";
import { NotesTextEditor } from "@/components/notes/notes-text-editor";

export default function NotesPage() {
	return (
		<>
			<div className="flex flex-col justify-start items-start flex-1 mr-8 md:mr-72">
				<NotesTextEditor />
			</div>
			<NotesSidebar />
		</>
	);
}
