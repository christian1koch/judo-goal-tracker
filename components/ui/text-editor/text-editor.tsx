import { Button, ButtonGroup } from "@heroui/react";
import "./tiptap.scss";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";

import TextStyle, { TextStyleOptions } from "@tiptap/extension-text-style";
import {
	BubbleMenu,
	Editor,
	EditorContent,
	EditorEvents,
	FloatingMenu,
	useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, {
	ChangeEvent,
	ComponentProps,
	useCallback,
	useContext,
	useEffect,
	useRef,
} from "react";
import {
	IconArrowLeft,
	IconArrowRight,
	IconBold,
	IconCloudUp,
	IconCode,
	IconItalic,
	IconList,
	IconListNumbers,
	IconQuote,
	IconSeparator,
	IconStrikethrough,
	IconUnderline,
} from "@tabler/icons-react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { cn } from "@/lib/utils";
import Link from "@tiptap/extension-link";
import { uploadImageToSupabase } from "@/app/actions";

interface TextEditorProps {
	content?: string;
	onUpdate?: (props: EditorEvents["update"]) => void;
}
export default function TextEditor({ content, onUpdate }: TextEditorProps) {
	const editor = useEditor({
		extensions,
		content: content || placeholderContent,
		onUpdate,
	});
	if (!editor) {
		return null;
	}

	return (
		<div className="flex flex-col gap-4 bg-default-50 border rounded-md flex-1 w-full">
			<div className="flex sticky top-16 z-10 w-full">
				<div className="md:flex w-full hidden">
					<OptionsList editor={editor} />
				</div>
			</div>
			<EditorContent className="p-4 h-full w-full" editor={editor} />
			<BubbleMenu editor={editor} className="md:hidden">
				<ScrollableOptionsList editor={editor} />
			</BubbleMenu>
			<FloatingMenu editor={editor} className="md:hidden">
				<ScrollableOptionsList editor={editor} />
			</FloatingMenu>
		</div>
	);
}

function ScrollableOptionsList({ editor }: { editor: Editor }) {
	return (
		<ScrollMenu
			wrapperClassName="bg-background rounded-xl"
			LeftArrow={LeftArrow}
			RightArrow={RightArrow}
			onScroll={() => editor.chain().focus()}
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
		</ScrollMenu>
	);
}

const LeftArrow = () => {
	const visibility = useContext(VisibilityContext);
	const isFirstItemVisible = visibility.useIsVisible("first", true);
	return (
		<Button
			isDisabled={isFirstItemVisible}
			onPress={() => visibility.scrollPrev()}
			className="left"
			size="sm"
			isIconOnly
		>
			<IconArrowLeft />
		</Button>
	);
};

const RightArrow = () => {
	const visibility = useContext(VisibilityContext);
	const isLastItemVisible = visibility.useIsVisible("last", false);
	return (
		<Button
			isDisabled={isLastItemVisible}
			onPress={() => visibility.scrollNext()}
			className="right"
			size="sm"
			isIconOnly
		>
			<IconArrowRight />
		</Button>
	);
};

function OptionsList({
	editor,
	className,
}: {
	editor: Editor;
	className?: string;
}) {
	return (
		<ButtonGroup
			className={cn(
				"flex flex-wrap gap-1 border-b p-4 bg-black rounded-md z-10 w-full",
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

const extensions = [
	Color.configure({ types: [TextStyle.name, ListItem.name] }),
	TextStyle.configure({
		types: [ListItem.name],
	} as Partial<TextStyleOptions>),
	StarterKit.configure({
		bulletList: {
			keepMarks: true,
			keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
		},
		orderedList: {
			keepMarks: true,
			keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
		},
	}),
	Underline,
	Link.configure({
		autolink: true,
	}),
	Image.configure({
		inline: true,
	}),
	ImageResize,
];

const placeholderContent = `
<h2>
  Hajime!
</h2>
<p>
  This is a <em>fundamental</em> example of <strong>JudoApp Notes</strong>. Just like in Judo, where technique and discipline matter, this app provides you with structured and flexible note-taking. Let’s explore some moves:
</p>
<ul>
  <li>
    Here’s your first grip on organizing thoughts …
  </li>
  <li>
    … and a second one to secure your ideas.
  </li>
</ul>
<p>
  Feeling the flow? Now, let’s execute a strong technique—how about a code block:
</p>
<pre><code class="language-js">console.log("JudoApp Notes - Master your thoughts!");</code></pre>
<p>
  Just like in Judo, practice makes perfect. Keep refining your notes and stay sharp.
</p>
<blockquote>
  "A black belt is just a white belt who never gave up." 🥋
  <br />
  — Fumi sensei
</blockquote>
`;

type OptionsButtonProps = ComponentProps<typeof Button>;

const OptionsButton = ({ children, ...props }: OptionsButtonProps) => {
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

function ImageUploadButton({ editor }: { editor: Editor }) {
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Upload image to Supabase

	// Handle file input change
	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const file = event.target.files[0];
			if (file && editor) {
				const imageUrl = await uploadImageToSupabase(file);
				console.log(imageUrl);
				if (imageUrl) {
					editor
						.chain()
						.focus()
						.setImage({ src: imageUrl })
						.createParagraphNear()
						.run();
				}
			}
		}
	};

	// Trigger file input click
	const handleUploadButtonClick = () => {
		fileInputRef.current?.click();
	};

	// Handle paste event for images
	const handlePaste = useCallback(
		async (event: ClipboardEvent) => {
			if (event.clipboardData) {
				const items = event.clipboardData.items;
				console.log(items);
				const item = items[0];
				if (item.type.indexOf("image") !== -1) {
					const file = item.getAsFile();
					if (file) {
						editor
							.chain()
							.focus()
							.insertContent("<p>--Uploading Image--</p>")
							.run();
						const imageUrl = await uploadImageToSupabase(file);
						if (imageUrl && editor) {
							editor
								.chain()
								.focus()
								.deleteRange({
									from:
										editor.state.doc.content.size -
										"--Uploading Image--".length -
										2,
									to: editor.state.doc.content.size,
								})
								.setImage({ src: imageUrl })
								.createParagraphNear()
								.run();
						}
					}
				}
			}
		},
		[editor]
	);

	useEffect(() => {
		if (editor) {
			const editorElement = editor.view.dom;
			editorElement.addEventListener("paste", handlePaste);
			editor.on("paste", ({ editor, event }) => {
				if (event.clipboardData) {
					const items = event.clipboardData.items;
					const imageItem = Array.from(items).find(
						(item) => item.type.indexOf("image") !== -1
					);

					if (imageItem) {
						// Only trigger this if it's an image being pasted
						setTimeout(() => {
							editor.chain().focus().createParagraphNear().run(); // ✅ Forces newline after pasted image
						}, 0); // Ensures the default paste happens before adding the newline
					}
				}
			});
			return () =>
				editorElement.removeEventListener("paste", handlePaste);
		}
	}, [editor, handlePaste]);

	return (
		<>
			<OptionsButton
				id="file upload"
				isIconOnly
				onPress={handleUploadButtonClick}
			>
				<IconCloudUp />
			</OptionsButton>
			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				className="hidden"
			/>
		</>
	);
}
