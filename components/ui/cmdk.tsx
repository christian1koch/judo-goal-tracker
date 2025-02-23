"use client";
/* eslint-disable react/no-unknown-property */
import React from "react";
import { Command } from "cmdk";
import "./cmdk.scss";
import { Modal, ModalContent } from "@heroui/react";

export function CommandMenu() {
	const [open, setOpen] = React.useState(false);

	// Toggle the menu when ⌘K is pressed
	React.useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const down = (e: any) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<Modal isOpen={open} onOpenChange={setOpen}>
			<ModalContent className="cmdk-styles">
				<Command label="Command Menu">
					<Command.Input />
					<Command.List>
						<Command.Empty>No results found.</Command.Empty>

						<Command.Group heading="Letters">
							<Command.Item>a</Command.Item>
							<Command.Item>b</Command.Item>
							<Command.Separator />
							<Command.Item>c</Command.Item>
						</Command.Group>

						<Command.Item>Apple</Command.Item>
					</Command.List>
				</Command>
			</ModalContent>
		</Modal>
	);
}
