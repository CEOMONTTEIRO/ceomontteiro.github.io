import { readFile, access } from "node:fs/promises";
import { join } from "node:path";

const pages = [
  "index.html",
  "projetos/index.html",
  "sobre/index.html",
  "404.html",
];
for (const page of pages) {
  const html = await readFile(join("out", page), "utf8");
  const paths = new Set(
    [...html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)].map((match) => match[1]),
  );
  for (const path of paths) {
    const target = path.endsWith("/") ? `${path}index.html` : path;
    await access(join("out", target));
  }
  if (/forma-poster|forma-film|FORMA 001/.test(html))
    throw new Error(`Unexpected old media in ${page}`);
}
console.log(
  "Static export verified: 3 public routes, 404, and all referenced local assets.",
);
