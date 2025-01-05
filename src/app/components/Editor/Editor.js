"use client";

import { useState } from "react";

import GjsEditor from "@grapesjs/react";
import grapesjs from "grapesjs";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import gjsBlocksFlexbox from "grapesjs-blocks-flexbox";
import parserPostCSS from "grapesjs-parser-postcss";
import gjsTailwind from "grapesjs-tailwind";
import { useSearchParams } from "next/navigation";
import registerComponents from "../PageBuilder/registerComponents";

export default function CustomEditor() {
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  console.log("id", id);

  const onEditor = (editor) => {
    console.log("Editor loaded", { editor });

    if (!editor) {
      console.error("Editor failed to initialize");
      return;
    }

    // Register custom components
    registerComponents(editor);

    // Add this code to register Tailwind classes
    editor.on("load", () => {
      const classManager = editor.Selectors;
      const tailwindClasses = [
        // "bg-blue-500",
        // "hover:bg-blue-700",
        // "text-white",
        // "font-bold",
        // "py-2",
        // "px-4",
        // "rounded",
        // Add more Tailwind classes as needed
      ];

      tailwindClasses.forEach((className) => {
        classManager.addClass(className);
      });
    });

    // Wrap the configuration code in a setTimeout
    setTimeout(() => {
      // Helper function to safely get container
      const getEditorContainer = (editor) => {
        if (!editor || !editor.getContainer()) {
          console.warn("Editor or container not initialized");
          return null;
        }
        return editor.getContainer();
      };

      const container = getEditorContainer(editor);
      if (!container) {
        console.error("Editor container not found");
        return;
      }

      // Add Tailwind classes to Style Manager
      editor.StyleManager.addProperty("layout", {
        name: "Display",
        property: "display",
        type: "select",
        defaults: "block",
        options: [
          { value: "block", name: "Block" },
          { value: "inline", name: "Inline" },
          { value: "inline-block", name: "Inline Block" },
          { value: "flex", name: "Flex" },
          { value: "inline-flex", name: "Inline Flex" },
        ],
      });

      editor.StyleManager.addProperty("layout", {
        name: "Flex Direction",
        property: "flex-direction",
        type: "select",
        defaults: "row",
        options: [
          { value: "flex-row", name: "Row" },
          { value: "flex-row-reverse", name: "Row Reverse" },
          { value: "flex-col", name: "Column" },
          { value: "flex-col-reverse", name: "Column Reverse" },
        ],
      });

      editor.StyleManager.addProperty("layout", {
        name: "Justify Content",
        property: "justify-content",
        type: "select",
        defaults: "flex-start",
        options: [
          { value: "justify-start", name: "Start" },
          { value: "justify-end", name: "End" },
          { value: "justify-center", name: "Center" },
          { value: "justify-between", name: "Space Between" },
          { value: "justify-around", name: "Space Around" },
          { value: "justify-evenly", name: "Space Evenly" },
        ],
      });

      editor.StyleManager.addProperty("layout", {
        name: "Align Items",
        property: "align-items",
        type: "select",
        defaults: "stretch",
        options: [
          { value: "items-start", name: "Start" },
          { value: "items-end", name: "End" },
          { value: "items-center", name: "Center" },
          { value: "items-baseline", name: "Baseline" },
          { value: "items-stretch", name: "Stretch" },
        ],
      });

      editor.StyleManager.addProperty("layout", {
        name: "Flex Wrap",
        property: "flex-wrap",
        type: "select",
        defaults: "nowrap",
        options: [
          { value: "flex-nowrap", name: "No Wrap" },
          { value: "flex-wrap", name: "Wrap" },
          { value: "flex-wrap-reverse", name: "Wrap Reverse" },
        ],
      });

      editor.StyleManager.addSector("Flexbox", {
        name: "Flexbox",
        open: false,
        properties: [
          "display",
          "flex-direction",
          "justify-content",
          "align-items",
          "flex-wrap",
        ],
      });

      // Add undo and redo buttons to the panel
      editor.Panels.addButton("options", [
        {
          id: "undo",
          className: "fa fa-undo",
          command: "undo",
          attributes: { title: "Undo" },
        },
        {
          id: "redo",
          className: "fa fa-repeat",
          command: "redo",
          attributes: { title: "Redo" },
        },
      ]);

      // Implement undo and redo commands
      editor.Commands.add("undo", {
        run: function (editor, sender) {
          sender.set("active", false);
          editor.UndoManager.undo();
        },
      });

      editor.Commands.add("redo", {
        run: function (editor, sender) {
          sender.set("active", false);
          editor.UndoManager.redo();
        },
      });

      // Optional: Update button states based on undo/redo stack
      editor.on("undo redo", function () {
        const undoBtn = editor.Panels.getButton("options", "undo");
        const redoBtn = editor.Panels.getButton("options", "redo");
        if (undoBtn) undoBtn.set("active", editor.UndoManager.hasUndo());
        if (redoBtn) redoBtn.set("active", editor.UndoManager.hasRedo());
      });
    }, 0);
  };

  if (error) {
    return <div>Error loading editor: {error}</div>;
  }

  return (
    <GjsEditor
      // Pass the core GrapesJS library to the wrapper (required).
      // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
      grapesjs={grapesjs}
      // Load the GrapesJS CSS file asynchronously from URL.
      // This is an optional prop, you can always import the CSS directly in your JS if you wish.
      grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
      // GrapesJS init options
      options={{
        height: "100vh",
        canvas: {
          styles: [
            "https://cdn.tailwindcss.com",
            "/build/editor-tailwind.css", // Use the local Tailwind CSS file
            "/build/styles.css",
            // Add more stylesheets if needed
          ],
        },
        storageManager: {
          type: "remote",
          options: {
            remote: {
              urlLoad: `/api/getPageData?id=${id}`,
              urlStore: `/api/getPageData?id=${id}`,
            },
          },
          contentTypeJson: true,
          storeComponents: true,
          storeStyles: true,
          storeHtml: true,
          storeCss: true,
          stepsBeforeSave: 3,
          headers: {
            "Content-Type": "application/json",
          },
          id: "my-",
          onStore: (data, editor) => {
            console.log("Data being stored:", data);
            // Get the HTML content
            let html = editor.getHtml();

            // Remove extra body tag if present
            const bodyRegex = /<body[^>]*>([\s\S]*)<\/body>/i;
            const match = html.match(bodyRegex);
            if (match) {
              html = match[1]; // Extract content inside body tags
            }

            return {
              data: {
                html: html,
                css: editor.getCss(),
                components: editor.getComponents(),
                styles: editor.getStyle(),
                pages: editor.getPages ? editor.getPages() : [],
                data: editor.getProjectData(),
              },
            };
          },

          onLoad: (result) => {
            console.log("Raw result from server:", result);
            let editorData = result[0];

            console.log("Parsed editor data:", editorData);

            if (typeof editorData === "string") {
              try {
                editorData = JSON.parse(editorData);
                console.log("Parsed JSON data:", editorData);
              } catch (error) {
                console.error("Error parsing JSON string:", error);
                // If parsing fails, assume it's a string literal
                editorData = { html: editorData };
              }
            }

            // Ensure html and css are strings
            const html =
              typeof editorData.html === "string" ? editorData.html : "";
            const css =
              typeof editorData.css === "string" ? editorData.css : "";

            // Parse components and styles if they're stored as strings
            let components = editorData.components || [];
            let styles = editorData.styles || [];

            if (typeof components === "string") {
              try {
                components = JSON.parse(components);
              } catch (error) {
                console.error("Error parsing components:", error);
                components = [];
              }
            }

            if (typeof styles === "string") {
              try {
                styles = JSON.parse(styles);
              } catch (error) {
                console.error("Error parsing styles:", error);
                styles = [];
              }
            }

            console.log("Final editor data being returned:", {
              html,
              css,
              components,
              styles,
              assets: editorData.assets || [],
            });

            return {
              html,
              css,
              components,
              styles,
              assets: editorData.assets || [],
            };
          },
        },
        plugins: [gjsBlocksBasic, gjsBlocksFlexbox, parserPostCSS, gjsTailwind],
        pluginsOpts: {
          // "gjs-blocks-flexbox": {
          //   // options
          // },
          "gjs-blocks-basic": {
            // options
          },
        },
        blockManager: {
          blocks: [
            {
              id: "h1",
              label: "Heading 1",
              category: "Typography",
              content: "<h1>Heading 1</h1>",
            },
            {
              id: "h2",
              label: "Heading 2",
              category: "Typography",
              content: "<h2>Heading 2</h2>",
            },
            {
              id: "h3",
              label: "Heading 3",
              category: "Typography",
              content: "<h3>Heading 3</h3>",
            },
            {
              id: "h4",
              label: "Heading 4",
              category: "Typography",
              content: "<h4>Heading 4</h4>",
            },
            {
              id: "h5",
              label: "Heading 5",
              category: "Typography",
              content: "<h5>Heading 5</h5>",
            },
            {
              id: "h6",
              label: "Heading 6",
              category: "Typography",
              content: "<h6>Heading 6</h6>",
            },
            {
              id: "paragraph",
              label: "Paragraph",
              category: "Typography",
              content: "<p>This is a paragraph.</p>",
            },
          ],
        },
      }}
      onEditor={onEditor}
    />
  );
}
