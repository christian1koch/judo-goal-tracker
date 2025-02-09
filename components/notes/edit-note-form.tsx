"use client";
import { IDiaryAnswer, IDiaryNote, IDiaryQuestion, IGoal } from "@/types";
import { DatePicker, Divider, Input, Textarea } from "@heroui/react";
import { useState } from "react";

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

	const [title, setTitle] = useState(note?.title || "");
	const [generalNotes, setGeneralNotes] = useState("");

	const onGoalAnswerChange = (newText: string, goalId: number) => {
		console.log(answers);
		const currentAnswer = goalAnswers.find(
			(answer) => answer.goal_id === goalId
		);
		console.log("goalId", goalId);
		console.log("currentAnswer", currentAnswer);
		const strippedAnswers = goalAnswers.filter((a) => a.goal_id !== goalId);
		if (currentAnswer) {
			console.log("current Answer", currentAnswer);
			const newAnswer: IDiaryAnswer = { ...currentAnswer, text: newText };
			setGoalAnswers([...strippedAnswers, newAnswer]);
		}
	};

	const onQuestionAnswerChange = (newText: string, questionId: number) => {
		const currentAnswer = questionAnswers.find(
			(answer) => answer.question_id === questionId
		);
		const strippedAnswers = questionAnswers.filter(
			(a) => a.question_id !== questionId
		);
		if (currentAnswer) {
			const newAnswer: IDiaryAnswer = { ...currentAnswer, text: newText };
			setQuestionAnswers([...strippedAnswers, newAnswer]);
		}
	};

	const getGoalAnswer = (goalId: number) => {
		return goalAnswers.find((a) => a.goal_id === goalId);
	};
	const getQuestionAnswer = (questionId: number) => {
		return questionAnswers.find((a) => a.question_id === questionId);
	};

	return (
		<div className="flex flex-col justify-center max-w-4xl m-auto border rounded-lg border-primary-500 my-5 p-10">
			<div className="flex flex-row justify-center">
				<h1 className="text-6xl">Edit Note</h1>
			</div>
			<div className="flex flex-row w-full justify-between px-20 py-2 mb-10">
				<div>
					<Input
						label="Title"
						size="lg"
						variant="underlined"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div>
					<DatePicker label="Date" size="lg" variant="underlined" />
				</div>
			</div>
			<div className=" flex flex-col p-5 gap-10">
				<section className="flex flex-col  gap-10">
					<div>
						<h2 className="text-4xl">Goals</h2>
						<Divider className="my-4" />
					</div>
					{goals.map((goal) => (
						<QuestionSection
							key={goal.id}
							questionText={getGoalText(goal.title)}
							onTextChange={(newValue) =>
								onGoalAnswerChange(newValue, goal.id)
							}
							value={getGoalAnswer(goal.id)?.text ?? ""}
						/>
					))}
				</section>
				<section className="flex flex-col gap-10">
					<div>
						<h2 className="text-4xl">General Questions</h2>
						<Divider className="my-4" />
					</div>
					{questions.map((question) => (
						<QuestionSection
							key={question.id}
							questionText={question.text || ""}
							onTextChange={(newValue) =>
								onQuestionAnswerChange(newValue, question.id)
							}
							value={getQuestionAnswer(question.id)?.text ?? ""}
						/>
					))}
				</section>
				<section className="flex flex-col gap-10">
					<div>
						<h2 className="text-4xl">General Notes</h2>
						<Divider className="my-4" />
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
	onTextChange: (newValue: string) => void;
	value: string;
}

function QuestionSection({
	questionText,
	onTextChange,
	value,
}: QuestionSectionProps) {
	return (
		<div className="">
			<p className="text-xl pb-2">{questionText}</p>
			<Textarea
				label="Answer"
				value={value}
				onChange={(e) => onTextChange(e.target.value)}
			/>
		</div>
	);
}
