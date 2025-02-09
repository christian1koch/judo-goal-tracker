import { getGoals, getQuestions } from "@/app/actions";
import { EditNoteForm } from "@/components/notes/edit-note-form";

export default async function Page() {
	const questions = await getQuestions();
	const goals = await getGoals();
	if (!questions || !goals) {
		return <div>Cant get questions...</div>;
	}
	return <EditNoteForm goals={goals} questions={questions} answers={[]} />;
}
