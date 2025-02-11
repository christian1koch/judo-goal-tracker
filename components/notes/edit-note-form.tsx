"use client";
import { updateAnswer, updateNote } from "@/app/actions";
import { IDiaryAnswer, IDiaryNote, IDiaryQuestion, IGoal } from "@/types";
import { DatePicker, Divider, Input, Textarea } from "@heroui/react";
import { parseDate } from "@internationalized/date";
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
	const goalAnswers = answers.filter((answer) => answer.goal_id != null);
	const questionAnswers = answers.filter(
		(answer) => answer.question_id != null
	);

	const updateTitleDebounced = useDebouncedCallback(async (value: string) => {
		await updateNote({ ...note, title: value });
	}, 1000);

	const updateDate = async (date: string) => {
		await updateNote({ ...note, date });
	};

	const getGoalAnswer = (goalId: number) => {
		return goalAnswers.find((a) => a.goal_id === goalId);
	};
	const getQuestionAnswer = (questionId: number) => {
		return questionAnswers.find((a) => a.question_id === questionId);
	};

	const updateNoteText = async (text: string) => {
		return await updateNote({ ...note, general_notes: text });
	};

	const updateAnswerText = async (text: string, answer?: IDiaryAnswer) => {
		if (!answer) {
			return;
		}
		return await updateAnswer({ ...answer, text: text });
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
						defaultValue={note.title ?? ""}
						onChange={(e) => updateTitleDebounced(e.target.value)}
					/>
				</div>
				<div>
					<DatePicker
						label="Date"
						variant="underlined"
						defaultValue={parseDate(note.date!)}
						onChange={(e) => {
							if (e) {
								updateDate(e.toString());
							}
						}}
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
							defaultText={getGoalAnswer(goal.id)?.text ?? ""}
							updateFn={(text) =>
								updateAnswerText(text, getGoalAnswer(goal.id))
							}
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
							defaultText={
								getQuestionAnswer(question.id)?.text ?? ""
							}
							updateFn={(text) =>
								updateAnswerText(
									text,
									getQuestionAnswer(question.id)
								)
							}
						/>
					))}
				</section>
				<section className="flex flex-col gap-10">
					<div>
						<h2 className="text-2xl">General Notes</h2>
						<QuestionSection
							label="Write more information"
							updateFn={updateNoteText}
							defaultText={note.general_notes ?? ""}
						/>
					</div>
				</section>
			</div>
		</div>
	);
}

interface QuestionSectionProps {
	questionText?: string;
	defaultText?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	updateFn: (value: string) => Promise<any>;
	minRows?: number;
	label?: string;
}

function QuestionSection({
	questionText,
	defaultText,
	updateFn,
	minRows,
	label,
}: QuestionSectionProps) {
	const { setIsSaving, setSaved, getDescriptionText } =
		useDescriptionSaveIndicator();

	const updateAnswerDebounced = useDebouncedCallback(
		async (value: string) => {
			await updateFn(value);
			setIsSaving(false);
			setSaved(true);
		},
		1000
	);

	const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSaved(false);
		setIsSaving(true);
		updateAnswerDebounced(e.target.value);
	};

	return (
		<div className="">
			{questionText && <p className="pb-2">{questionText}</p>}
			<Textarea
				label={label ? label : "Answer"}
				// onChange={(e) => onTextChange(e.target.value)}
				defaultValue={defaultText ?? undefined}
				onChange={handleAnswerChange}
				description={getDescriptionText()}
				minRows={minRows}
			/>
		</div>
	);
}

function useDescriptionSaveIndicator() {
	const [isSaving, setIsSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	const getDescriptionText = () => {
		if (isSaving) {
			return <p className="text-default-400">{"Saving..."}</p>;
		}
		if (saved) {
			return <p className="text-primary-400">{"Saved."}</p>;
		}
		return null;
	};

	return { setIsSaving, setSaved, getDescriptionText } as const;
}
