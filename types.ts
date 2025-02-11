import { Database } from "./database.types";

export type IGoal = Database["public"]["Tables"]["goals"]["Row"];

export type IDiaryQuestion =
	Database["public"]["Tables"]["diary_questions"]["Row"];

export type IDiaryAnswer = Database["public"]["Tables"]["diary_answers"]["Row"];

export type IDiaryNote = Database["public"]["Tables"]["diary_notes"]["Row"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PartialWithId<T> = Partial<T> & { id: any };
