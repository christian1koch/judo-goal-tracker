import { cn } from "@/lib/utils";

export function GoalsContainer({
	className,
	children,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div
			className={cn("flex flex-row flex-wrap justify-around", className)}
			{...props}
		>
			{children}
		</div>
	);
}
