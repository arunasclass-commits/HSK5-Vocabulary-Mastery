import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

if (process.env.GITHUB_PAGES !== "1") {
  process.exit(0);
}

const base = "/HSK5-Vocabulary-Mastery/";
const dist = join(process.cwd(), "dist");
const indexPath = join(dist, "index.html");
await access(indexPath);

function prefixRootAbsolute(html) {
  return html.replace(/(href|src)="\/(?!HSK5-Vocabulary-Mastery\/)/g, `$1="${base}`);
}

const html = prefixRootAbsolute(await readFile(indexPath, "utf8"));
if (!html.includes(`${base}assets/`)) {
  throw new Error(`dist/index.html is missing built assets under ${base}`);
}
if (html.includes('href="/favicon.svg"') || html.includes('href="/__grok/')) {
  throw new Error("dist/index.html still has root-absolute asset links");
}

await writeFile(indexPath, html);
await writeFile(join(dist, "404.html"), html);
await writeFile(join(dist, ".nojekyll"), "");
await mkdir(join(dist, "__grok"), { recursive: true });
await writeFile(
  join(dist, "__grok", "manifest.webmanifest"),
  JSON.stringify(
    {
      name: "HSK5 Vocabulary Mastery",
      short_name: "HSK5 Vocabulary Mastery",
      id: base,
      start_url: base,
      scope: base,
      display: "standalone",
      background_color: "#1c1917",
      theme_color: "#1c1917",
      icons: [
        {
          src: `${base}__grok/icon-180.png`,
          sizes: "180x180",
          type: "image/png",
        },
      ],
    },
    null,
    2,
  ),
);
console.log("[pages] dist/index.html is ready for GitHub Pages");
