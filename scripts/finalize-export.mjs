import { writeFile } from "node:fs/promises";

await writeFile(new URL("../out/.nojekyll", import.meta.url), "");
console.log("Exportação estática pronta para GitHub Pages.");
