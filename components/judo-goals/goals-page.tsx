import { createClient } from "@/utils/supabase/server";
import AddNewGoalModal from "./add-new-goal-modal";
import Goals from "./goals";

export async function GoalsPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user?.id) {
		return null;
	}

	return (
		<>
			<AddNewGoalModal />
			<Goals />
		</>
	);
}
