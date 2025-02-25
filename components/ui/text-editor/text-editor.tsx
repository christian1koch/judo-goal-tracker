import "./tiptap.scss";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";

import TextStyle, { TextStyleOptions } from "@tiptap/extension-text-style";
import { EditorContent, EditorEvents, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import "react-horizontal-scrolling-menu/dist/styles.css";
import Link from "@tiptap/extension-link";
import {
	Slash,
	SlashCmdProvider,
	createSuggestionsItems,
} from "@harshtalks/slash-tiptap";

import { SlashCmd } from "@harshtalks/slash-tiptap";
import { OptionsList } from "./options-list";
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
		<SlashCmdProvider>
			<div className="flex flex-col gap-4 bg-default-50 border rounded-md flex-1 w-full">
				<div className="flex sticky top-16 z-10 w-full">
					<div className="md:flex w-full hidden">
						<OptionsList editor={editor} />
					</div>
				</div>
				<EditorContent className="p-4 h-full w-full" editor={editor} />
				<SlashCmd.Root editor={editor}>
					<SlashCmd.Cmd>
						<SlashCmd.Empty>No commands available</SlashCmd.Empty>
						<SlashCmd.List>
							{suggestions.map((item) => {
								return (
									<SlashCmd.Item
										value={item.title}
										onCommand={(val) => {
											item.command(val);
										}}
										key={item.title}
									>
										<p>{item.title}</p>
									</SlashCmd.Item>
								);
							})}
						</SlashCmd.List>
					</SlashCmd.Cmd>
				</SlashCmd.Root>
			</div>
		</SlashCmdProvider>
	);
}

const suggestions = createSuggestionsItems([
	{
		title: "text",
		searchTerms: ["paragraph"],
		command: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.toggleNode("paragraph", "paragraph")
				.run();
		},
	},
	{
		title: "Bullet List",
		searchTerms: ["unordered", "point"],
		command: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).toggleBulletList().run();
		},
	},
	{
		title: "Ordered List",
		searchTerms: ["ordered", "point", "numbers"],
		command: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).toggleOrderedList().run();
		},
	},
]);

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
	Slash.configure({
		suggestion: {
			items: () => suggestions,
			char: "#",
		},
	}),
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
