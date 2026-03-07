# Abhishek Mamdapure — Portfolio

Bento-grid portfolio built with **React + Vite + Tailwind CSS**.

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
```

Open http://localhost:5173

## Build for Production

```bash
npm run build
```

Output goes into `/dist`.

## Deploy to Vercel

### Option A — Vercel CLI (fastest)
```bash
npm install -g vercel
vercel
```
Follow the prompts. Vercel auto-detects Vite.

### Option B — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to https://vercel.com/new
3. Import your repo
4. Vercel auto-configures everything (vercel.json is already set)
5. Click Deploy

## Custom Domain
1. In Vercel dashboard → your project → Settings → Domains
2. Add your domain (e.g. abhishek.dev)
3. Copy the DNS records Vercel gives you
4. Paste them in your domain registrar (GoDaddy / Namecheap / etc.)
5. SSL is provisioned automatically — free

## Customization Checklist
- [ ] Replace `"AM"` initials in HeroCard with your actual photo (`<img>` tag)
- [ ] Update email in `GetInTouch` mailto link
- [ ] Update Cal.com link in `GetInTouch`
- [ ] Update social links in `SOCIALS` array
- [ ] Add real project screenshots in `PROJECTS` array
- [ ] Add your resume PDF to `/public/resume.pdf` and wire up the Resume button
- [ ] Update `<title>` and meta description in `index.html`
