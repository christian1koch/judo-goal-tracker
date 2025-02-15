import {
	getGoals,
	getDiaryEntryWithRelations,
	getQuestions,
} from "@/app/actions";
import { NotesTimeline } from "@/components/notes/notes-timeline/notes-timeline";

export default async function NotesTimelinePage() {
	const notes = await getDiaryEntryWithRelations();
	const questions = (await getQuestions()) ?? [];
	const goals = (await getGoals()) ?? [];
	return (
		<NotesTimeline
			notes={notes}
			defaultQuestions={questions}
			defaultGoals={goals}
		/>
	);
}
