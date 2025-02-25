import { ComponentProps } from "react";
import { Button } from "../responsiveIconButton";

type OptionsButtonProps = ComponentProps<typeof Button>;
export const OptionsButton = ({ children, ...props }: OptionsButtonProps) => {
	return (
		<Button
			size="sm"
			variant="ghost"
			contentEditable={false}
			onMouseDown={(e) => e.preventDefault()}
			{...props}
		>
			{children}
		</Button>
	);
};
