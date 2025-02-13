import { CreateNewNoteButton } from "@/components/notes/create-new-note-button";
import { NotesTimelineButtonGroup } from "@/components/notes/notes-timelane-button-group";

export default function NotesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col w-full">
			<div className="flex justify-end p-5 gap-2">
				<NotesTimelineButtonGroup />
				<CreateNewNoteButton />
			</div>
			{children}
		</div>
	);
}
