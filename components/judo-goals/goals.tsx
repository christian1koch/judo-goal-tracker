import { createClient } from "@/utils/supabase/server";

export default async function Goals() {
	const supabase = await createClient();
	const { data: goals } = await supabase.from("goals").select();

	return <pre>{JSON.stringify(goals, null, 2)}</pre>;
}
