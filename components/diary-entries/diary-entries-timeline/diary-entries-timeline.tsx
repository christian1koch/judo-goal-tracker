"use client";
import { Timeline, TimelineEntry } from "../../ui/timeline";
import dayjs from "dayjs";
import {
	IDiaryGoalAnswer,
	IDiaryEntryWithInfo,
	IDiaryQuestion,
	IDiaryQuestionAnswer,
	IGoal,
} from "@/types";
import { IconHelpHexagon, IconRocket } from "@tabler/icons-react";
import { DiaryEntriesTimelineDropdown } from "./diary-entries-timeline-dropdown";
import { useSearchParams } from "@/lib/hooks/useSearchParams";
interface DiaryEntriesTimelineProps {
	diaryEntries: IDiaryEntryWithInfo[];
	defaultQuestions: IDiaryQuestion[];
	defaultGoals: IGoal[];
}
export function DiaryEntriesTimeline({
	diaryEntries,
	defaultGoals,
	defaultQuestions,
}: DiaryEntriesTimelineProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const filterIdSearchParam = searchParams.get("filterId");
	const filterId = filterIdSearchParam
		? Number(filterIdSearchParam)
		: undefined;
	const isGoalSearchParam = searchParams.get("isGoal") ?? undefined;
	const isGoal = isGoalSearchParam != null;

	const setCurrentFilterId = (
		newFilterId: number | undefined,
		isGoal?: boolean
	) =>
		setSearchParams((prev) => {
			const newSearchParams = new URLSearchParams(prev);
			if (newFilterId) {
				newSearchParams.set("filterId", String(newFilterId));
				if (isGoal) {
					newSearchParams.set("isGoal", "true");
					return newSearchParams;
				}
				newSearchParams.delete("isGoal");
				return newSearchParams;
			}
			newSearchParams.delete("filterId");
			newSearchParams.delete("isGoal");
			return newSearchParams;
		});

	const getOrder = (index: number, length: number) => {
		if (index === 0) {
			return "first";
		}
		if (index === length - 1) {
			return "last";
		}
		return undefined;
	};
	const hasFilter = filterId != null;
	const getFilteredQuestions = (questions: IDiaryQuestionAnswer[]) => {
		if (isGoal) {
			return [];
		}
		if (hasFilter) {
			return questions.filter(
				(question) => question.question?.id === filterId
			);
		}
		return questions;
	};
	const getFilteredGoals = (goals: IDiaryGoalAnswer[]) => {
		if (hasFilter && !isGoal) {
			return [];
		}
		if (hasFilter) {
			return goals.filter((goal) => goal.goal?.id === filterId);
		}
		return goals;
	};
	const filteredNotes = diaryEntries
		.map((note) => {
			const filteredQuestions = getFilteredQuestions(note.questions);
			const filteredGoals = getFilteredGoals(note.goals);
			if (filteredGoals.length === 0 && filteredQuestions.length === 0) {
				return null;
			}
			return {
				...note,
				questions: filteredQuestions,
				goals: filteredGoals,
			};
		})
		.filter((n) => n !== null);
	return (
		<>
			<DiaryEntriesTimelineDropdown
				questions={defaultQuestions}
				goals={defaultGoals}
				setSelectionChange={setCurrentFilterId}
				currentSelectedAnswerId={filterId}
			/>
			<Timeline>
				{filteredNotes.map((note, i) => (
					<TimelineEntry
						key={note.id}
						title={note.title ?? ""}
						date={dayjs(note.date).toDate()}
						order={getOrder(i, diaryEntries.length)}
					>
						<QuestionSectionlist
							questionAnswers={note.questions}
							goalAnswers={note.goals}
						/>
					</TimelineEntry>
				))}
			</Timeline>
		</>
	);
}

interface QuestionSectionProps {
	question: string;
	answer?: string;
	isGoal?: boolean;
	isAnswerHidden?: boolean;
}
export const QuestionSection = ({
	question,
	answer,
	isGoal,
	isAnswerHidden,
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
			{!isAnswerHidden && (
				<div className="flex gap-0 m-2 pl-4">
					<ul className="list-disc">
						<li>
							<p className="text-sm">{answer}</p>
						</li>
					</ul>
				</div>
			)}
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
