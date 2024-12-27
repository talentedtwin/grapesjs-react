import fs from "fs";
import path from "path";

export default function getCssContent() {
  const cssPath = path.join(process.cwd(), "public", "build", "styles.css");
  return fs.readFileSync(cssPath, "utf8");
}
