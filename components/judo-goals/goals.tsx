import { createClient } from "@/utils/supabase/server";

import { GoalCard } from "./goal-card";

export default async function Goals() {
	const supabase = await createClient();
	const { data: goals } = await supabase.from("goals").select();
	if (goals == null || goals.length == 0) {
		return <div>No goals to show</div>;
	}
	return (
		<div className="flex flex-row flex-wrap justify-around">
			{goals.map((goal) => (
				<GoalCard
					id={goal.id}
					key={goal.id}
					title={goal.title}
					description={goal.description ?? ""}
					rank={goal.rank}
				/>
			))}
		</div>
	);
}
