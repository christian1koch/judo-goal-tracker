import { getAllDiaryEntries } from "@/app/actions";
import { BentoGridItem } from "@/components/bento-grid";
import { NotesBentoGrid } from "@/components/notes/components/notes-bento-grid";
// import { Icon12Hours } from "@tabler/icons-react";
import Link from "next/link";

export default async function Page() {
	const notes = await getAllDiaryEntries();

	return (
		<>
			{!notes || notes.length === 0 ? (
				<div>No Notes found, Create a new note to start</div>
			) : (
				<NotesBentoGrid>
					{notes.map((n) => (
						<BentoGridItem
							key={n.id}
							header={n.title}
							title={
								<Link href={`./notes/edit/${n.id}`}>
									Go to note
								</Link>
							}
							description={n.date}
						/>
					))}
				</NotesBentoGrid>
			)}
		</>
	);
}
