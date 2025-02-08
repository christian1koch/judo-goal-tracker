"use client";

import { createNewGoal } from "@/app/actions";
import { GoalModal } from "./goal-modal";
import { Button, useDisclosure } from "@heroui/react";

interface AddNewGoalModal {
	isDeleteButtonShown?: boolean;
	onDelete?: () => void;
}

export default function AddNewGoalModal() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const onSubmit = async (name: string, description: string) => {
		return await createNewGoal(name, description);
	};

	return (
		<>
			<Button onPress={onOpen}>Create a new goal</Button>
			{isOpen && (
				<GoalModal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					title="Create A new Goal"
					onSubmit={onSubmit}
				/>
			)}
		</>
	);
}
