import Link from "next/link";

export default async function ProtectedPage() {
	return (
		<div className="w-full flex flex-col gap-2 p-10">
			<Link href="/protected/goals">Goals</Link>
			<Link href="/protected/diary-entries">Notes</Link>
		</div>
	);
}
