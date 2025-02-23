import { Database } from "./database.types";

export type IGoal = Database["public"]["Tables"]["goals"]["Row"];

export type IDiaryQuestion =
	Database["public"]["Tables"]["diary_questions"]["Row"];

export type IDiaryAnswer = Database["public"]["Tables"]["diary_answers"]["Row"];

export type IDiaryEntry = Database["public"]["Tables"]["diary_entry"]["Row"];

export type INote = Database["public"]["Tables"]["notes"]["Row"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PartialWithId<T> = Partial<T> & { id: any };

export interface IDiaryEntryWithInfo extends IDiaryEntry {
	questions: IDiaryQuestionAnswer[];
	goals: IDiaryGoalAnswer[];
}

export interface IDiaryGoalAnswer {
	answer: string | null;
	answerId: number;
	goal: IGoal | null;
}
export interface IDiaryQuestionAnswer {
	answer: string | null;
	answerId: number;
	question: IDiaryQuestion | null;
}
