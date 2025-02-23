"use client";
import { INote } from "@/types";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useNotesContext } from "./notes-context";

interface NotesSidebarProps {
	notes: INote[];
}
export function DesktopNotesSidebar({ notes }: NotesSidebarProps) {
	const id = useParamsId();
	const { currentNoteTitle } = useNotesContext();
	return (
		<div className="h-[calc(100vh-5rem)] hidden md:block md:fixed right-0 top-16">
			<div className="w-60 bg-default-50 h-full border flex flex-col flex-shrink-0 overflow-y-auto rounded-b-lg">
				{notes.map((note) => (
					<SidebarItem
						key={note.id}
						title={
							id === note.id
								? currentNoteTitle
								: (note.title ?? "untitled")
						}
						href={"/protected/notes/" + note.id}
						isSelected={id === note.id}
					/>
				))}
			</div>
		</div>
	);
}

export function MobileNotesSidebar({ notes = [] }: NotesSidebarProps) {
	const id = useParamsId();
	console.log("useparams id", id);
	const { currentNoteTitle } = useNotesContext();
	return (
		<div className="md:hidden relative w-full mt-2">
			<div className="w-full bg-default-50 h-full border flex flex-col flex-shrink-0 overflow-y-auto rounded-b-lg">
				{notes.map((note) => (
					<SidebarItem
						key={note.id}
						title={
							id === note.id
								? currentNoteTitle
								: (note.title ?? "untitled")
						}
						href={"/protected/notes/" + note.id}
						isSelected={id === note.id}
					/>
				))}
			</div>
		</div>
	);
}

interface SidebarItem {
	isSelected?: boolean;
	title?: string;
	href: string;
}
export function SidebarItem({ isSelected, href, title }: SidebarItem) {
	return (
		<Button
			size="sm"
			as={Link}
			variant={isSelected ? "shadow" : "light"}
			radius="none"
			className="flex-shrink-0"
			href={href}
		>
			{title}
		</Button>
	);
}

export const useParamsId = () => {
	const { id } = useParams();
	if (id == null) {
		return undefined;
	}
	const _id = Number(id);
	return _id;
};
