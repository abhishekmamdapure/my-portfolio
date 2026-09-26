# Abhishek Mamdapure — Portfolio

Source for [abhishekmamdapure.com](https://abhishekmamdapure.com): a portfolio for a Generative AI Engineer, with project case studies and short links to live demos.

**Stack:** React 18, Vite 5, Tailwind CSS 3, deployed on Vercel (with Vercel Analytics). No router library or environment variables are needed.

## Local development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # vite build + scripts/prerender.js → dist/
npm run preview   # serve dist/
```

## Routes

| Path | What it serves |
|---|---|
| `/` | Home (`src/App.jsx`) |
| `/projects` | All projects (`src/pages.jsx`) |
| `/projects/<slug>` | Case study for each entry in `src/data/projects.js`; unknown slugs show a not-found page |
| `/jev`, `/jev/*` | 307 redirect → Jev Information Extraction demo on Railway |
| `/nobel`, `/nobel/*` | 307 redirect → Nobel Atlas (nobelprizewinners.info) |
| `/github` | 307 redirect → GitHub profile |
| `/resume` | 307 redirect → `/resume.pdf` |
| `/sitemap.xml`, `/robots.txt` | Generated at build time |

Redirects live in `vercel.json`. Every other path falls back to `index.html`, and `src/main.jsx` picks the page from `location.pathname`. Links are plain `<a>` tags, so each navigation is a full page load.

### Why redirects rather than proxying the demos under `/jev` and `/nobel`

A Vercel rewrite keeps the URL, but neither demo can run under a path prefix without changes in its own repository:

| Demo | Blocker |
|---|---|
| Jev (`jev-information-extraction`) | Frontend calls absolute `/api/...`. Fixable by setting `window.JEV_API_BASE_URL = '/jev'` in `frontend/config.js`. Large PDF uploads and long batch runs would also go through Vercel's proxy limits. |
| Nobel Atlas (`nobel-atlas`) | Vite `base` is `/`, so `/assets/*`, `/api/laureates` and `/data/world.geojson` are absolute. Its own SEO country routes and canonical URLs assume the site root. |

To switch a demo to a rewrite later: make the app prefix-aware in its own repo, replace the redirect with ordered rewrites for `/slug` and `/slug/:path*`, then check assets, API calls, uploads and hard refreshes on a preview deployment.

## SEO and metadata

`index.html` holds the default `<head>`: title, description, canonical, Open Graph, Twitter card, `Person` + `WebSite` JSON-LD, and a pre-paint theme script. After `vite build`, `scripts/prerender.js` writes `dist/projects/index.html` and `dist/projects/<slug>/index.html` with page-specific title, description, canonical and share image. It also writes `sitemap.xml` and `robots.txt`. The build fails if a tag it rewrites is missing from `index.html`.

Page bodies still render client-side. Framework decision: stay on Vite and prerender metadata. With only a handful of routes, migrating to Next.js isn't worth it. Revisit if case studies need crawlable body text or the page count grows.

## Adding a project

1. Add an entry to `PROJECTS` in `src/data/projects.js`, following the existing fields.
2. Put a 640px-wide WebP screenshot in `public/projects/`. Optionally add a 1200×630 JPG to `public/og/` as `shareImage` for link previews.
3. For a short demo link, add a redirect in `vercel.json` and set `demoUrl` to that path.
4. Run `npm run build` and check `dist/projects/<slug>/index.html` and `dist/sitemap.xml`.

### Content checklist

- [ ] Every claim can be checked in the repository README or the live demo. No invented metrics.
- [ ] Problem, solution, how it works, and key decisions are filled in.
- [ ] `repositoryUrl` and `demoUrl` both open.
- [ ] Screenshot has meaningful `imageAlt`.

Professional (employer) work goes in `WORK_HIGHLIGHTS` with a title only, until details are cleared for publication.

## Accessibility and theme

- Icon-only controls have accessible names. The testimonial dialog has `role="dialog"`, closes on Escape, and returns focus to the card that opened it.
- `prefers-reduced-motion: reduce` stops marquees and animations. Marquee content becomes scrollable, with duplicate items hidden.
- Theme: the saved choice (`localStorage.theme`), otherwise the system preference. It is applied before first paint.

## License

See `LICENSE`.
