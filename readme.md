# Driven Fundraising

Public site for [drivenfundraising.com](https://drivenfundraising.com) — Matt Roper's SSG rep page.

## How it works

This is a Vite + React static site deployed to Cloudflare Pages. At runtime it fetches Matt's published rep page content from the SSG API and renders it.

## Build

```bash
pnpm install
pnpm run build
```

Output goes to `dist/` — point Cloudflare Pages here.

## Cloudflare Pages environment variables

| Variable | Value |
|---|---|
| `VITE_REP_SLUG` | `driven` |
| `VITE_SSG_API_URL` | `https://app.schoolsolutionsglobal.com` |

## Deploy hook

Paste your Cloudflare deploy hook URL into SSG → Rep Settings → Workspace → External site. Every time Matt publishes his page, SSG fires the hook and Cloudflare rebuilds this site automatically.
