"use client";
import { deleteDiaryEntry } from "@/app/actions";
import { Button } from "@heroui/react";
import { IconSquareRoundedXFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteDiaryEntryButton({ id }: { id: number }) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const handleOnClick = async () => {
		try {
			setIsLoading(true);
			await deleteDiaryEntry(id);
			router.push(`/protected/diary-entries`);
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Button
			startContent={<IconSquareRoundedXFilled />}
			variant="light"
			color="danger"
			isLoading={isLoading}
			isDisabled={isLoading}
			onPress={handleOnClick}
		>
			Delete
		</Button>
	);
}
