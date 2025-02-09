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
	return redirect("/protected");
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

/**
 * Questions
 */

export const getGoals = async () => {
	const supabase = await createClient();
	const { data: goals } = await supabase.from("goals").select();
	return goals;
};

export const getQuestions = async () => {
	const supabase = await createClient();
	const { data: questions } = await supabase.from("diary_questions").select();
	return questions;
};
export const getAnswersByNoteId = async (noteId: number) => {
	const supabase = await createClient();
	const { data: answers } = await supabase
		.from("diary_answers")
		.select()
		.eq("note_id", noteId);
	return answers;
};

export const getNoteById = async (noteId: number) => {
	const supabase = await createClient();
	const userId = await getUserFromSession(supabase);

	const { data: note, error } = await supabase
		.from("diary_notes")
		.select()
		.eq("id", noteId)
		.eq("user_id", userId)
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return note;
};

export const getALlNotes = async () => {
	const supabase = await createClient();

	const { data: note, error } = await supabase.from("diary_notes").select();
	if (error) {
		throw new Error(error.message);
	}

	return note;
};

export const createNote = async (title: string, generalNotes: string) => {
	const supabase = await createClient();
	const userId = await getUserFromSession(supabase);

	// Crear la nota en diary_notes
	const { data: noteData, error: noteError } = await supabase
		.from("diary_notes")
		.insert({
			user_id: userId,
			title,
			general_notes: generalNotes,
			date: new Date().toISOString(),
		})
		.select()
		.single();

	if (noteError) {
		throw new Error(noteError.message);
	}

	const noteId = noteData.id;

	// Obtener todas las preguntas y metas del usuario
	const { data: questions, error: questionError } = await supabase
		.from("diary_questions")
		.select();

	const { data: goals, error: goalError } = await supabase
		.from("goals")
		.select()
		.eq("user_id", userId);

	if (questionError || goalError) {
		throw new Error(questionError?.message || goalError?.message);
	}

	// Crear respuestas asociadas a la nota
	const answers = [
		...questions.map((q) => ({
			user_id: userId,
			note_id: noteId,
			question_id: q.id,
			text: "",
		})),
		...goals.map((g) => ({
			user_id: userId,
			note_id: noteId,
			goal_id: g.id,
			text: "",
		})),
	];

	if (answers.length > 0) {
		const { error: answerError } = await supabase
			.from("diary_answers")
			.insert(answers);
		if (answerError) {
			throw new Error(answerError.message);
		}
	}

	revalidatePath("/protected");
	return noteData;
};
