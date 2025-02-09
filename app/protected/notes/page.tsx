import { getGoals, getQuestions } from "@/app/actions";
import { DatePicker, Divider, Input, Textarea } from "@heroui/react";

function getGoalText(goalTitle: string) {
	return "What did you do to work on your goal: " + goalTitle;
}

export default async function Page() {
	const questions = await getQuestions();
	const goals = await getGoals();
	if (!questions || !goals) {
		return <div>Cant get questions...</div>;
	}
	return (
		<div className="flex flex-col justify-center max-w-4xl m-auto">
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
