import { Button } from "@heroui/react";
import { IconCirclePlusFilled, IconNotes } from "@tabler/icons-react";

interface NotesEmptyState {
	title?: string;
	description?: string;
}
export function NotesEmptyState({ title, description }: NotesEmptyState) {
	return (
		<div className="m-auto flex flex-col items-center gap-2">
			<IconNotes size={120} />
			<h1 className="font-bold">{title || "No notes created"}</h1>
			<p>
				{description ||
					"Create a new note to save all your judo knowledge!"}
			</p>
			<Button
				className="mt-2"
				startContent={<IconCirclePlusFilled />}
				color="primary"
			>
				New note
			</Button>
		</div>
	);
}
