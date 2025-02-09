import { Database } from "./database.types";

export type IGoal = Database["public"]["Tables"]["goals"]["Row"];

export type IDiaryQuestion =
	Database["public"]["Tables"]["diary_questions"]["Row"];

export type IDiaryAnswer = Database["public"]["Tables"]["diary_answers"]["Row"];
