"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Import the CSS file
import "grapesjs/dist/css/grapes.min.css";

// Dynamically import GrapesJS and its plugins
const grapesjs = dynamic(() => import("grapesjs"), { ssr: false });
const gjsPresetWebpage = dynamic(() => import("grapesjs-preset-webpage"), {
  ssr: false,
});
const gjsBlocksBasic = dynamic(() => import("grapesjs-blocks-basic"), {
  ssr: false,
});
const gjsPluginForms = dynamic(() => import("grapesjs-plugin-forms"), {
  ssr: false,
});

export default function CustomEditor() {
  const editorRef = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined" && !editorRef.current) {
      Promise.all([
        grapesjs,
        gjsPresetWebpage,
        gjsBlocksBasic,
        gjsPluginForms,
      ]).then(
        ([grapesjs, gjsPresetWebpage, gjsBlocksBasic, gjsPluginForms]) => {
          editorRef.current = grapesjs.init({
            container: "#gjs",
            height: "100vh",
            width: "100%",
            storageManager: false,
            plugins: [gjsPresetWebpage, gjsBlocksBasic, gjsPluginForms],
            pluginsOpts: {
              gjsPresetWebpage: {},
              gjsBlocksBasic: {},
              gjsPluginForms: {},
            },
          });
          console.log("Editor loaded", editorRef.current);
        }
      );
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div id="gjs" style={{ height: "100vh", border: "3px solid #444" }}></div>
  );
}
