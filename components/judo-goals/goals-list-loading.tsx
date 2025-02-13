import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Skeleton,
} from "@heroui/react";
import { GoalsContainer } from "./goals-container.tsx/goals-container";

const GoalsCardSkeleton = () => (
	<Card className="max-w-[400px] min-w-[400px] m-10 hover:opacity-85 bg-background border">
		<CardHeader>
			<Skeleton className="w-full h-8 rounded-md" />
		</CardHeader>
		<Divider />
		<CardBody className="p-6">
			<Skeleton className="w-full h-8 rounded-md" />
		</CardBody>
		<Divider />
		<CardFooter>
			<Skeleton className="w-full h-8 rounded-md" />
		</CardFooter>
	</Card>
);
export function GoalsListLoading() {
	const items = Array.from({ length: 10 }, (v, i) => (
		<GoalsCardSkeleton key={i} />
	));
	return <GoalsContainer>{items}</GoalsContainer>;
}
