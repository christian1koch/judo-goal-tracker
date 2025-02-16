import { Button } from "@heroui/react";
import "./styles.scss";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle, { TextStyleOptions } from "@tiptap/extension-text-style";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { ComponentProps } from "react";
import {
	IconBold,
	IconCode,
	IconItalic,
	IconList,
	IconListNumbers,
	IconQuote,
	IconSeparator,
	IconStrikethrough,
} from "@tabler/icons-react";

export default function TextEditor() {
	const editor = useEditor({
		extensions,
		content,
	});
	if (!editor) {
		return null;
	}

	return (
		<div className="flex flex-col gap-4 m-4 bg-default-50 border rounded-md">
			<div className="flex flex-wrap gap-1 border-b p-4 bg-black rounded-md sticky top-14 z-10">
				<OptionsButton
					onClick={() => editor.chain().focus().toggleBold().run()}
					isDisabled={
						!editor.can().chain().focus().toggleBold().run()
					}
					className={editor.isActive("bold") ? "is-active" : ""}
					isIconOnly
				>
					<IconBold />
				</OptionsButton>
				<OptionsButton
					onClick={() => editor.chain().focus().toggleItalic().run()}
					isDisabled={
						!editor.can().chain().focus().toggleItalic().run()
					}
					className={editor.isActive("italic") ? "is-active" : ""}
					isIconOnly
				>
					<IconItalic />
				</OptionsButton>
				<OptionsButton
					onClick={() => editor.chain().focus().toggleStrike().run()}
					isDisabled={
						!editor.can().chain().focus().toggleStrike().run()
					}
					className={editor.isActive("strike") ? "is-active" : ""}
					isIconOnly
				>
					<IconStrikethrough />
				</OptionsButton>
				<OptionsButton
					onClick={() => editor.chain().focus().toggleCode().run()}
					isDisabled={
						!editor.can().chain().focus().toggleCode().run()
					}
					className={editor.isActive("code") ? "is-active" : ""}
					isIconOnly
				>
					<IconCode />
				</OptionsButton>
				<OptionsButton
					onClick={() => editor.chain().focus().setParagraph().run()}
					className={editor.isActive("paragraph") ? "is-active" : ""}
				>
					Normal Text
				</OptionsButton>
				<OptionsButton
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					className={
						editor.isActive("heading", { level: 1 })
							? "is-active"
							: ""
					}
				>
					Big Title
				</OptionsButton>
				<OptionsButton
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className={
						editor.isActive("heading", { level: 2 })
							? "is-active"
							: ""
					}
				>
					Medium Title
				</OptionsButton>
				<OptionsButton
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					className={
						editor.isActive("heading", { level: 3 })
							? "is-active"
							: ""
					}
				>
					Small Title
				</OptionsButton>
				<OptionsButton
					onClick={() =>
						editor.chain().focus().toggleBulletList().run()
					}
					className={editor.isActive("bulletList") ? "is-active" : ""}
				>
					<IconList />
				</OptionsButton>
				<OptionsButton
					onClick={() =>
						editor.chain().focus().toggleOrderedList().run()
					}
					className={
						editor.isActive("orderedList") ? "is-active" : ""
					}
				>
					<IconListNumbers />
				</OptionsButton>
				<OptionsButton
					onClick={() =>
						editor.chain().focus().toggleBlockquote().run()
					}
					className={editor.isActive("blockquote") ? "is-active" : ""}
				>
					<IconQuote />
				</OptionsButton>
				<OptionsButton
					onClick={() =>
						editor.chain().focus().setHorizontalRule().run()
					}
				>
					<IconSeparator />
				</OptionsButton>
			</div>
			<EditorContent className="p-4" editor={editor} />
			<BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
		</div>
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
];

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

// // eslint-disable-next-line react/display-name
// export default () => {
// 	return (
// 		<EditorProvider
// 			slotBefore={<MenuBar />}
// 			extensions={extensions}
// 			content={content}
// 		></EditorProvider>
// 	);
// };

type OptionsButtonProps = ComponentProps<typeof Button>;

const OptionsButton = ({ children, ...props }: OptionsButtonProps) => {
	return (
		<Button size="sm" variant="ghost" {...props}>
			{children}
		</Button>
	);
};
