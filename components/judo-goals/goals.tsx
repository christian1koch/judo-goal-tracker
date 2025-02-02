import { createClient } from "@/utils/supabase/server";

// export default async function Goals() {
// 	const supabase = await createClient();
// 	const { data: goals } = await supabase.from("goals").select();

// 	return <pre>{JSON.stringify(goals, null, 2)}</pre>;
// }

import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Link,
	Image,
} from "@heroui/react";
import { GoalCard } from "./goal-card";

export default async function Goals() {
	const supabase = await createClient();
	const { data: goals } = await supabase.from("goals").select();
	if (goals == null || goals.length == 0) {
		return <div>No goals to show</div>;
	}
	return (
		<div>
			{goals.map((goal) => (
				<GoalCard
					title={goal.title}
					description={goal.description ?? ""}
					rank={goal.rank}
				/>
			))}
		</div>
	);
}
