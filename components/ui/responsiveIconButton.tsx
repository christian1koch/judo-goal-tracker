import { cn } from "@/lib/utils";
import { Button as HeroUiButton } from "@heroui/react";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof HeroUiButton> & {
	shouldResponsiveShowIconOnly?: boolean;
};

export function Button({
	shouldResponsiveShowIconOnly,
	children,
	className,
	...rest
}: ButtonProps) {
	if (shouldResponsiveShowIconOnly) {
		return (
			<>
				<HeroUiButton
					className={cn("md:flex hidden", className)}
					{...rest}
				>
					{children}
				</HeroUiButton>
				<HeroUiButton
					className={cn("flex md:hidden", className)}
					isIconOnly
					{...rest}
				></HeroUiButton>
			</>
		);
	}
	return (
		<HeroUiButton className={className} {...rest}>
			{children}
		</HeroUiButton>
	);
}
