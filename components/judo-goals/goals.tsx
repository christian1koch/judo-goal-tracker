import { createClient } from "@/utils/supabase/server";

import { GoalCard } from "./goal-card";
import { GoalsContainer } from "./goals-container.tsx/goals-container";

export default async function Goals() {
	const supabase = await createClient();
	const { data: goals } = await supabase.from("goals").select();
	if (goals == null || goals.length == 0) {
		return <div>No goals to show</div>;
	}
	return (
		<GoalsContainer>
			{goals.map((goal) => (
				<GoalCard
					id={goal.id}
					key={goal.id}
					title={goal.title}
					description={goal.description ?? ""}
					rank={goal.rank}
				/>
			))}
		</GoalsContainer>
	);
}
