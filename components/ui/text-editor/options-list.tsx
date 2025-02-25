import { ButtonGroup } from "@heroui/react";
import { Editor } from "@tiptap/react";
import { OptionsButton } from "./options-button";
import { cn } from "@/lib/utils";
import {
	IconBold,
	IconItalic,
	IconStrikethrough,
	IconUnderline,
	IconCode,
	IconList,
	IconListNumbers,
	IconQuote,
	IconSeparator,
} from "@tabler/icons-react";
import { ImageUploadButton } from "./image-upload-button";

export function OptionsList({
	editor,
	className,
}: {
	editor: Editor;
	className?: string;
}) {
	return (
		<ButtonGroup
			className={cn(
				"flex flex-wrap gap-0 border-b p-4 bg-background rounded-md z-10 w-full",
				className
			)}
		>
			<OptionsButton
				id="bold"
				onPress={() => editor.chain().focus().toggleBold().run()}
				isDisabled={!editor.can().chain().focus().toggleBold().run()}
				className={editor.isActive("bold") ? "text-primary-500" : ""}
				isIconOnly
			>
				<IconBold />
			</OptionsButton>
			<OptionsButton
				id="italic"
				onPress={() => editor.chain().focus().toggleItalic().run()}
				isDisabled={!editor.can().chain().focus().toggleItalic().run()}
				className={editor.isActive("italic") ? "text-primary-500" : ""}
				isIconOnly
			>
				<IconItalic />
			</OptionsButton>
			<OptionsButton
				id="strikethrough"
				onPress={() => editor.chain().focus().toggleStrike().run()}
				isDisabled={!editor.can().chain().focus().toggleStrike().run()}
				className={editor.isActive("strike") ? "text-primary-500" : ""}
				isIconOnly
			>
				<IconStrikethrough />
			</OptionsButton>
			<OptionsButton
				id="underline"
				onPress={() => editor.chain().focus().toggleUnderline().run()}
				isDisabled={!editor.can().chain().focus().toggleStrike().run()}
				className={
					editor.isActive("underline") ? "text-primary-500" : ""
				}
				isIconOnly
			>
				<IconUnderline />
			</OptionsButton>
			<OptionsButton
				id="code"
				onPress={() => editor.chain().focus().toggleCode().run()}
				isDisabled={!editor.can().chain().focus().toggleCode().run()}
				className={editor.isActive("code") ? "text-primary-500" : ""}
				isIconOnly
			>
				<IconCode />
			</OptionsButton>
			<OptionsButton
				id="list"
				isIconOnly
				onPress={() => editor.chain().focus().toggleBulletList().run()}
				className={
					editor.isActive("bulletList") ? "text-primary-500" : ""
				}
			>
				<IconList />
			</OptionsButton>
			<OptionsButton
				id="numbers"
				isIconOnly
				onPress={() => editor.chain().focus().toggleOrderedList().run()}
				className={
					editor.isActive("orderedList") ? "text-primary-500" : ""
				}
			>
				<IconListNumbers />
			</OptionsButton>
			<OptionsButton
				id="quote"
				isIconOnly
				onPress={() => editor.chain().focus().toggleBlockquote().run()}
				className={
					editor.isActive("blockquote") ? "text-primary-500" : ""
				}
			>
				<IconQuote />
			</OptionsButton>

			<OptionsButton
				id="separator"
				isIconOnly
				onPress={() => editor.chain().focus().setHorizontalRule().run()}
			>
				<IconSeparator />
			</OptionsButton>
			<ImageUploadButton editor={editor} />
			<OptionsButton
				id="normal-text"
				onPress={() => editor.chain().focus().setParagraph().run()}
				className={
					editor.isActive("paragraph") ? "text-primary-500" : ""
				}
			>
				Normal Text
			</OptionsButton>
			<OptionsButton
				id="big-title"
				onPress={() =>
					editor.chain().focus().toggleHeading({ level: 1 }).run()
				}
				className={
					editor.isActive("heading", { level: 1 })
						? "text-primary-500"
						: ""
				}
			>
				Big Title
			</OptionsButton>
			<OptionsButton
				id="medium-title"
				onPress={() =>
					editor.chain().focus().toggleHeading({ level: 2 }).run()
				}
				className={
					editor.isActive("heading", { level: 2 })
						? "text-primary-500"
						: ""
				}
			>
				Medium Title
			</OptionsButton>
			<OptionsButton
				id="small-title"
				onPress={() =>
					editor.chain().focus().toggleHeading({ level: 3 }).run()
				}
				className={
					editor.isActive("heading", { level: 3 })
						? "text-primary-500"
						: ""
				}
			>
				Small Title
			</OptionsButton>
		</ButtonGroup>
	);
}
