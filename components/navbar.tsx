"use client";

import { usePathname } from "next/navigation";
import { CreateNewNoteButton } from "./notes/create-new-note-button";
import { NotesTimelineButtonGroup } from "./notes/notes-timeline/notes-timelane-button-group";
import AddNewGoalModal from "./judo-goals/add-new-goal-modal";
import { Button } from "@heroui/react";
// Routes // This probably should be an enum
const notesRoute = "notes";
const goalsRoute = "goals";
const editNoteRoute = "notes/edit";

const notesTitle = "Notes";
const goalsTitle = "Goals";
const editNoteTitle = "Edit Goal";

export function Navbar() {
	const pathname = usePathname();
	const getCurrentRoute = () => {
		if (pathname.includes(editNoteRoute)) {
			return editNoteRoute;
		}
		if (pathname.includes(notesRoute)) {
			return notesRoute;
		}
		if (pathname.includes(goalsRoute)) {
			return goalsRoute;
		}
		return "";
	};
	const currentRoute = getCurrentRoute();
	const getTitle = () => {
		if (currentRoute === editNoteRoute) {
			return editNoteTitle;
		}
		if (currentRoute === notesRoute) {
			return notesTitle;
		}
		if (currentRoute === goalsRoute) {
			return goalsTitle;
		}
		return null;
	};
	const getNavbarItems = () => {
		if (currentRoute === editNoteRoute) {
			return (
				<div className="flex gap-2">
					<Button color="danger">TODO: DELETE NOTE</Button>
				</div>
			);
		}
		if (currentRoute === notesRoute) {
			return (
				<div className="flex gap-2">
					<NotesTimelineButtonGroup />
					<CreateNewNoteButton />
				</div>
			);
		}
		if (currentRoute === goalsRoute) {
			return <AddNewGoalModal />;
		}
		return null;
	};
	return (
		<nav className="w-full flex h-16 fixed top-0 z-20 bg-background border-b items-center flex-row justify-between px-10">
			<h1 className="text-3xl font-extrabold">{getTitle()}</h1>
			{getNavbarItems()}
		</nav>
	);
}
