import Image from "next/image";
import styles from "./page.module.css";
import Editor from "@/app/components/Editor/Editor";

export default function Home() {
  return (
    <div>
      <main>
        <Editor />
      </main>
    </div>
  );
}
