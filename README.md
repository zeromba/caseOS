# CaseOS — GitHub for Business Thinkers

AI-powered business case study platform. Solve real Indian company problems, get Socratic AI mentor feedback, build a scorecard-based profile.

## What's in this project

- `src/App.jsx` — the entire app (auth, case library, AI mentor chat, scorecards, "add your own case")
- `functions/api/claude.js` — a Cloudflare Pages Function that proxies chat requests to the Anthropic API. **Your API key lives here, server-side, never in the browser.**
- Data persistence uses browser `localStorage`/`sessionStorage` — fine for a demo/MVP, but it's per-browser only (no real backend/database yet — see "Known limitations" below).

## 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — CaseOS MVP"
git branch -M main
git remote add origin https://github.com/<your-username>/caseos.git
git push -u origin main
```

## 2. Get an Anthropic API key

Create one at [console.anthropic.com](https://console.anthropic.com/settings/keys) if you don't already have one. This key is what pays for and authenticates every AI mentor message — keep it secret, never commit it to git (`.gitignore` already excludes `.env` files).

## 3. Deploy to Cloudflare Pages

**Option A — Connect GitHub in the Cloudflare dashboard (recommended):**
1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git
2. Select your `caseos` repo
3. Build settings: **Build command** `npm run build`, **Build output directory** `dist`
4. Deploy. Then go to your project → Settings → Environment variables → add a **secret**: `ANTHROPIC_API_KEY` = your key
5. Redeploy (env vars only apply to new deployments) — go to Deployments → click "Retry deployment" on the latest one, or push a new commit

**Option B — CLI (wrangler):**
```bash
npm install
npm run build
npx wrangler login
npx wrangler pages deploy dist --project-name=caseos
npx wrangler pages secret put ANTHROPIC_API_KEY --project-name=caseos
```
Paste your key when prompted, then redeploy so the function picks it up:
```bash
npx wrangler pages deploy dist --project-name=caseos
```

Your site will be live at `https://caseos.pages.dev` (or your custom domain if you add one).

## Local development

```bash
npm install
npx wrangler pages dev -- npm run dev
```
Use `wrangler pages dev` (not plain `vite dev`) locally so `/api/claude` actually resolves to the Function — plain `npm run dev` will 404 on that route since Vite alone doesn't run Pages Functions. You'll need a local `.env` or `wrangler pages dev` `--binding` flag with your `ANTHROPIC_API_KEY` for local AI calls to work — see [Cloudflare's docs on Pages Functions bindings](https://developers.cloudflare.com/pages/functions/bindings/).

## Demo account
- Email: demo@caseos.in
- Password: caseos123

(This account self-provisions on first login attempt — no manual setup needed.)

## Tech stack
- React 18 + Vite
- Claude API (`claude-sonnet-4-6`) via a Cloudflare Pages Function proxy — Socratic AI mentor
- Browser `localStorage`/`sessionStorage` for persistence (per-device demo storage, not a shared database)
- Cloudflare Pages (hosting + serverless functions)

## Known limitations (worth knowing before you show this to anyone else)
- **No real backend/database.** User accounts and progress live in each visitor's own browser storage — nobody's data is visible to you, to a startup reviewing candidates, or across devices. Fine for solo testing, not fine for the multi-user marketplace you're building toward.
- **No real authentication.** Passwords are stored as plain text in browser storage. Do not reuse this login pattern once real users are involved.
- **No rate limiting on `/api/claude`.** Anyone who finds your deployed URL can rack up API costs by hitting the chat endpoint directly. Worth adding basic rate limiting (Cloudflare has built-in rate limiting rules) before sharing the link widely.
- These are all expected for an MVP demo — just flagging them so they don't surprise you later.
