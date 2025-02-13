import { BentoGrid } from "@/components/bento-grid";
import { cn } from "@/lib/utils";

export const NotesBentoGrid = ({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) => {
	return (
		<BentoGrid className={cn("p-10 w-full flex-1", className)}>
			{children}
		</BentoGrid>
	);
};
