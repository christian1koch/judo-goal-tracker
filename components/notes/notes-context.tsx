"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface CurrentNoteContextType {
	currentNoteTitle: string;
	onCurrentNoteTitleUpdate: (newTitle: string) => void;
}
const CurrentNoteContext = createContext<CurrentNoteContextType | null>(null);

export const useCurrentNoteContext = () => {
	const currentUserContext = useContext(CurrentNoteContext);

	if (!currentUserContext) {
		throw new Error(
			"useCurrentNote has to be used within <CurrentUserContext.Provider>"
		);
	}

	return currentUserContext;
};

export function CurrentNoteContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [currentNoteTitle, setCurrentNoteTitle] = useState<string>("");
	return (
		<CurrentNoteContext.Provider
			value={{
				currentNoteTitle: currentNoteTitle,
				onCurrentNoteTitleUpdate: setCurrentNoteTitle,
			}}
		>
			{children}
		</CurrentNoteContext.Provider>
	);
}
