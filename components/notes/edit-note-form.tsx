"use client";
import { updateAnswer } from "@/app/actions";
import { IDiaryAnswer, IDiaryNote, IDiaryQuestion, IGoal } from "@/types";
import { DatePicker, Divider, Input, Textarea } from "@heroui/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { ChangeEvent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface EditNodeFormProps {
	goals: IGoal[];
	questions: IDiaryQuestion[];
	answers: IDiaryAnswer[];
	note: IDiaryNote;
}
function getGoalText(goalTitle: string) {
	return "What did you do to work on your goal: " + goalTitle;
}

export function EditNoteForm({
	goals,
	questions,
	answers,
	note,
}: EditNodeFormProps) {
	const initialGoalAnswers = answers.filter(
		(answer) => answer.goal_id != null
	);
	const initialQuestionAnswers = answers.filter(
		(answer) => answer.question_id != null
	);
	const [goalAnswers, setGoalAnswers] =
		useState<IDiaryAnswer[]>(initialGoalAnswers);
	const [questionAnswers, setQuestionAnswers] = useState<IDiaryAnswer[]>(
		initialQuestionAnswers
	);
	// TODO: Add title saving logic
	const [title, setTitle] = useState(note?.title || "");
	const [generalNotes, setGeneralNotes] = useState("");
	// TODO: Add date logic
	const [date, setDate] = useState(parseDate(note.date!));

	const onGoalAnswerChange = (newText: string, goalId: number) => {
		console.log(answers);
		const currentAnswer = goalAnswers.find(
			(answer) => answer.goal_id === goalId
		);
		const strippedAnswers = goalAnswers.filter((a) => a.goal_id !== goalId);
		if (currentAnswer) {
			console.log("current Answer", currentAnswer);
			const newAnswer: IDiaryAnswer = { ...currentAnswer, text: newText };
			setGoalAnswers([...strippedAnswers, newAnswer]);
		}
	};

	const getGoalAnswer = (goalId: number) => {
		return goalAnswers.find((a) => a.goal_id === goalId);
	};
	const getQuestionAnswer = (questionId: number) => {
		return questionAnswers.find((a) => a.question_id === questionId);
	};

	return (
		<div className="flex flex-col justify-center max-w-4xl m-auto border rounded-lg border-default-300 my-5 p-10">
			<div className="flex flex-row justify-center">
				<h1 className="text-4xl">Edit Note</h1>
			</div>
			<div className="flex flex-row w-full justify-between px-20 py-2 mb-10">
				<div>
					<Input
						label="Title"
						variant="underlined"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div>
					<DatePicker
						label="Date"
						variant="underlined"
						value={date}
					/>
				</div>
			</div>
			<div className=" flex flex-col p-5 gap-10">
				<section className="flex flex-col  gap-10">
					<div>
						<h2 className="text-2xl">Goals</h2>
						<Divider className="my-2" />
					</div>
					{goals.map((goal) => (
						<QuestionSection
							key={goal.id}
							questionText={getGoalText(goal.title)}
							answer={getGoalAnswer(goal.id)}
						/>
					))}
				</section>
				<section className="flex flex-col gap-10">
					<div>
						<h2 className="text-2xl">General Questions</h2>
						<Divider className="my-2" />
					</div>
					{questions.map((question) => (
						<QuestionSection
							key={question.id}
							questionText={question.text || ""}
							answer={getQuestionAnswer(question.id)}
						/>
					))}
				</section>
				<section className="flex flex-col gap-10">
					<div>
						<h2 className="text-2xl">General Notes</h2>
						<Divider className="my-2" />
						<Textarea
							placeholder="Write more information"
							minRows={10}
							value={generalNotes}
							onChange={(e) => setGeneralNotes(e.target.value)}
						/>
					</div>
				</section>
			</div>
		</div>
	);
}

interface QuestionSectionProps {
	questionText: string;
	answer?: IDiaryAnswer;
}

function QuestionSection({ questionText, answer }: QuestionSectionProps) {
	const [isSaving, setIsSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	const updateAnswerDebounced = useDebouncedCallback(
		async (value: string) => {
			if (!answer) return null;
			// TODO: Add try catch
			await updateAnswer({ ...answer, text: value });
			setIsSaving(false);
			setSaved(true);
		},
		1000
	);

	const getDescriptionText = () => {
		if (isSaving) {
			return <p className="text-default-400">{"Saving..."}</p>;
		}
		if (saved) {
			return <p className="text-primary-400">{"Saved."}</p>;
		}
		return null;
	};

	const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSaved(false);
		setIsSaving(true);
		updateAnswerDebounced(e.target.value);
	};

	if (!answer) {
		return null;
	}
	return (
		<div className="">
			<p className="pb-2">{questionText}</p>
			<Textarea
				label="Answer"
				// onChange={(e) => onTextChange(e.target.value)}
				defaultValue={answer.text ?? undefined}
				onChange={handleAnswerChange}
				description={getDescriptionText()}
			/>
		</div>
	);
}
