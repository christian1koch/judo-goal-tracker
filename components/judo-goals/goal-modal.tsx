import {
	Button,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Textarea,
	ModalFooter,
	Input,
} from "@heroui/react";
import { useState } from "react";

export type OpeningModalProps = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
};

interface GoalModalProps extends OpeningModalProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmit: (name: string, description: string) => Promise<any>;
	title: string;
	isDeleteButtonShown?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onDelete?: () => Promise<any>;
	initialName?: string;
	initialDescription?: string;
}

export function GoalModal({
	title,
	onSubmit,
	isOpen,
	onOpenChange,
	initialDescription,
	initialName,
	isDeleteButtonShown,
	onDelete,
}: GoalModalProps) {
	const [name, setName] = useState(initialName ?? "");
	const [description, setDescription] = useState(initialDescription ?? "");
	const [isLoading, setIsLoading] = useState(false);
	const isButtonDisabled =
		name.trim().length === 0 ||
		description.trim().length === 0 ||
		isLoading;

	const onCreate = async (onClose: () => void) => {
		console.log("title", name, "description", description);
		try {
			setIsLoading(true);
			await onSubmit(name, description);
			onClose();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	const handleOnDelete = async (onClose: () => void) => {
		try {
			setIsLoading(true);
			await onDelete?.();
			onClose();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal
			isDismissable={false}
			isKeyboardDismissDisabled={true}
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			size="4xl"
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							{title}
						</ModalHeader>
						<ModalBody>
							<Input
								size="lg"
								className="text-4xl"
								placeholder="New Goal Title"
								variant="underlined"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<Textarea
								placeholder="Add a short description"
								variant="underlined"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</ModalBody>
						<ModalFooter className="justify-between">
							{isDeleteButtonShown ? (
								<Button
									color="danger"
									variant="flat"
									onPress={() => handleOnDelete(onClose)}
									disabled={isButtonDisabled}
									isDisabled={isButtonDisabled}
								>
									Delete Goal
								</Button>
							) : (
								<div />
							)}
							<div className="flex flex-row gap-2">
								<Button color="secondary" onPress={onClose}>
									Close
								</Button>
								<Button
									color="success"
									onPress={() => onCreate(onClose)}
									disabled={isButtonDisabled}
									isDisabled={isButtonDisabled}
								>
									Create
								</Button>
							</div>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
