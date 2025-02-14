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
import { QuestionSection } from "./notes-timeline";

const SHOW_ALL = "show_all";
interface NotesTimelineDropdownProps {
	questions: IDiaryQuestion[];
	goals: IGoal[];
	currentSelectedAnswerId?: number;
	setSelectionChange: (newId?: number) => void;
}
export function NotesTimelineDropdown({
	questions,
	goals,
	currentSelectedAnswerId,
	setSelectionChange,
}: NotesTimelineDropdownProps) {
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
			<DropdownTrigger className="self-end">
				<Button variant="bordered">{getTriggerTitle()}</Button>
			</DropdownTrigger>
			<DropdownMenu
				onAction={(key) => {
					if (key === SHOW_ALL) {
						return setSelectionChange(undefined);
					}
					return setSelectionChange(Number(key));
				}}
			>
				<DropdownSection>
					{isFilterActive ? (
						<DropdownItem key={SHOW_ALL}>Show All</DropdownItem>
					) : null}
				</DropdownSection>
				<DropdownSection title="Goals">
					{goals.map((goal) => (
						<DropdownItem key={goal.id}>
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
						<DropdownItem key={question.id}>
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
