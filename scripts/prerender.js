// Post-build: write per-route index.html with page-specific metadata, plus sitemap.xml and robots.txt.
// The page body still renders client-side; crawlers and link previews get correct <head> tags.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { PROJECTS, SITE_URL } from "../src/data/projects.js";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function withMeta(html, { path, title, description, image }) {
  const url = SITE_URL + path;
  const set = (re, value) => {
    if (!re.test(html)) throw new Error(`prerender: tag not found ${re}`);
    html = html.replace(re, `$1${esc(value)}$2`);
  };
  set(/(<title>)[^<]*(<\/title>)/, title);
  set(/(<meta name="description"\s+content=")[^"]*(")/, description);
  set(/(<link rel="canonical" href=")[^"]*(")/, url);
  set(/(<meta property="og:title" content=")[^"]*(")/, title);
  set(/(<meta property="og:description"\s+content=")[^"]*(")/, description);
  set(/(<meta property="og:url" content=")[^"]*(")/, url);
  set(/(<meta name="twitter:title" content=")[^"]*(")/, title);
  set(/(<meta name="twitter:description"\s+content=")[^"]*(")/, description);
  if (image) {
    set(/(<meta property="og:image" content=")[^"]*(")/, SITE_URL + image.src);
    set(/(<meta property="og:image:width" content=")[^"]*(")/, String(image.width));
    set(/(<meta property="og:image:height" content=")[^"]*(")/, String(image.height));
    set(/(<meta property="og:image:alt" content=")[^"]*(")/, image.alt);
    set(/(<meta name="twitter:image" content=")[^"]*(")/, SITE_URL + image.src);
    set(/(<meta name="twitter:card" content=")[^"]*(")/, "summary_large_image");
  }
  return html;
}

const ROUTES = [
  { path: "/" },
  {
    path: "/projects",
    title: "Projects · Abhishek Mamdapure",
    description: "Generative AI and data projects by Abhishek Mamdapure, with case studies, source code and live demos.",
  },
  ...PROJECTS.map((p) => ({
    path: `/projects/${p.slug}`,
    title: `${p.title} · Case study · Abhishek Mamdapure`,
    description: p.summary,
    image: p.shareImage && { src: p.shareImage, width: 1200, height: 630, alt: p.imageAlt },
  })),
];

const template = readFileSync("dist/index.html", "utf8");
for (const r of ROUTES.slice(1)) {
  mkdirSync(`dist${r.path}`, { recursive: true });
  writeFileSync(`dist${r.path}/index.html`, withMeta(template, r));
}
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ROUTES.map(
    (r) => `  <url><loc>${SITE_URL}${r.path}</loc></url>`
  ).join("\n")}\n</urlset>\n`
);
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`prerender: ${ROUTES.length - 1} routes, sitemap.xml, robots.txt`);
