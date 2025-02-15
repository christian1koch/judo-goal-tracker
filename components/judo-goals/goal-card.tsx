"use client";
import {
	Card,
	CardHeader,
	Divider,
	CardBody,
	useDisclosure,
	CardFooter,
} from "@heroui/react";
import EditNewGoalModal from "./edit-new-goal-modal";
import { IconRocket } from "@tabler/icons-react";
import Link from "next/link";

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
			<Card className="max-w-[400px] w-72 md:w-96 m-10 hover:opacity-85 bg-background border">
				<CardHeader
					className="cursor-pointer flex gap-3"
					onClick={onOpen}
				>
					<div className="flex flex-row justify-start gap-1 w-full">
						<IconRocket className="mr-4 stroke-primary-400" />
						<p className="text-xl">{props.title}</p>
					</div>
				</CardHeader>
				<Divider />
				<CardBody className="p-6 cursor-pointer" onClick={onOpen}>
					<p>{props.description}</p>
				</CardBody>
				<Divider />
				<CardFooter onClick={(e) => e.stopPropagation()}>
					<Link
						href={`/protected/diary-entries/timeline?filterId=${props.id}&isGoal=true`}
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						<p className="text-primary-400 font-thin">
							Click here to see the diary entries with this goal
						</p>
					</Link>
				</CardFooter>
			</Card>
		</>
	);
}
