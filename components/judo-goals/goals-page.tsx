import { createClient } from "@/utils/supabase/server";
import AddNewGoalModal from "./add-new-goal-modal";
import Goals from "./goals";
import { Divider } from "@heroui/react";

export async function GoalsPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user?.id) {
		return null;
	}

	return (
		<div className="w-full h-full">
			<div className="flex justify-center py-4">
				<h1 className="text-2xl">Goals</h1>
			</div>
			<Divider />
			<div className="w-full flex justify-end p-2">
				<AddNewGoalModal />
			</div>
			<Goals />
		</div>
	);
}
