import { getNotesWithRelations } from "@/app/actions";
import { Timeline, TimelineEntry } from "../ui/timeline";
import dayjs from "dayjs";
import { IDiaryGoalAnswer, IDiaryQuestionAnswer } from "@/types";
import { IconHelpHexagon, IconRocket } from "@tabler/icons-react";

export async function NotesTimeline() {
	const notes = await getNotesWithRelations();
	const getOrder = (index: number, length: number) => {
		if (index === 0) {
			return "first";
		}
		if (index === length - 1) {
			return "last";
		}
		return undefined;
	};
	return (
		<Timeline>
			{notes.map((note, i) => (
				<TimelineEntry
					key={note.id}
					title={note.title ?? ""}
					date={dayjs(note.date).toDate()}
					order={getOrder(i, notes.length)}
				>
					<QuestionSectionlist
						questionAnswers={note.questions}
						goalAnswers={note.goals}
					/>
				</TimelineEntry>
			))}
		</Timeline>
	);
}

interface QuestionSectionProps {
	question: string;
	answer?: string;
	isGoal?: boolean;
}
const QuestionSection = ({
	question,
	answer,
	isGoal,
}: QuestionSectionProps) => {
	return (
		<div>
			<div className="flex">
				{isGoal ? (
					<>
						<IconRocket className="stroke-primary-400 mr-1" />
						<h2 className="font-semibold text-medium">
							{"Goal: " + question}
						</h2>
					</>
				) : (
					<>
						<IconHelpHexagon className="stroke-success-500 mr-1" />
						<h2 className="font-semibold text-medium">
							{question}
						</h2>
					</>
				)}
			</div>
			<div className="flex gap-0 m-2 pl-4">
				<ul className="list-disc">
					<li>
						<p className="text-sm">{answer}</p>
					</li>
				</ul>
			</div>
		</div>
	);
};

interface QuestionSectionList {
	questionAnswers: IDiaryQuestionAnswer[];
	goalAnswers: IDiaryGoalAnswer[];
}

const QuestionSectionlist = ({
	questionAnswers,
	goalAnswers,
}: QuestionSectionList) => {
	return (
		<div>
			{goalAnswers.map((goalAnswer) => (
				<QuestionSection
					key={goalAnswer.answerId}
					question={goalAnswer.goal?.title ?? ""}
					answer={goalAnswer.answer ?? ""}
					isGoal
				/>
			))}
			{questionAnswers.map((questionAnswer) => (
				<QuestionSection
					key={questionAnswer.answerId}
					question={questionAnswer?.question?.text ?? ""}
					answer={questionAnswer.answer ?? ""}
				/>
			))}
		</div>
	);
};
