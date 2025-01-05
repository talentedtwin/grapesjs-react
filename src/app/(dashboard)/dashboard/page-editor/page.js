import CustomEditor from "@/app/components/Editor/Editor";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <main>
          <CustomEditor />
        </main>
      </div>
    </Suspense>
  );
}
