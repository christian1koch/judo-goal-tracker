"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface NotesContextType {
	currentNoteTitle: string;
	onCurrentNoteTitleUpdate: (newTitle: string) => void;
}
const NotesContext = createContext<NotesContextType | null>(null);

export const useCurrentNoteContext = () => {
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
	return (
		<NotesContext.Provider
			value={{
				currentNoteTitle: currentNoteTitle,
				onCurrentNoteTitleUpdate: setCurrentNoteTitle,
			}}
		>
			{children}
		</NotesContext.Provider>
	);
}
