"use client";
import { IDiaryAnswer, IDiaryQuestion, IGoal } from "@/types";
import { DatePicker, Divider, Input, Textarea } from "@heroui/react";
import { useState } from "react";

interface EditNodeFormProps {
	goals: IGoal[];
	questions: IDiaryQuestion[];
	answers: IDiaryAnswer[];
}
function getGoalText(goalTitle: string) {
	return "What did you do to work on your goal: " + goalTitle;
}

export function EditNoteForm({ goals, questions, answers }: EditNodeFormProps) {
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

	return (
		<div className="flex flex-col justify-center max-w-4xl m-auto border rounded-lg border-primary-500 my-5 p-10">
			<div className="flex flex-row justify-center">
				<h1 className="text-6xl">Edit Note</h1>
			</div>
			<div className="flex flex-row w-full justify-between px-20 py-2 mb-10">
				<div>
					<Input label="Title" size="lg" variant="underlined" />
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
						/>
					</div>
				</section>
			</div>
		</div>
	);
}

interface QuestionSectionProps {
	questionText: string;
}

function QuestionSection({ questionText }: QuestionSectionProps) {
	return (
		<div className="">
			<p className="text-xl pb-2">{questionText}</p>
			<Textarea label="Answer" />
		</div>
	);
}
