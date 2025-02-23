import { Modal, ModalContent, useDisclosure } from "@heroui/react";
import { Command } from "cmdk";
import React from "react";
import "../ui/cmdk.scss";
import { IconSearch } from "@tabler/icons-react";
import { useNotesContext } from "./notes-context";
import { useRouter } from "next/navigation";
import { Button } from "../ui/responsiveIconButton";

export function NotesSearchbar() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { notes } = useNotesContext();
	const router = useRouter();
	const handleOnSelect = (id: number) => {
		router.push(`/protected/notes/${id}`);
		onOpenChange();
	};
	return (
		<>
			<Button
				startContent={<IconSearch size={18} />}
				variant="bordered"
				onPress={onOpen}
				shouldResponsiveShowIconOnly
			>
				Search Note
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
				<ModalContent className="cmdk-styles">
					<Command label="Command Menu">
						<Command.Input placeholder="Search for a note..." />
						<Command.List>
							<Command.Empty>No results found.</Command.Empty>

							<Command.Group>
								{notes.map((note) => (
									<Command.Item
										key={note.id}
										onSelect={() => handleOnSelect(note.id)}
									>
										{note.title}
									</Command.Item>
								))}
							</Command.Group>
						</Command.List>
					</Command>
				</ModalContent>
			</Modal>
		</>
	);
}
