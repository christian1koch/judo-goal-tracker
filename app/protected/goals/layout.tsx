import AddNewGoalModal from "@/components/judo-goals/add-new-goal-modal";

export default async function GoalsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-full h-full">
			<div className="flex justify-center py-4">
				<h1 className="text-4xl font-extrabold">Goals</h1>
			</div>
			<div className="w-full flex justify-end p-2">
				<AddNewGoalModal />
			</div>
			{children}
		</div>
	);
}
