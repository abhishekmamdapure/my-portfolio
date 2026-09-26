# Developer Plan: Professionalize Abhishek Mamdapure’s Portfolio

## 1. Purpose

Upgrade the existing portfolio at `abhishekmamdapure.com` from a visual one-page portfolio into a credible, recruiter-ready engineering portfolio. It should quickly communicate Abhishek’s strengths in Generative AI and applied AI engineering, make GitHub and selected work prominent, provide useful project case studies, and present independent project demos under memorable URLs where technically supported.

This plan is based on the existing repository review: a React 18 + Vite + Tailwind single-page application, with most UI in `src/App.jsx`, static assets in `public/`, and Vercel configuration. Confirm actual repo state before implementation; this document is the target plan, not a claim that any changes have already been applied.

## 2. Product goals

1. A hiring manager can identify Abhishek’s role, specialties, location, and experience within 10–15 seconds.
2. Featured projects show the problem, solution, architecture, evidence, and links—not just screenshots.
3. GitHub is a prominent professional destination, and each selected project links to its source repository.
4. Every project can have a stable case-study URL; demos can use clean paths on the portfolio domain when routing and asset/API behavior are verified.
5. Improve metadata, accessibility, performance, and maintainability without sacrificing the existing visual identity.
6. Keep each demo in its own repository and deployment unless a project-specific technical limitation requires a different hosting arrangement.

## 3. Recommended information architecture

### Portfolio routes

- `/` — concise portfolio home and featured work.
- `/projects` — all selected projects.
- `/projects/[slug]` — project case study pages.
- `/about` — optional extended profile, if there is enough distinct content.
- `/resume` — serve or redirect to the current PDF resume.
- `/github` — optional redirect to the GitHub profile.

### Demo routes

Examples: `/pdf-inspector`, `/jev`, `/nobel`. Each maps to a separately deployed application where feasible. Use meaningful slugs rather than `/project-1` and `/project-2`.

**Important:** a Vercel rewrite preserves the browser URL, but does not automatically make an application prefix-aware. The demo must correctly handle prefixed routes, static assets, client-side navigation, API requests, cookies, and redirects. Verify this for every app. If it cannot be made reliable, link to a project subdomain or the app’s existing deployment instead of shipping a broken path.

## 4. Target home-page hierarchy and content

Recommended order:

1. **Hero / positioning**
   - Name: Abhishek Mamdapure.
   - Headline: “Generative AI Engineer building production AI systems.” (Final wording to be confirmed against current work and resume.)
   - Supporting line naming concrete work: LLM applications, RAG, document intelligence, AI agents, and applied ML.
   - Pune, India; accurate years of experience; a short stack line.
   - Primary actions: `View projects`, `GitHub`, `Download resume`.
2. **Selected engineering work** — 3–5 strong projects, each with a short outcome-led summary and Case Study / Live Demo / GitHub actions as applicable.
3. **Capabilities** — group tools under AI/ML, backend, and infrastructure. Avoid an unfiltered list of keywords.
4. **Experience** — roles, organizations, dates, and evidence-based impact.
5. **Open source / GitHub** — profile link and a small curated set of repositories. Display stars or activity only if accurate, useful, and maintainable.
6. **Testimonials** — retain, but reduce visual weight relative to projects and experience.
7. **Contact** — clear email and LinkedIn links; optional other profiles if professionally relevant.

Keep travel, languages, and general interests in a compact About section if desired. Remove or de-emphasize content that competes with engineering work.

## 5. Project data and case studies

Create a single project data source, for example `src/data/projects.js` (or equivalent after the routing decision):

```js
{
  slug: "pdf-inspector",
  title: "PDF Inspector",
  summary: "Inspect extracted PDF text and its page coordinates visually.",
  problem: "...",
  solution: "...",
  role: "...",
  architecture: ["Browser UI", "API", "PDF extraction", "Structured output"],
  technologies: ["Python", "PDF", "React"],
  outcomes: ["..."],
  image: "/projects/pdf-inspector.webp",
  imageAlt: "PDF Inspector showing extracted text and bounding boxes",
  repositoryUrl: "https://github.com/OWNER/REPOSITORY",
  demoUrl: "/pdf-inspector",
  externalDemoUrl: "https://...", // fallback where needed
  featured: true
}
```

Only publish facts, metrics, and claims that can be substantiated. For each case study, include:

- Problem and intended user
- What Abhishek personally built
- Solution and key technical decisions
- Compact architecture diagram or clearly described component flow
- Screenshots with meaningful alt text
- Technology choices tied to their purpose
- Results or outcomes (quantified only when verified)
- Trade-offs, lessons, and next steps (optional)
- Repository and live demo links

Do not fabricate project names, repository URLs, impact figures, architecture details, or performance claims. Use an editorial checklist to gather missing facts before the page is marked complete.

## 6. GitHub integration

- Add a visible GitHub CTA in the hero and a GitHub profile link in the site footer/contact area.
- Use the confirmed profile URL: `https://github.com/abhishekmamdapure`.
- Add a GitHub icon with an accessible label; do not rely on the icon alone.
- Add repository links to project cards and case studies.
- Optionally curate 3–5 repositories with title, description, language, and link. Prefer manually maintained data initially for reliability; use GitHub API only if there is a clear need and rate limits/caching are handled.
- Avoid decorative contribution charts or metrics unless they help tell a relevant story.

## 7. Routing and hosting architecture

### 7.1 Portfolio framework decision

The current Vite SPA can remain if the first phase is limited to a small number of client-routed pages and the team implements reliable per-route metadata and prerendering/SSG. However, the target includes case-study routes, unique SEO metadata, structured data, and a sitemap. Before implementation, compare:

- **Recommended for this target:** migrate the portfolio to Next.js App Router for static/server-rendered case studies, metadata, sitemap, and routing.
- **Lower-change option:** retain Vite and add a router plus static prerendering/SSG and explicit metadata generation.

Choose one in a brief technical decision record before building routes. Do not migrate merely for fashion: compare migration effort, existing animation/UI behavior, deployment, and content needs. Keep independent demo apps in their own repos either way.

### 7.2 Demo path routing

For each demo, record:

| Item | Required decision |
|---|---|
| Slug | Stable path such as `/pdf-inspector` |
| Hosting origin | Exact production URL of that app |
| Path-prefix support | Whether the app serves under `/<slug>/` |
| Asset base | Ensure JS/CSS/images use the prefixed base or safe relative URLs |
| Client router | Configure basename/base path and refresh/deep-link fallback |
| API calls | Ensure requests include the prefix or target the correct API origin |
| Cookies/auth | Check Path/SameSite/Secure behavior and collisions with the portfolio |
| Headers/CORS | Confirm embedding/proxying requirements and allowed origins |
| Fallback | External demo URL or project subdomain if path proxying is not compatible |

Use ordered rewrites so `/slug` and `/slug/:path*` reach the child app as intended. Validate both the base path and nested paths with a hard refresh. Do not assume a generic root-to-root rewrite will work for all frameworks. Document whether the upstream needs its prefix stripped or retained. Keep sensitive APIs and secrets server-side.

### 7.3 Deployment ownership

- Portfolio repository owns portfolio pages, project content, metadata, and routing configuration.
- Each demo repository owns its application code and deployment.
- Establish independent preview and production deployments, environment variables, and rollback paths.
- Treat public domain routing as a separate release gate after each child application is verified.

## 8. SEO and sharing

For the home page and every case study:

- Specific title and description that accurately describe the page.
- Canonical URL using the production domain.
- Open Graph title, description, URL, type, and a correctly sized share image.
- Twitter/X card metadata.
- `Person` structured data for Abhishek, including accurate name, URL, job title, and verified `sameAs` profile links.
- `WebSite` structured data for the site. Avoid duplicate/conflicting structured data.
- Sensible robots directives; allow indexing of public portfolio/case-study pages and keep private/admin/preview content out of search.
- Generate and publish `sitemap.xml`; add `robots.txt` that references it.
- Use meaningful page headings and descriptive link text.
- Ensure preview images are actually publicly fetchable and include appropriate dimensions/alt descriptions where relevant.

Validate structured data and metadata in built HTML, not only in browser-side React after hydration. Do not promise ranking improvements; these changes make pages easier for crawlers and link previews to interpret.

## 9. Accessibility and motion

- Add accessible names to icon-only controls (theme toggle, modal close, social links).
- Modal/dialog: `role="dialog"`, `aria-modal="true"`, labelled title, Escape-to-close, focus management, and focus return to trigger. Prefer a native dialog where it fits the current design.
- Meaningful image alt text; decorative images use empty alt text.
- Keyboard-operable navigation and controls, visible focus, semantic landmarks, logical heading order, and adequate color contrast.
- Add `prefers-reduced-motion: reduce` support. Pause or remove continuous marquees and nonessential motion; ensure essential information remains visible without animation.
- Test at mobile widths and with keyboard navigation. Run an automated accessibility scan, then manually check key interactions.

## 10. Performance and visual quality

- Convert the profile photo and large project screenshots to appropriately sized WebP/AVIF where supported; retain sensible fallback formats if needed.
- Generate responsive image sizes; avoid downloading a multi-megabyte portrait for an 80–100 px display.
- Set dimensions/aspect ratios to reduce layout shift; lazy-load below-the-fold images; prioritize only the hero/critical visual.
- Review animation count and avoid motion that distracts from project evidence.
- Use consistent spacing, typography, card boundaries, and CTA hierarchy. Preserve the existing visual style where effective; focus hierarchy on projects and outcomes.
- Set a performance budget and inspect a production build with Lighthouse or equivalent; record baseline and final results rather than asserting targets without measurement.

## 11. Code organization

After choosing the routing/framework approach, split the large `App.jsx` into understandable units. Example (adapt to chosen framework):

```text
src/
  components/       # Hero, ProjectCard, ProjectGrid, Experience, Contact
  data/             # projects, experience, skills, testimonials
  hooks/            # reusable animation/theme behavior when warranted
  pages/ or app/    # route/page components
  lib/              # metadata, links, schema helpers
public/
  projects/         # optimized project images
  og/               # share images
```

Use shared project data to render cards, project pages, sitemap entries, and demo links consistently. Do not split components into files without a clear boundary or reusable purpose.

### Theme

Persist explicit user choice in local storage and apply it before first paint to avoid flashing. If no choice exists, use the system color preference. Keep the control accessible and test both themes. Avoid unsafe DOM manipulation patterns where framework state can own the theme.

## 12. README and repository hygiene

- Replace stale template/customization checklist with the actual project purpose, stack, local setup, build/deploy instructions, route map, and how to add a new project.
- Document required environment variables without committing secrets.
- Add a project-content checklist so contributors do not invent claims or omit source/demo links.
- Keep examples and screenshots aligned with the shipped site.

## 13. Suggested implementation phases

### Phase 0 — Confirm facts and decisions

- Confirm portfolio domain, GitHub profile, resume, current experience wording, social links, and preferred public email.
- Inventory candidate projects and verify each repository/demo URL and permission to show screenshots.
- Collect accurate project descriptions, personal contribution, architecture, and verifiable outcomes.
- Decide Vite-with-SSG versus Next.js using a short decision record.
- Inventory every demo’s framework, hosting, API, asset paths, and path-prefix feasibility.

**Exit criteria:** approved content inventory, framework decision, and demo routing matrix.

### Phase 1 — Content model and visual hierarchy

- Establish project data schema and populate only verified information.
- Redesign home-page hierarchy: focused hero, featured work, grouped capabilities, experience, GitHub/open source, testimonials, contact.
- Promote GitHub in hero and project cards.
- Update copy and remove stale/placeholder README content.

**Exit criteria:** home page communicates specialization quickly; every featured card has verified copy and working links.

### Phase 2 — Routes and case studies

- Implement `/projects`, `/projects/[slug]`, `/resume`, and optional `/about` or `/github` routes.
- Build reusable case-study layout and architecture presentation.
- Add not-found behavior for unknown project slugs.
- Ensure route refresh and direct navigation work in production.

**Exit criteria:** every case-study URL works on direct load and refresh, with page-specific content.

### Phase 3 — Demo integrations

- Add one demo route at a time, starting with the most stable and valuable project.
- Configure rewrite and child base path/client routing/API behavior as required.
- Verify assets, nested paths, refresh, forms/uploads, authentication if any, and error behavior.
- Retain a visible/external fallback link for a demo if the proxy route is unavailable.

**Exit criteria:** all routes pass the per-demo checklist in production preview before domain release.

### Phase 4 — SEO, accessibility, and performance

- Implement page metadata, social previews, structured data, sitemap, and robots file.
- Optimize images and set responsive dimensions.
- Add motion preference support, keyboard interactions, modal focus behavior, and meaningful alt text.
- Run automated checks and targeted manual review.

**Exit criteria:** production HTML has page-specific metadata; sitemap and robots are reachable; key interactions pass accessibility checks; no broken assets or console errors on tested routes.

### Phase 5 — Release and documentation

- Deploy previews and review on desktop/mobile.
- Validate all routes, external links, canonical URLs, share cards, and domain behavior.
- Update README and record deployment/routing ownership.
- Release portfolio and demo paths with an easy rollback plan.

**Exit criteria:** approved production release, working route inventory, and current developer documentation.

## 14. Acceptance checklist

### Product/content
- [ ] Hero identifies Abhishek, role, focus areas, location, and accurate experience.
- [ ] GitHub is visible in the hero and links to the verified profile.
- [ ] Featured projects contain title, outcome-led summary, meaningful image alt, and valid case study/demo/repository links.
- [ ] Case studies distinguish Abhishek’s work from team/project context and do not contain unverified metrics.
- [ ] Projects are prioritized over decorative skills and testimonials.

### Routing/deployment
- [ ] `/`, `/projects`, and every published `/projects/<slug>` work on direct load and refresh.
- [ ] Every published demo path and nested path works, including assets, client navigation, APIs, and form flows.
- [ ] Rewrite fallback or external demo link is documented for each incompatible app.
- [ ] Production and preview deployment behavior is understood; rollback is available.

### SEO
- [ ] Unique title, description, canonical, Open Graph, and Twitter/X metadata on each public page.
- [ ] `Person` and `WebSite` JSON-LD validate and contain only accurate links/details.
- [ ] `sitemap.xml` and `robots.txt` are reachable and consistent with the production domain.
- [ ] Share image renders in a link-preview debugger or equivalent.

### Quality
- [ ] Keyboard navigation, visible focus, labels, contrast, and dialog behavior are checked.
- [ ] Reduced-motion setting leaves all content usable and stops nonessential continuous motion.
- [ ] Images are appropriately sized and no large avoidable image blocks initial load.
- [ ] No broken links, failed assets, or console errors in tested flows.
- [ ] README matches the implementation and explains how to add a project.

## 15. Out of scope unless separately approved

- Rebuilding every demo application inside the portfolio repository.
- Replacing project frameworks or backends solely to enable vanity paths.
- Live GitHub API metrics, contribution widgets, or automated repository syncing.
- Blog/CMS, authentication, analytics expansion, or major visual rebrand.
- Claims of SEO ranking gains or project outcomes that have not been measured.

## 16. Developer handoff notes

Before coding, the developer should return:

1. The framework/routing decision and why it fits this repo.
2. A verified project inventory with slug, repo URL, current demo URL, and path-routing feasibility.
3. Any content facts needed from Abhishek, especially project contribution and measurable outcomes.
4. A sequence of small pull requests matching the phases above, with the first milestone limited to content hierarchy, GitHub CTA, and project data model.

The plan is complete when every acceptance item applicable to the chosen scope is either checked or explicitly deferred with a reason.
