import { getALlNotes } from "@/app/actions";
import { BentoGridItem } from "@/components/bento-grid";
import { NotesBentoGrid } from "@/components/notes/components/notes-bento-grid";
import { CreateNewNoteButton } from "@/components/notes/create-new-note-button";
import { cn } from "@/lib/utils";
// import { Icon12Hours } from "@tabler/icons-react";
import Link from "next/link";

export default async function Page() {
	const notes = await getALlNotes();

	return (
		<div
			className={cn(
				"rounded-md flex flex-col md:flex-col w-full justify-center flex-1 max-w-7xl mx-auto borderoverflow-hidden"
			)}
		>
			<div className="flex justify-end pr-10">
				<CreateNewNoteButton />
			</div>

			{!notes || notes.length === 0 ? (
				<div>No Notes found, Create a new note to start</div>
			) : (
				<NotesBentoGrid>
					{notes.map((n) => (
						<BentoGridItem
							key={n.id}
							header={n.title}
							title={
								<Link href={`./notes/${n.id}`}>Go to note</Link>
							}
							description={n.date}
						/>
					))}
				</NotesBentoGrid>
			)}
		</div>
	);
}
