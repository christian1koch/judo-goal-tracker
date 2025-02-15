"use client";
import { IDiaryQuestion, IGoal } from "@/types";
import {
	Dropdown,
	DropdownTrigger,
	Button,
	DropdownMenu,
	DropdownItem,
	DropdownSection,
} from "@heroui/react";
import { QuestionSection } from "./diary-entries-timeline";

const SHOW_ALL = "show_all";
const GOAL_ID = "goal_id";
const QUESTION_ID = "question_id";
interface DiaryEntriesTimelineDropdownProps {
	questions: IDiaryQuestion[];
	goals: IGoal[];
	currentSelectedAnswerId?: number;
	setSelectionChange: (newId: number | undefined, isGoal?: boolean) => void;
}
export function DiaryEntriesTimelineDropdown({
	questions,
	goals,
	currentSelectedAnswerId,
	setSelectionChange,
}: DiaryEntriesTimelineDropdownProps) {
	const [currentSelectedGoal] = goals.filter(
		(goal) => goal.id === currentSelectedAnswerId
	);
	const [currentSelectedQuestion] = questions.filter(
		(question) => question.id === currentSelectedAnswerId
	);

	const isFilterActive = currentSelectedAnswerId != null;

	const getTriggerTitle = () => {
		const questionTitle =
			currentSelectedGoal?.title || currentSelectedQuestion?.text;

		const isGoal = currentSelectedGoal != null;
		const isQuestion = currentSelectedQuestion != null;

		if (isGoal || isQuestion) {
			return (
				<QuestionSection
					question={questionTitle ?? ""}
					isGoal={isGoal}
					isAnswerHidden
				/>
			);
		}
		return "Filter by";
	};

	return (
		<Dropdown>
			<DropdownTrigger className="self-end m-2">
				<Button variant="bordered">{getTriggerTitle()}</Button>
			</DropdownTrigger>
			<DropdownMenu
				onAction={(key) => {
					if (key === SHOW_ALL) {
						return setSelectionChange(undefined);
					}
					let stringKey = key.toString();
					if (stringKey.includes(GOAL_ID)) {
						stringKey = stringKey.replace(GOAL_ID, "");
						return setSelectionChange(Number(stringKey), true);
					}
					stringKey = stringKey.replace(QUESTION_ID, "");
					return setSelectionChange(Number(stringKey));
				}}
			>
				<DropdownSection>
					{isFilterActive ? (
						<DropdownItem key={SHOW_ALL}>Show All</DropdownItem>
					) : null}
				</DropdownSection>
				<DropdownSection title="Goals">
					{goals.map((goal) => (
						<DropdownItem key={GOAL_ID + goal.id}>
							<QuestionSection
								question={goal.title}
								isGoal
								isAnswerHidden
							/>
						</DropdownItem>
					))}
				</DropdownSection>
				<DropdownSection title="General Questions">
					{questions.map((question) => (
						<DropdownItem key={QUESTION_ID + question.id}>
							<QuestionSection
								question={question.text ?? ""}
								isAnswerHidden
							/>
						</DropdownItem>
					))}
				</DropdownSection>
			</DropdownMenu>
		</Dropdown>
	);
}
