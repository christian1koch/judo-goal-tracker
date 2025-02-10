import { signOutAction } from "@/app/actions";

export default async function SignOutPage() {
	await signOutAction();

	return (
		<div>
			<p>Logging you out...</p>
		</div>
	);
}
