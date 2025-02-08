"use client";

import { deleteGoal, updateGoal } from "@/app/actions";
import { GoalModal, OpeningModalProps } from "./goal-modal";

interface EditNewGoalModal extends OpeningModalProps {
	goalId: number;
	isDeleteButtonShown?: boolean;
	onDelete?: () => void;
	initialName: string;
	initialDescription?: string;
}

export default function EditNewGoalModal({
	isOpen,
	onOpenChange,
	initialName,
	initialDescription,
	goalId,
}: EditNewGoalModal) {
	const onSubmit = async (name: string, description: string) => {
		return await updateGoal(goalId, name, description);
	};
	const onDelete = async () => {
		return await deleteGoal(goalId);
	};

	return (
		<>
			<GoalModal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				title="Edit Goal"
				onSubmit={onSubmit}
				initialName={initialName}
				initialDescription={initialDescription}
				isDeleteButtonShown
				onDelete={onDelete}
			/>
		</>
	);
}
