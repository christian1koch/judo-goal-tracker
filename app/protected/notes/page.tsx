import { createNote, getALlNotes } from "@/app/actions";
import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { SidebarDemo } from "@/components/main-sidebar";
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
				"rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
				"h-screen"
			)}
		>
			<SidebarDemo />
			<BentoGrid>
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

const Dashboard = () => {
	return (
		<div className="flex flex-1">
			<div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
				<div className="flex gap-2">
					{[...new Array(4)].map((i) => (
						<div
							key={"first" + i}
							className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
						></div>
					))}
				</div>
				<div className="flex gap-2 flex-1">
					{[...new Array(2)].map((i) => (
						<div
							key={"second" + i}
							className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
						></div>
					))}
				</div>
			</div>
		</div>
	);
};
