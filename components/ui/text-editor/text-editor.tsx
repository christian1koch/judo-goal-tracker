import "./tiptap.scss";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";

import TextStyle, { TextStyleOptions } from "@tiptap/extension-text-style";
import {
	Editor,
	EditorContent,
	EditorEvents,
	Range,
	useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import "react-horizontal-scrolling-menu/dist/styles.css";
import Link from "@tiptap/extension-link";
import {
	Slash,
	SlashCmdProvider,
	enableKeyboardNavigation,
} from "@harshtalks/slash-tiptap";

import { SlashCmd } from "@harshtalks/slash-tiptap";
import { OptionsList } from "./options-list";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
interface TextEditorProps {
	content?: string;
	onUpdate?: (props: EditorEvents["update"]) => void;
	suggestionsList: SuggestionOption[];
	editable: boolean;
}

export type SuggestionOption = {
	title: string;
	searchTerms: string[];
	command: ({ editor, range }: { editor: Editor; range: Range }) => void;
	id: number;
};

export default function TextEditor({
	content,
	onUpdate,
	suggestionsList,
	editable,
}: TextEditorProps) {
	const editor = useEditor({
		extensions,
		content: content,
		onUpdate,
		editorProps: {
			handleDOMEvents: {
				keydown: (_, v) => enableKeyboardNavigation(v),
			},
		},
	});
	useEffect(() => {
		editor?.setEditable(editable);
	}, [editable, editor]);

	if (!editor) {
		return null;
	}

	return (
		<SlashCmdProvider>
			<div
				className={cn(
					"flex flex-col gap-4 border rounded-md flex-1 w-full",
					editable ? "bg-default-50" : "bg-background"
				)}
			>
				<div className="flex sticky top-16 z-10 w-full">
					{editable && (
						<div className="md:flex w-full hidden">
							<OptionsList editor={editor} />
						</div>
					)}
				</div>
				<EditorContent className="p-4 h-full w-full" editor={editor} />
				<SlashCmd.Root editor={editor}>
					<SlashCmd.Cmd>
						<SlashCmd.Empty>No commands available</SlashCmd.Empty>
						<SlashCmd.List>
							<div className="bg-background z-10 py-2 px-4 flex flex-col rounded-md max-h-52 overflow-auto">
								{suggestionsList.map((item, i) => {
									return (
										<SlashCmd.Item
											className=" aria-selected:bg-default-100"
											value={i + "." + item.title}
											onCommand={(val) => {
												item.command(val);
											}}
											key={item.id}
										>
											<p>{item.title}</p>
										</SlashCmd.Item>
									);
								})}
							</div>
						</SlashCmd.List>
					</SlashCmd.Cmd>
				</SlashCmd.Root>
			</div>
		</SlashCmdProvider>
	);
}

// const suggestions = createSuggestionsItems([
// 	{
// 		title: "text",
// 		searchTerms: ["paragraph"],
// 		command: ({ editor, range }) => {
// 			editor
// 				.chain()
// 				.focus()
// 				.deleteRange(range)
// 				.toggleNode("paragraph", "paragraph")
// 				.run();
// 		},
// 	},
// 	{
// 		title: "Bullet List",
// 		searchTerms: ["unordered", "point"],
// 		command: ({ editor, range }) => {
// 			editor.chain().focus().deleteRange(range).toggleBulletList().run();
// 		},
// 	},
// 	{
// 		title: "Ordered List",
// 		searchTerms: ["ordered", "point", "numbers"],
// 		command: ({ editor, range }) => {
// 			editor.chain().focus().deleteRange(range).toggleOrderedList().run();
// 		},
// 	},
// ]);

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
		autolink: false,
	}),
	Image.configure({
		inline: true,
	}),
	ImageResize,
	Slash.configure({
		suggestion: {
			char: "/",
		},
	}),
];
