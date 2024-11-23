"use client";

import GjsEditor from "@grapesjs/react";
import grapesjs from "grapesjs";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import gjsBlocksFlexbox from "grapesjs-blocks-flexbox";
import { useSearchParams } from "next/navigation";

export default function CustomEditor() {
  // Get the URL parameters
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const onEditor = (editor) => {
    console.log("Editor loaded", { editor });

    // Helper function to safely get container
    const getEditorContainer = (editor) => {
      if (!editor || !editor.getContainer()) {
        console.warn("Editor or container not initialized");
        return null;
      }
      return editor.getContainer();
    };

    // editor.Panels.addPanel({
    //   id: "panel-top",
    //   el: ".panel__top",
    // });
    // editor.Panels.addPanel({
    //   id: "basic-actions",
    //   el: ".panel__basic-actions",
    //   buttons: [
    //     {
    //       id: "visibility",
    //       active: true, // active by default
    //       className: "btn-toggle-borders",
    //       label:
    //         '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-border" viewBox="0 0 16 16"><path d="M0 0h.969v.5H1v.469H.969V1H.5V.969H0V0zm2.844 1h-.938V0h.938v1zm1.875 0H3.78V0h.938v1zm1.875 0h-.938V0h.938v1zm.937 0V.969H7.5V.5h.031V0h.938v.5H8.5v.469h-.031V1H7.53zm2.813 0h-.938V0h.938v1zm1.875 0h-.938V0h.938v1zm1.875 0h-.938V0h.938v1zM15.5 1h-.469V.969H15V.5h.031V0H16v.969h-.5V1zM1 1.906v.938H0v-.938h1zm6.5.938v-.938h1v.938h-1zm7.5 0v-.938h1v.938h-1zM1 3.78v.938H0V3.78h1zm6.5.938V3.78h1v.938h-1zm7.5 0V3.78h1v.938h-1zM1 5.656v.938H0v-.938h1zm6.5.938v-.938h1v.938h-1zm7.5 0v-.938h1v.938h-1zM.969 8.5H.5v-.031H0V7.53h.5V7.5h.469v.031H1v.938H.969V8.5zm1.875 0h-.938v-1h.938v1zm1.875 0H3.78v-1h.938v1zm1.875 0h-.938v-1h.938v1zm1.875-.031V8.5H7.53v-.031H7.5V7.53h.031V7.5h.938v.031H8.5v.938h-.031zm1.875.031h-.938v-1h.938v1zm1.875 0h-.938v-1h.938v1zm1.875 0h-.938v-1h.938v1zm1.406 0h-.469v-.031H15V7.53h.031V7.5h.469v.031h.5v.938h-.5V8.5zM0 10.344v-.938h1v.938H0zm7.5 0v-.938h1v.938h-1zm8.5-.938v.938h-1v-.938h1zM0 12.22v-.938h1v.938H0zm7.5 0v-.938h1v.938h-1zm8.5-.938v.938h-1v-.938h1zM0 14.094v-.938h1v.938H0zm7.5 0v-.938h1v.938h-1zm8.5-.938v.938h-1v-.938h1zM.969 16H0v-.969h.5V15h.469v.031H1v.469H.969v.5zm1.875 0h-.938v-1h.938v1zm1.875 0H3.78v-1h.938v1zm1.875 0h-.938v-1h.938v1zm.937 0v-.5H7.5v-.469h.031V15h.938v.031H8.5v.469h-.031v.5H7.53zm2.813 0h-.938v-1h.938v1zm1.875 0h-.938v-1h.938v1zm1.875 0h-.938v-1h.938v1zm.937 0v-.5H15v-.469h.031V15h.469v.031h.5V16h-.969z"/></svg>',
    //       command: "sw-visibility", // Built-in command
    //     },
    //     {
    //       id: "export",
    //       className: "btn-open-export",
    //       label:
    //         '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-code-slash" viewBox="0 0 16 16"><path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/></svg>',
    //       command: "export-template",
    //       context: "export-template", // For grouping context of buttons from the same panel
    //     },
    //     {
    //       id: "show-json",
    //       className: "btn-show-json",
    //       label:
    //         '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-braces" viewBox="0 0 16 16"><path d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6zM13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6z"/></svg>',
    //       context: "show-json",
    //       command(editor) {
    //         editor.Modal.setTitle("Components JSON")
    //           .setContent(
    //             `<textarea style="width:100%; height: 250px;">
    //                     ${JSON.stringify(editor.getComponents())}
    //                 </textarea>`
    //           )
    //           .open();
    //       },
    //     },
    //     {
    //       id: "create-button",
    //       className: "btn-show-fonts",
    //       label:
    //         '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16"><path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/></svg>',
    //       command(editor) {
    //         editor.runCommand("open-fonts");
    //       },
    //     },
    //     {
    //       id: "preview",
    //       className: "btn-show-preview",
    //       label:
    //         '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg>',
    //       command(editor) {
    //         editor.runCommand("preview");
    //       },
    //     },
    //     {
    //       id: "undo",
    //       className: "btn-undo",
    //       label:
    //         '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/></svg>',
    //       command: function command(editor, sender) {
    //         sender.set("active", 0);
    //         editor.UndoManager.undo(1);
    //       },
    //       attributes: {
    //         title: "Undo (CTRL/CMD + Z)",
    //       },
    //     },
    //     {
    //       id: "redo",
    //       className: "btn-redo",
    //       label:
    //         '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>',
    //       command: function command(editor, sender) {
    //         sender.set("active", 0);
    //         editor.UndoManager.redo(1);
    //       },
    //       attributes: {
    //         title: "Redo (CTRL/CMD + Y)",
    //       },
    //     },
    //   ],
    // });
    // editor.on("run:export-template:before", (opts) => {
    //   console.log("Before the command run");
    //   if (0 /* some condition */) {
    //     opts.abort = 1;
    //   }
    // });
    // editor.on("run:export-template", () =>
    //   console.log("After the command run")
    // );
    // editor.on("abort:export-template", () => console.log("Command aborted"));

    // // Modified getRowEl function with safety checks
    // const getRowEl = (editor) => {
    //   const container = getEditorContainer(editor);
    //   if (!container) return null;

    //   const row = container.closest(".editor-row");
    //   if (!row) {
    //     console.warn("Could not find .editor-row element");
    //     return null;
    //   }
    //   return row;
    // };

    // editor.Commands.add("show-layers", {
    //   getRowEl,
    //   getLayersEl(row) {
    //     if (!row) return null;
    //     return row.querySelector(".layers-container");
    //   },

    //   run(editor, sender) {
    //     const row = this.getRowEl(editor);
    //     const lmEl = row && this.getLayersEl(row);
    //     if (lmEl) {
    //       lmEl.style.display = "";
    //     }
    //   },
    //   stop(editor, sender) {
    //     const row = this.getRowEl(editor);
    //     const lmEl = row && this.getLayersEl(row);
    //     if (lmEl) {
    //       lmEl.style.display = "none";
    //     }
    //   },
    // });

    // editor.Commands.add("show-styles", {
    //   getRowEl,
    //   getStyleEl(row) {
    //     if (!row) return null;
    //     return row.querySelector(".styles-container");
    //   },

    //   run(editor, sender) {
    //     const row = this.getRowEl(editor);
    //     const smEl = row && this.getStyleEl(row);
    //     if (smEl) {
    //       smEl.style.display = "";
    //     }
    //   },
    //   stop(editor, sender) {
    //     const row = this.getRowEl(editor);
    //     const smEl = row && this.getStyleEl(row);
    //     if (smEl) {
    //       smEl.style.display = "none";
    //     }
    //   },
    // });

    // editor.Commands.add("show-traits", {
    //   getRowEl,
    //   getTraitsEl(row) {
    //     if (!row) return null;
    //     return row.querySelector(".traits-container");
    //   },

    //   run(editor, sender) {
    //     const row = this.getRowEl(editor);
    //     const trEl = row && this.getTraitsEl(row);
    //     if (trEl) {
    //       trEl.style.display = "";
    //     }
    //   },
    //   stop(editor, sender) {
    //     const row = this.getRowEl(editor);
    //     const trEl = row && this.getTraitsEl(row);
    //     if (trEl) {
    //       trEl.style.display = "none";
    //     }
    //   },
    // });
    // editor.Commands.add("show-blocks", {
    //   getBlocksEl(editor) {
    //     const container = editor.getContainer();
    //     if (!container) {
    //       console.warn("Editor container not found");
    //       return null;
    //     }

    //     const row = container.closest(".editor-row");
    //     if (!row) {
    //       console.warn("Could not find parent .editor-row element");
    //       return null;
    //     }

    //     const blocksEl = row.querySelector("#blocks");
    //     if (!blocksEl) {
    //       console.warn("#blocks element not found");
    //       return null;
    //     }

    //     return blocksEl;
    //   },

    //   run(editor, sender) {
    //     const blocksEl = this.getBlocksEl(editor);
    //     if (blocksEl) {
    //       blocksEl.style.display = "";
    //     }
    //   },

    //   stop(editor, sender) {
    //     const blocksEl = this.getBlocksEl(editor);
    //     if (blocksEl) {
    //       blocksEl.style.display = "none";
    //     }
    //   },
    // });
    // editor.Commands.add("set-device-desktop", {
    //   run: (editor) => editor.setDevice("Desktop"),
    // });
    // editor.Commands.add("set-device-tablet", {
    //   run: (editor) => editor.setDevice("Tablet"),
    // });
    // editor.Commands.add("set-device-mobile", {
    //   run: (editor) => editor.setDevice("Mobile"),
    // });

    // editor.I18n.addMessages({
    //   en: {
    //     styleManager: {
    //       properties: {
    //         "background-repeat": "Repeat",
    //         "background-position": "Position",
    //         "background-attachment": "Attachment",
    //         "background-size": "Size",
    //       },
    //     },
    //   },
    // });
  };

  return (
    //     storageManager: {
    //       type: "local", // Type of the storage, available: 'local' | 'remote'
    //       autosave: true, // Store data automatically
    //       autoload: true, // Autoload stored data on init
    //       stepsBeforeSave: 1, // If autosave enabled, indicates how many changes are necessary before store method is triggered
    //       options: {
    //         local: {
    //           // Options for the `local` type
    //           key: "gjsProject", // The key for the local storage
    //         },
    //       },
    //     },
    //     // panels: {
    //     //   defaults: [
    //     //     {
    //     //       id: "layers",
    //     //       el: ".panel__right",
    //     //       // Make the panel resizable
    //     //       resizable: {
    //     //         maxDim: 350,
    //     //         minDim: 200,
    //     //         tc: 0, // Top handler
    //     //         cl: 1, // Left handler
    //     //         cr: 0, // Right handler
    //     //         bc: 0, // Bottom handler
    //     //         // Being a flex child we need to change `flex-basis` property
    //     //         // instead of the `width` (default)
    //     //         keyWidth: "flex-basis",
    //     //       },
    //     //     },
    //     //     {
    //     //       id: "panel-switcher",
    //     //       el: ".panel__switcher",
    //     //       buttons: [
    //     //         {
    //     //           id: "show-layers",
    //     //           active: true,
    //     //           label:
    //     //             '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-layers-fill" viewBox="0 0 16 16"><path d="M7.765 1.559a.5.5 0 0 1 .47 0l7.5 4a.5.5 0 0 1 0 .882l-7.5 4a.5.5 0 0 1-.47 0l-7.5-4a.5.5 0 0 1 0-.882l7.5-4z"/><path d="m2.125 8.567-1.86.992a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882l-1.86-.992-5.17 2.756a1.5 1.5 0 0 1-1.41 0l-5.17-2.756z"/></svg>',
    //     //           command: "show-layers",
    //     //           // Once activated disable the possibility to turn it off
    //     //           togglable: false,
    //     //         },
    //     //         {
    //     //           id: "show-style",
    //     //           active: true,
    //     //           label:
    //     //             '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-palette-fill" viewBox="0 0 16 16"><path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07zM8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>',
    //     //           command: "show-styles",
    //     //           togglable: false,
    //     //         },
    //     //         {
    //     //           id: "show-traits",
    //     //           active: true,
    //     //           label:
    //     //             '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-info-square" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>',
    //     //           command: "show-traits",
    //     //           togglable: false,
    //     //         },
    //     //         {
    //     //           id: "show-blocks",
    //     //           active: true,
    //     //           label:
    //     //             '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-grid" viewBox="0 0 16 16"><path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/></svg>',
    //     //           command: "show-blocks",
    //     //           togglable: false,
    //     //         },
    //     //       ],
    //     //     },
    //     //     {
    //     //       id: "panel-devices",
    //     //       el: ".panel__devices",
    //     //       buttons: [
    //     //         {
    //     //           id: "device-desktop",
    //     //           label:
    //     //             '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-display" viewBox="0 0 16 16"><path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75c.167-.333.25-.833.25-1.5H2s-2 0-2-2V4zm1.398-.855a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145z"/></svg>',
    //     //           command: "set-device-desktop",
    //     //           active: true,
    //     //           togglable: false,
    //     //         },
    //     //         {
    //     //           id: "device-tablet",
    //     //           label:
    //     //             '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-tablet" viewBox="0 0 16 16"><path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/><path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>',
    //     //           command: "set-device-tablet",
    //     //           togglable: false,
    //     //         },
    //     //         {
    //     //           id: "device-mobile",
    //     //           label:
    //     //             '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-phone" viewBox="0 0 16 16"><path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/><path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>',
    //     //           command: "set-device-mobile",
    //     //           togglable: false,
    //     //         },
    //     //       ],
    //     //     },
    //     //   ],
    //     // },
    //     // // The Selector Manager allows to assign classes and
    //     // // different states (eg. :hover) on components.
    //     // // Generally, it's used in conjunction with Style Manager
    //     // // but it's not mandatory
    //     // selectorManager: {
    //     //   appendTo: ".styles-container",
    //     // },
    //     // styleManager: {
    //     //   appendTo: ".styles-container",
    //     // },
    //     // traitManager: {
    //     //   appendTo: ".traits-container",
    //     // },
    //     // styleManager: {
    //     //   appendTo: ".styles-container",
    //     //   sectors: [
    //     //     {
    //     //       name: "General",
    //     //       open: false,
    //     //       buildProps: [
    //     //         "float",
    //     //         "display",
    //     //         "position",
    //     //         "top",
    //     //         "right",
    //     //         "left",
    //     //         "bottom",
    //     //       ],
    //     //     },
    //     //     {
    //     //       name: "Dimension",
    //     //       open: false,
    //     //       buildProps: [
    //     //         "width",
    //     //         "flex-width",
    //     //         "height",
    //     //         "max-width",
    //     //         "min-height",
    //     //         "margin",
    //     //         "padding",
    //     //       ],
    //     //       properties: [
    //     //         {
    //     //           id: "flex-width",
    //     //           type: "integer",
    //     //           name: "Width",
    //     //           units: ["px", "%", "em", "rem", "vw", "vh"],
    //     //           property: "flex-basis",
    //     //           toRequire: 1,
    //     //         },
    //     //       ],
    //     //     },
    //     //     {
    //     //       name: "Typography",
    //     //       open: false,
    //     //       properties: [
    //     //         "font-family",
    //     //         "font-size",
    //     //         "font-weight",
    //     //         "letter-spacing",
    //     //         "color",
    //     //         "line-height",
    //     //         "text-align",
    //     //         "text-decoration",
    //     //         "text-shadow",
    //     //       ],
    //     //     },
    //     //     {
    //     //       name: "Decorations",
    //     //       open: false,
    //     //       properties: [
    //     //         "opacity",
    //     //         "border-radius",
    //     //         "border",
    //     //         "box-shadow",
    //     //         "background", // { id: 'background-bg', property: 'background', type: 'bg' }
    //     //       ],
    //     //     },
    //     //     {
    //     //       name: "Extra",
    //     //       open: false,
    //     //       buildProps: ["transition", "perspective", "transform"],
    //     //     },
    //     //     {
    //     //       name: "Flex",
    //     //       open: false,
    //     //       properties: [
    //     //         {
    //     //           name: "Flex Container",
    //     //           property: "display",
    //     //           type: "select",
    //     //           defaults: "block",
    //     //           list: [
    //     //             { value: "block", name: "Disable" },
    //     //             { value: "flex", name: "Enable" },
    //     //           ],
    //     //         },
    //     //         {
    //     //           name: "Flex Parent",
    //     //           property: "label-parent-flex",
    //     //           type: "integer",
    //     //         },
    //     //         {
    //     //           name: "Direction",
    //     //           property: "flex-direction",
    //     //           type: "radio",
    //     //           defaults: "row",
    //     //           list: [
    //     //             {
    //     //               value: "row",
    //     //               name: "Row",
    //     //               className: "icons-flex icon-dir-row",
    //     //               title: "Row",
    //     //             },
    //     //             {
    //     //               value: "row-reverse",
    //     //               name: "Row reverse",
    //     //               className: "icons-flex icon-dir-row-rev",
    //     //               title: "Row reverse",
    //     //             },
    //     //             {
    //     //               value: "column",
    //     //               name: "Column",
    //     //               title: "Column",
    //     //               className: "icons-flex icon-dir-col",
    //     //             },
    //     //             {
    //     //               value: "column-reverse",
    //     //               name: "Column reverse",
    //     //               title: "Column reverse",
    //     //               className: "icons-flex icon-dir-col-rev",
    //     //             },
    //     //           ],
    //     //         },
    //     //         {
    //     //           name: "Justify",
    //     //           property: "justify-content",
    //     //           type: "radio",
    //     //           defaults: "flex-start",
    //     //           list: [
    //     //             {
    //     //               value: "flex-start",
    //     //               className: "icons-flex icon-just-start",
    //     //               title: "Start",
    //     //             },
    //     //             {
    //     //               value: "flex-end",
    //     //               title: "End",
    //     //               className: "icons-flex icon-just-end",
    //     //             },
    //     //             {
    //     //               value: "space-between",
    //     //               title: "Space between",
    //     //               className: "icons-flex icon-just-sp-bet",
    //     //             },
    //     //             {
    //     //               value: "space-around",
    //     //               title: "Space around",
    //     //               className: "icons-flex icon-just-sp-ar",
    //     //             },
    //     //             {
    //     //               value: "center",
    //     //               title: "Center",
    //     //               className: "icons-flex icon-just-sp-cent",
    //     //             },
    //     //           ],
    //     //         },
    //     //         {
    //     //           name: "Align",
    //     //           property: "align-items",
    //     //           type: "radio",
    //     //           defaults: "center",
    //     //           list: [
    //     //             {
    //     //               value: "flex-start",
    //     //               title: "Start",
    //     //               className: "icons-flex icon-al-start",
    //     //             },
    //     //             {
    //     //               value: "flex-end",
    //     //               title: "End",
    //     //               className: "icons-flex icon-al-end",
    //     //             },
    //     //             {
    //     //               value: "stretch",
    //     //               title: "Stretch",
    //     //               className: "icons-flex icon-al-str",
    //     //             },
    //     //             {
    //     //               value: "center",
    //     //               title: "Center",
    //     //               className: "icons-flex icon-al-center",
    //     //             },
    //     //           ],
    //     //         },
    //     //         {
    //     //           name: "Flex Children",
    //     //           property: "label-parent-flex",
    //     //           type: "integer",
    //     //         },
    //     //         {
    //     //           name: "Order",
    //     //           property: "order",
    //     //           type: "integer",
    //     //           defaults: 0,
    //     //           min: 0,
    //     //         },
    //     //         {
    //     //           name: "Flex",
    //     //           property: "flex",
    //     //           type: "composite",
    //     //           properties: [
    //     //             {
    //     //               name: "Grow",
    //     //               property: "flex-grow",
    //     //               type: "integer",
    //     //               defaults: 0,
    //     //               min: 0,
    //     //             },
    //     //             {
    //     //               name: "Shrink",
    //     //               property: "flex-shrink",
    //     //               type: "integer",
    //     //               defaults: 0,
    //     //               min: 0,
    //     //             },
    //     //             {
    //     //               name: "Basis",
    //     //               property: "flex-basis",
    //     //               type: "integer",
    //     //               units: ["px", "%", ""],
    //     //               unit: "",
    //     //               defaults: "auto",
    //     //             },
    //     //           ],
    //     //         },
    //     //         {
    //     //           name: "Align",
    //     //           property: "align-self",
    //     //           type: "radio",
    //     //           defaults: "auto",
    //     //           list: [
    //     //             {
    //     //               value: "auto",
    //     //               name: "Auto",
    //     //             },
    //     //             {
    //     //               value: "flex-start",
    //     //               title: "Start",
    //     //               className: "icons-flex icon-al-start",
    //     //             },
    //     //             {
    //     //               value: "flex-end",
    //     //               title: "End",
    //     //               className: "icons-flex icon-al-end",
    //     //             },
    //     //             {
    //     //               value: "stretch",
    //     //               title: "Stretch",
    //     //               className: "icons-flex icon-al-str",
    //     //             },
    //     //             {
    //     //               value: "center",
    //     //               title: "Center",
    //     //               className: "icons-flex icon-al-center",
    //     //             },
    //     //           ],
    //     //         },
    //     //       ],
    //     //     },
    //     //   ],
    //     // },
    //     // traitManager: {
    //     //   appendTo: ".traits-container",
    //     // },
    //   }}
    //   onEditor={onEditor}
    // />
    //   <div className="editor-container">
    //     <div className="panel__top">
    //       <div className="panel__basic-actions"></div>
    //       <div className="panel__devices"></div>
    //       <div className="panel__switcher"></div>
    //     </div>
    //     <div className="editor-row">
    //       <div className="editor-canvas"></div>
    //       <div className="panel__right">
    //         <div className="layers-container"></div>
    //         <div className="styles-container"></div>
    //         <div className="traits-container"></div>
    //         <div id="blocks"></div>
    //       </div>
    //     </div>
    //   </div>
    //   <div id="gjs"></div>
    // </GjsEditor>
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
          // onStore: data => ({  data }),
          onLoad: (result) => result.gjs_data,
        },
        plugins: [gjsBlocksBasic, gjsBlocksFlexbox],
        pluginsOpts: {
          "gjs-blocks-flexbox": {
            // options
          },
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
