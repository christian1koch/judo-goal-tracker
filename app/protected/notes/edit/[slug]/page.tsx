import {
	getAnswersByNoteId,
	getGoals,
	getNoteById,
	getQuestions,
} from "@/app/actions";
import { EditNoteForm } from "@/components/notes/edit-note-form";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;
	const note = await getNoteById(Number(slug));
	const questions = await getQuestions();
	const goals = await getGoals();
	const answers = await getAnswersByNoteId(Number(slug));
	if (!questions || !goals || !note || !answers) {
		return <div>Cant get questions...</div>;
	}
	return (
		<EditNoteForm
			key={note.id}
			goals={goals}
			questions={questions}
			answers={answers}
			note={note}
		/>
	);
}
