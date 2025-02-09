"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const getURL = () => {
	let url =
		process?.env?.VERCEL_PROJECT_PRODUCTION_URL ?? // Automatically set by Vercel.
		process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
		"http://localhost:3000/";
	// Make sure to include `https://` when not localhost.
	url = url.startsWith("http") ? url : `https://${url}`;
	// Make sure to include a trailing `/`.
	url = url.endsWith("/") ? url : `${url}/`;
	return url;
};
export const signUpAction = async (formData: FormData) => {
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();
	const supabase = await createClient();

	if (!email || !password) {
		return encodedRedirect(
			"error",
			"/sign-up",
			"Email and password are required"
		);
	}

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${getURL()}`,
		},
	});

	console.log("get URL", getURL());

	if (error) {
		console.error(error.code + " " + error.message);
		return encodedRedirect("error", "/sign-up", error.message);
	} else {
		return encodedRedirect(
			"success",
			"/sign-up",
			"Thanks for signing up! Please check your email for a verification link."
		);
	}
};

export const signInAction = async (formData: FormData) => {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return encodedRedirect("error", "/sign-in", error.message);
	}
	/**
	 * Might need to be redirected to /dashboard
	 * when we have a dashboard...
	 * and by we I mean I
	 */
	return redirect("/goals");
};

export const forgotPasswordAction = async (formData: FormData) => {
	const email = formData.get("email")?.toString();
	const supabase = await createClient();
	const origin = (await headers()).get("origin");
	const callbackUrl = formData.get("callbackUrl")?.toString();

	if (!email) {
		return encodedRedirect(
			"error",
			"/forgot-password",
			"Email is required"
		);
	}

	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${origin}/auth/confirm?redirect_to=/protected/reset-password`,
	});

	if (error) {
		console.error(error.message);
		return encodedRedirect(
			"error",
			"/forgot-password",
			"Could not reset password"
		);
	}

	if (callbackUrl) {
		return redirect(callbackUrl);
	}

	return encodedRedirect(
		"success",
		"/forgot-password",
		"Check your email for a link to reset your password."
	);
};

export const resetPasswordAction = async (formData: FormData) => {
	const supabase = await createClient();

	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;

	if (!password || !confirmPassword) {
		encodedRedirect(
			"error",
			"/protected/reset-password",
			"Password and confirm password are required"
		);
	}

	if (password !== confirmPassword) {
		encodedRedirect(
			"error",
			"/protected/reset-password",
			"Passwords do not match"
		);
	}

	const { error } = await supabase.auth.updateUser({
		password: password,
	});

	if (error) {
		encodedRedirect(
			"error",
			"/protected/reset-password",
			"Password update failed"
		);
	}

	encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
	const supabase = await createClient();
	await supabase.auth.signOut();
	return redirect("/sign-in");
};

const getUserFromSession = async (supabase: SupabaseClient) => {
	const session = await supabase.auth.getSession();
	if (session.error) {
		throw new Error(session.error.message);
	}
	const userId = session.data.session?.user.id;
	if (userId == null) {
		throw new Error("User not found");
	}
	return userId;
};
/**
 * Goals
 */

export const createNewGoal = async (title: string, description: string) => {
	const supabase = await createClient();
	const userId = await getUserFromSession(supabase);
	const { data, error } = await supabase
		.from("goals")
		.insert({ user_id: userId, title, description })
		.select();
	if (error) {
		throw new Error(error.message);
	}
	revalidatePath("/protected");
	return data[0];
};

export const updateGoal = async (
	id: number,
	title: string,
	description: string
) => {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("goals")
		.update({ title, description })
		.eq("id", id)
		.select();
	if (error) {
		throw new Error(error.message);
	}
	revalidatePath("/protected");
	return data[0];
};

export const deleteGoal = async (id: number) => {
	const supabase = await createClient();

	const { error } = await supabase.from("goals").delete().eq("id", id);
	if (error) {
		throw new Error(error.message);
	}
	revalidatePath("/protected");
};
