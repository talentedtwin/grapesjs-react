"use client"; // this registers <Editor> as a Client Component
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
 
// Our <Editor> component we can reuse later
export default function Editor() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: [
        {
            type: "paragraph",
            content: "Add content here",
        },
    ]
  });
 
  // Renders the editor instance using a React component.
  return (
    <div className="flex w-full">
        <BlockNoteView editor={editor} className="bg-white w-full" />
    </div>
);
}