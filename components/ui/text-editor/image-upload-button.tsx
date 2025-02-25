import { uploadImageToSupabase } from "@/app/actions";
import { IconCloudUp } from "@tabler/icons-react";
import { Editor } from "@tiptap/react";
import { useRef, ChangeEvent, useCallback, useEffect } from "react";
import { OptionsButton } from "./options-button";

export function ImageUploadButton({ editor }: { editor: Editor }) {
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

				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					className="hidden"
				/>
			</OptionsButton>
		</>
	);
}
