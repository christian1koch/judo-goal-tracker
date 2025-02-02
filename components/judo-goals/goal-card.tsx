import { Card, CardHeader, Divider, CardBody } from "@heroui/react";
import { Goal } from "lucide-react";
import goals from "./goals";

interface GoalCardProps {
	title: string;
	description: string;
	rank: number;
}
export function GoalCard(props: GoalCardProps) {
	return (
		<Card className="max-w-[400px]">
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
	);
}
