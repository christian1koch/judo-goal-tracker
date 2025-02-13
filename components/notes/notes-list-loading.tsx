import { Skeleton } from "@heroui/react";
import { BentoGridItem } from "../bento-grid";
import { NotesBentoGrid } from "./components/notes-bento-grid";

const bentoGridProps = {
	header: <Skeleton className="w-full h-full rounded-md" />,
	title: <Skeleton className="w-full h-5 rounded-md" />,
	description: <Skeleton className="w-full h-5 rounded-md" />,
};
const items = Array.from({ length: 10 }, () => bentoGridProps);
export function NotesListLoading() {
	return (
		<NotesBentoGrid>
			{items.map((item, i) => (
				<BentoGridItem key={i} {...item} />
			))}
		</NotesBentoGrid>
	);
}
