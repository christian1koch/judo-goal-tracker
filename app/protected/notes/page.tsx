import { createNote, getALlNotes } from "@/app/actions";
import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { MainSidebar } from "@/components/main-sidebar";
import { cn } from "@/lib/utils";
import { Button, Link } from "@heroui/react";

export default async function Page() {
	// const createNewNote = async () => {
	// 	await createNote("", "");
	// };
	const notes = await getALlNotes();
	if (!notes || notes.length === 0) {
		return <div>No Notes found</div>;
	}
	// return (
	// 	// <Button color="primary" onPress={createNewNote}>
	// 	// 	Create New Note
	// 	// </Button>
	// );
	return (
		<div
			className={cn(
				"rounded-md flex flex-col md:flex-row w-full flex-1 max-w-7xl mx-auto borderoverflow-hidden"
			)}
		>
			<BentoGrid className="p-10 w-full">
				{notes.map((n) => (
					<BentoGridItem
						key={n.id}
						header={n.title}
						title={<Link href={`./notes/${n.id}`}>Go to note</Link>}
						description={n.date}
					/>
				))}
			</BentoGrid>
		</div>
	);
}
