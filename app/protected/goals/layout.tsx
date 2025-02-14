import AddNewGoalModal from "@/components/judo-goals/add-new-goal-modal";

export default async function GoalsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="w-full h-full">{children}</div>;
}
