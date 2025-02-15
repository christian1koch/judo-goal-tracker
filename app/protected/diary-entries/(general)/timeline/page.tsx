import {
	getGoals,
	getDiaryEntryWithRelations,
	getQuestions,
} from "@/app/actions";
import { DiaryEntriesTimeline } from "@/components/diary-entries/diary-entries-timeline/diary-entries-timeline";

export default async function DiaryEntriesTimelinePage() {
	const diaryEntries = await getDiaryEntryWithRelations();
	const questions = (await getQuestions()) ?? [];
	const goals = (await getGoals()) ?? [];
	return (
		<DiaryEntriesTimeline
			diaryEntries={diaryEntries}
			defaultQuestions={questions}
			defaultGoals={goals}
		/>
	);
}
