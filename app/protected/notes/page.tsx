import { getALlNotes } from "@/app/actions";
import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { CreateNewNoteButton } from "@/components/notes/create-new-note-button";
import { cn } from "@/lib/utils";
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
				<BentoGrid className="p-10 w-full flex-1">
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
				</BentoGrid>
			)}
		</div>
	);
}
