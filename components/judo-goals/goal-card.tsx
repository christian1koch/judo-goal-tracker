"use client";
import {
	Card,
	CardHeader,
	Divider,
	CardBody,
	useDisclosure,
} from "@heroui/react";
import { Goal } from "lucide-react";
import EditNewGoalModal from "./edit-new-goal-modal";

interface GoalCardProps {
	id: number;
	title: string;
	description: string;
	rank: number;
}
export function GoalCard(props: GoalCardProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	return (
		<>
			<EditNewGoalModal
				goalId={props.id}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				initialName={props.title}
				initialDescription={props.description}
			/>
			<Card
				className="max-w-[400px] min-w-[400px] m-10 hover:opacity-85"
				isPressable
				onPress={onOpen}
			>
				<CardHeader className="flex gap-3">
					<div className="flex flex-row justify-center w-full">
						<Goal className="mr-4" />
						<p className="text-xl">{props.title}</p>
					</div>
				</CardHeader>
				<Divider />
				<CardBody className="p-6">
					<p>{props.description}</p>
				</CardBody>
			</Card>
		</>
	);
}
