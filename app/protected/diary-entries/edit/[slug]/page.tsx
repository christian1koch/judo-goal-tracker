import {
	getAnswersByDiaryEntryId,
	getGoals,
	getDiaryEntryById,
	getQuestions,
} from "@/app/actions";
import { EditDiaryEntryForm } from "@/components/diary-entries/edit-diary-entry-form";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;
	const diaryEntry = await getDiaryEntryById(Number(slug));
	const questions = await getQuestions();
	const goals = await getGoals();
	const answers = await getAnswersByDiaryEntryId(Number(slug));
	if (!questions || !goals || !diaryEntry || !answers) {
		return <div>Cant get questions...</div>;
	}
	return (
		<EditDiaryEntryForm
			key={diaryEntry.id}
			goals={goals}
			questions={questions}
			answers={answers}
			diaryEntry={diaryEntry}
		/>
	);
}
