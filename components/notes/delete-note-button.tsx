"use client";
import { deleteNote } from "@/app/actions";
import { IconSquareRoundedXFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/responsiveIconButton";

export function DeleteNoteButton({ id }: { id: number }) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const handleOnClick = async () => {
		try {
			setIsLoading(true);
			await deleteNote(id);
			router.push(`/protected/notes`);
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Button
			startContent={<IconSquareRoundedXFilled />}
			variant="bordered"
			color="danger"
			isLoading={isLoading}
			isDisabled={isLoading}
			onPress={handleOnClick}
			shouldResponsiveShowIconOnly
		>
			Delete
		</Button>
	);
}
