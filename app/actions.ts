"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { IDiaryAnswer, IDiaryEntry, IDiaryEntryWithInfo } from "@/types";
import { getURL } from "@/lib/utils";
import { cache } from "react";

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
export const getAnswersByDiaryEntryId = async (diaryEntryId: number) => {
	const supabase = await createClient();
	const { data: answers } = await supabase
		.from("diary_answers")
		.select()
		.eq("note_id", diaryEntryId);
	return answers;
};

export const getDiaryEntryById = async (diaryEntryId: number) => {
	const supabase = await createClient();
	const userId = await getUserFromSession(supabase);

	const { data: diaryEntry, error } = await supabase
		.from("diary_entry")
		.select()
		.eq("id", diaryEntryId)
		.eq("user_id", userId)
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return diaryEntry;
};

export const getAllDiaryEntries = async () => {
	const supabase = await createClient();

	const { data: note, error } = await supabase.from("diary_entry").select();
	if (error) {
		throw new Error(error.message);
	}

	return note;
};

export const createDiaryEntry = async (title: string, generalNotes: string) => {
	const supabase = await createClient();
	const userId = await getUserFromSession(supabase);

	// Crear la nota en diary_entry
	const { data: diaryEntryData, error: error } = await supabase
		.from("diary_entry")
		.insert({
			user_id: userId,
			title,
			general_notes: generalNotes,
			date: new Date().toISOString(),
		})
		.select()
		.single();

	if (error) {
		throw new Error(error.message);
	}

	const noteId = diaryEntryData.id;

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
	return diaryEntryData;
};

export const updateDiaryEntry = async (
	diaryEntry: Partial<IDiaryEntry> & { id: number }
) => {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("diary_entry")
		.update({ ...diaryEntry })
		.eq("id", diaryEntry.id)
		.select()
		.single();
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const updateAnswer = async (
	answer: Partial<IDiaryAnswer> & { id: number }
) => {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("diary_answers")
		.update({ ...answer })
		.eq("id", answer.id)
		.select()
		.single();
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const getDiaryEntryWithRelations = async () => {
	const supabase = await createClient();
	const userId = await getUserFromSession(supabase);

	// Get notes with their answers, and each answer's associated question and goal
	const { data: diaryEntries, error } = await supabase
		.from("diary_entry")
		.select(
			`
		*,
		diary_answers!diary_answers_note_id_fkey (
		  *,
		  diary_questions!diary_answers_question_id_fkey (*),
		  goals!diary_answers_goal_id_fkey (*)
		)
	  `
		)
		.eq("user_id", userId)
		.order("date", { ascending: true });

	if (error) {
		throw new Error(error.message);
	}

	// Transform the data to a more usable structure
	const transformedDiaryEntries = diaryEntries?.map((diaryEntry) => {
		const answers = diaryEntry.diary_answers || [];

		// Separate question answers and goal answers
		const questionAnswers = answers.filter(
			(a) => a.question_id && a.diary_questions
		);
		const goalAnswers = answers.filter((a) => a.goal_id && a.goals);

		return {
			...diaryEntry,
			questions:
				questionAnswers.map((qa) => ({
					answer: qa.text || "",
					answerId: qa.id,
					question: qa.diary_questions,
				})) ?? [],
			goals:
				goalAnswers.map((ga) => ({
					answer: ga.text || "",
					answerId: ga.id,
					goal: ga.goals,
				})) ?? [],
		};
	});
	const typedDiaryEntries: IDiaryEntryWithInfo[] = transformedDiaryEntries;
	return typedDiaryEntries;
};

export const getAllNotes = cache(async () => {
	const supabase = await createClient();
	const { data: note, error } = await supabase.from("notes").select();
	if (error) {
		throw new Error(error.message);
	}

	return note;
});

export const getNoteById = async (id: number) => {
	const supabase = await createClient();

	const { data: note, error } = await supabase
		.from("notes")
		.select()
		.eq("id", id);
	if (error) {
		throw new Error(error.message);
	}

	return note;
};

export const updateNoteTitle = async (id: number, title: string) => {
	const supabase = await createClient();

	const { data: note, error } = await supabase
		.from("notes")
		.update({ title })
		.eq("id", id);
	if (error) {
		throw new Error(error.message);
	}
	revalidatePath("/protected");
	return note;
};
export const updateNoteContent = async (id: number, content: string) => {
	const supabase = await createClient();

	const { data: note, error } = await supabase
		.from("notes")
		.update({ text: content })
		.eq("id", id);
	if (error) {
		throw new Error(error.message);
	}

	return note;
};

export const createNewNote = async () => {
	const supabase = await createClient();
	const userId = await getUserFromSession(supabase);
	const { data, error } = await supabase
		.from("notes")
		.insert({ user_id: userId, title: "New Note" })
		.select();
	if (error) {
		throw new Error(error.message);
	}
	revalidatePath("/protected");
	return data[0];
};

export const deleteNote = async (id: number) => {
	const supabase = await createClient();

	const { error } = await supabase.from("notes").delete().eq("id", id);
	if (error) {
		throw new Error(error.message);
	}
	revalidatePath("/protected");
};

export const deleteDiaryEntry = async (id: number) => {
	const supabase = await createClient();

	const { error } = await supabase.from("diary_entry").delete().eq("id", id);
	if (error) {
		throw new Error(error.message);
	}
	revalidatePath("/protected");
};

export const uploadImageToSupabase = async (file: File) => {
	const supabase = await createClient();
	const filePath = `public/${Date.now()}_${file.name}`;
	const { error } = await supabase.storage
		.from("notes_images")
		.upload(filePath, file);

	if (error) {
		console.error("Upload failed:", error);
		return null;
	}

	const { data: publicUrlData } = supabase.storage
		.from("notes_images")
		.getPublicUrl(filePath);
	return publicUrlData.publicUrl;
};
