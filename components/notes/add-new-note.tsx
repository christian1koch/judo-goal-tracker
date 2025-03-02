"use client";
import { createNewNote } from "@/app/actions";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/responsiveIconButton";

export function AddNewNotesButton({
	className,
	shouldShowResponsiveIcon,
}: {
	className?: string;
	shouldShowResponsiveIcon?: boolean;
}) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const handleOnClick = async () => {
		try {
			setIsLoading(true);
			const newNote = await createNewNote();
			router.push(`/protected/notes/${newNote.id}`);
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Button
			startContent={<IconCirclePlusFilled size={16} />}
			className={className}
			isLoading={isLoading}
			isDisabled={isLoading}
			onPress={handleOnClick}
			variant="ghost"
			shouldResponsiveShowIconOnly={shouldShowResponsiveIcon}
			size="sm"
		>
			New note
		</Button>
	);
}
