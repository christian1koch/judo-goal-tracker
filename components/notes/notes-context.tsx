"use client";
import { INote } from "@/types";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

interface NotesContextType {
	currentNoteTitle: string;
	onCurrentNoteTitleUpdate: (newTitle: string) => void;
	notes: INote[];
	setNotes: (newnotes: INote[]) => void;
}
const NotesContext = createContext<NotesContextType | null>(null);

export const useNotesContext = () => {
	const notesContext = useContext(NotesContext);

	if (!notesContext) {
		throw new Error(
			"useCurrentNote has to be used within <CurrentUserContext.Provider>"
		);
	}

	return notesContext;
};

export function NotesProvider({ children }: { children: ReactNode }) {
	const [currentNoteTitle, setCurrentNoteTitle] = useState<string>("");
	const [notes, setNotes] = useState<INote[]>([]);
	return (
		<NotesContext.Provider
			value={{
				currentNoteTitle: currentNoteTitle,
				onCurrentNoteTitleUpdate: setCurrentNoteTitle,
				notes,
				setNotes,
			}}
		>
			{children}
		</NotesContext.Provider>
	);
}

export function NotesContextSetter({ notes }: { notes: INote[] }) {
	const { setNotes } = useNotesContext();
	useEffect(() => {
		setNotes(notes);
	}, [notes, setNotes]);
	return null;
}
