"use client";

import { createNewGoal } from "@/app/actions";
import { GoalModal } from "./goal-modal";
import { Button, useDisclosure } from "@heroui/react";
import { IconCirclePlusFilled } from "@tabler/icons-react";

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
			<Button
				onPress={onOpen}
				variant="bordered"
				color="primary"
				startContent={<IconCirclePlusFilled />}
			>
				New goal
			</Button>
			{isOpen && (
				<GoalModal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					title="Create a new Goal"
					onSubmit={onSubmit}
				/>
			)}
		</>
	);
}
