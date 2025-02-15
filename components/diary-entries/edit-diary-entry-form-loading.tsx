import { Card, Skeleton } from "@heroui/react";

export function EditDiaryEntryFormLoading() {
	return (
		<div>
			<Card
				className="max-w-2xl w-full space-y-5 p-14 bg-background border m-10"
				radius="lg"
			>
				<div className="flex flex-row justify-between items-center">
					<Skeleton className="rounded-lg w-40">
						<div className="h-10 rounded-lg bg-default-300" />
					</Skeleton>
					<Skeleton className="rounded-lg w-40">
						<div className="h-10 rounded-lg bg-default-300" />
					</Skeleton>
				</div>
				<div className="flex flex-col justify-center items-start pt-10">
					<Skeleton className="rounded-lg w-full">
						<div className="h-10 rounded-lg bg-default-300" />
					</Skeleton>
					<Skeleton className="w-full rounded-lg mt-5">
						<div className="h-3 w-4/5 rounded-lg bg-default-200" />
					</Skeleton>
					<Skeleton className="w-full rounded-lg mt-2">
						<div className="h-40 w-2/5 rounded-lg bg-default-300" />
					</Skeleton>
				</div>
				<div className="flex flex-col justify-center items-start pt-10">
					<Skeleton className="rounded-lg w-full">
						<div className="h-10 rounded-lg bg-default-300" />
					</Skeleton>
					<Skeleton className="w-full rounded-lg mt-5">
						<div className="h-3 w-4/5 rounded-lg bg-default-200" />
					</Skeleton>
					<Skeleton className="w-full rounded-lg mt-2">
						<div className="h-40 w-2/5 rounded-lg bg-default-300" />
					</Skeleton>
				</div>
				<div className="flex flex-col justify-center items-start pt-10">
					<Skeleton className="rounded-lg w-full">
						<div className="h-10 rounded-lg bg-default-300" />
					</Skeleton>
					<Skeleton className="w-full rounded-lg mt-5">
						<div className="h-3 w-4/5 rounded-lg bg-default-200" />
					</Skeleton>
					<Skeleton className="w-full rounded-lg mt-2">
						<div className="h-40 w-2/5 rounded-lg bg-default-300" />
					</Skeleton>
				</div>
			</Card>
		</div>
	);
}
