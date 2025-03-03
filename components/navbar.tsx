"use client";

import { usePathname } from "next/navigation";
import { CreateNewDiaryEntryButton } from "./diary-entries/create-new-diary-entry-button";
import { DiaryEntriesTimelineButtonGroup } from "./diary-entries/diary-entries-timeline/diary-entries-timeline-button-group";
import AddNewGoalModal from "./judo-goals/add-new-goal-modal";
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	useDisclosure,
} from "@heroui/react";
import { IconMenu2 } from "@tabler/icons-react";
import { useEffect } from "react";
import { MobileNotesSidebar, useParamsId } from "./notes/sidebars";
import { AddNewNotesButton } from "./notes/add-new-note";
import { DeleteNoteButton } from "./notes/delete-note-button";
import { DeleteDiaryEntryButton } from "./diary-entries/delete-diary-entry-button";
import { NotesSearchbar } from "./notes/notes-searchbar";
import { ThemeSwitcher } from "./theme-switcher";
import { useNotesContext } from "./notes/notes-context";

// import { NotesSidebar } from "./notes/notes-sidebar";
// Routes // This probably should be an enum
const diaryEntriesRoute = "diary-entries";
const goalsRoute = "goals";
const editNoteRoute = "diary-entries/edit";
const notesRoute = "notes";

const diaryEntriesTitle = "Diary";
const goalsTitle = "Goals";
const editDiaryEntryTitle = "Edit Diary Entry";
const notesTitle = "Notes";

export function Navbar() {
	const pathname = usePathname();
	const id = useParamsId();
	console.log("paramsId", id);
	const { notes } = useNotesContext();

	const getCurrentRoute = () => {
		if (pathname.includes(editNoteRoute)) {
			return editNoteRoute;
		}
		if (pathname.includes(diaryEntriesRoute)) {
			return diaryEntriesRoute;
		}
		if (pathname.includes(goalsRoute)) {
			return goalsRoute;
		}
		if (pathname.includes(notesRoute)) {
			return notesRoute;
		}
		return "";
	};
	const currentRoute = getCurrentRoute();
	const getTitle = () => {
		if (currentRoute === editNoteRoute) {
			return editDiaryEntryTitle;
		}
		if (currentRoute === diaryEntriesRoute) {
			return diaryEntriesTitle;
		}
		if (currentRoute === goalsRoute) {
			return goalsTitle;
		}
		if (currentRoute === notesRoute) {
			return notesTitle;
		}
		return null;
	};

	const getNavbarItems = () => {
		if (currentRoute === editNoteRoute && id != null) {
			return <DeleteDiaryEntryButton id={id} />;
		}
		if (currentRoute === diaryEntriesRoute) {
			return (
				<>
					<DiaryEntriesTimelineButtonGroup />
					<CreateNewDiaryEntryButton />
				</>
			);
		}
		if (currentRoute === goalsRoute) {
			return <AddNewGoalModal />;
		}
		if (currentRoute === notesRoute) {
			if (!notes) {
				return null;
			}
			return (
				<div className="flex flex-col w-full items-center">
					<div className="flex gap-2 w-full md:justify-start justify-end">
						<NotesSearchbar />
						{id != null && (
							<>
								<AddNewNotesButton shouldShowResponsiveIcon />
								<DeleteNoteButton id={id} />
							</>
						)}
					</div>
					<MobileNotesSidebar notes={notes} />
				</div>
			);
		}
		return null;
	};
	return (
		<>
			<MobileNavbar title={getTitle()}>
				{
					<>
						{getNavbarItems()}
						<ThemeSwitcher />
					</>
				}
			</MobileNavbar>
			<DesktopNavbar title={getTitle()}>
				{
					<>
						{getNavbarItems()}
						<ThemeSwitcher />
					</>
				}
			</DesktopNavbar>
		</>
	);
}

const DesktopNavbar = ({
	children,
	title,
}: {
	children: React.ReactNode;
	title: string | null;
}) => {
	return (
		<nav className="hidden w-full md:flex h-16 fixed top-0 z-20 bg-background border-b items-center flex-row justify-between px-10">
			<h1 className="text-lg md:text-3xl font-extrabold">{title}</h1>
			<div className="flex gap-2">{children}</div>
		</nav>
	);
};
const MobileNavbar = ({
	children,
	title,
}: {
	children: React.ReactNode;
	title: string | null;
}) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const pathname = usePathname();

	/**
	 * Needed to close the drawer when the path changes
	 */
	useEffect(() => {
		if (isOpen) {
			onOpenChange();
		}
		// passing onOpenChange or isOpen here would break it
		// we want to close the dialog only when pathname changes.
	}, [pathname]);

	return (
		<nav className="w-full flex md:hidden h-16 fixed top-0 z-20 bg-background border-b items-center flex-row justify-between pl-20 pr-2 md:px-10">
			<h1 className="text-lg md:text-3xl font-extrabold">{title}</h1>
			<Button variant="ghost" color="primary" isIconOnly onPress={onOpen}>
				{<IconMenu2 />}
			</Button>
			<Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
				<DrawerContent>
					{() => (
						<>
							<DrawerHeader className="flex flex-col gap-1">
								{title}
							</DrawerHeader>
							<DrawerBody>{children}</DrawerBody>
						</>
					)}
				</DrawerContent>
			</Drawer>
		</nav>
	);
};
