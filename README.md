# CaseOS — GitHub for Business Thinkers

AI-powered business case study platform. Solve real Indian company problems, get Socratic AI mentor feedback, build a public profile visible to VCs and companies.

## Quick Deploy to Cloudflare

### Windows
Double-click `deploy.bat`

### Mac / Linux
```bash
chmod +x deploy.sh
./deploy.sh
```

## Manual Deploy Steps

```bash
npm install
npm run build
npx wrangler pages deploy dist --project-name=caseos
```

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Demo Account
- Email: demo@caseos.in
- Password: caseos123

## Tech Stack
- React 18 + Vite
- Claude AI API (Socratic mentor)
- localStorage (user data persistence)
- Cloudflare Pages (hosting)
