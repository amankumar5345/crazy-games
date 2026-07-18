# Crazy Games — Browser Games Portal 🎮

A retro-style portal of free browser games — 2048, Dino Runner, Dogeminer,
Bitlife, Bloons, and more — with a built-in Bollywood/Hindi music player to
vibe to while you play. Built with React, Vite, and Tailwind, deployed as
a static site on GitHub Pages.

**Live site:** `https://amankumar5345.github.io/crazy-games/`

---

## What it does

- Browse a categorized library of games (Arcade, Puzzle, Strategy, Idle,
  Action, Simulation) with thumbnails and descriptions.
- Launch a game directly in the browser.
- A dedicated music player page streams Hindi/Bollywood tracks via
  YouTube while you play, with sound effects on the UI itself.

---

## Tech stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS 4, Radix UI
  primitives, Zod (for game category typing), Wouter (routing)
- **Package management:** pnpm workspaces (monorepo) — **npm is
  intentionally blocked** via a `preinstall` script; you must use pnpm
- **Deployment:** GitHub Actions → GitHub Pages (static hosting)

---

## Project structure

This is a pnpm monorepo. The parts relevant to this site:

```
crazy-games/
├── .github/workflows/
│   ├── deploy.yml                  # See "Known issue" below
│   └── deploy-games-portal.yml     # See "Known issue" below
├── artifacts/
│   ├── games-portal/                # ← this app (the live site)
│   │   ├── src/
│   │   │   ├── pages/home.tsx
│   │   │   ├── pages/player.tsx     # Music player page
│   │   │   ├── components/MusicPlayer.tsx
│   │   │   ├── data/games.ts        # Game library (title, category, thumbnail, url)
│   │   │   └── data/music.ts        # Song list (YouTube-based)
│   │   └── vite.config.ts
│   ├── api-server/                  # Express backend, not used by the
│   │                                   deployed static site
│   └── mockup-sandbox/
├── lib/                             # Shared packages (API client, schemas, DB)
├── scripts/
├── pnpm-workspace.yaml
└── package.json
```

> **Note on `api-server`:** this monorepo includes an Express backend,
> but the deployed GitHub Pages site doesn't use it — GitHub Pages only
> serves static files and can't run a Node server. Everything the live
> site needs (game metadata, embedded YouTube IDs) is bundled at build
> time instead.

---

## ⚠️ Known issue: two conflicting deploy workflows

This repo currently has **two separate GitHub Actions workflows** that
both try to deploy `games-portal` to GitHub Pages:

| Workflow | `BASE_PATH` used | Notes |
|---|---|---|
| `deploy.yml` | `/crazy-games/` | Uses pnpm caching, matches the repo name |
| `deploy-games-portal.yml` | `/` | Installs pnpm via npm, no caching |

Since GitHub Pages serves this repo at `/crazy-games/`, a build using
`BASE_PATH=/` will produce broken asset paths (assets requested from the
domain root instead of `/crazy-games/...`). Having both workflows active
means every push to `main` triggers **two competing deployments**, and
whichever finishes last "wins" — which can silently flip the site
between a working and broken state from one push to the next.

**Recommended fix:** delete `deploy-games-portal.yml` and keep only
`deploy.yml`, since it has the correct `BASE_PATH` for this repo along
with proper pnpm dependency caching.

---

## Running locally

```bash
# from the repo root — pnpm is required, npm will be blocked
pnpm install

cd artifacts/games-portal
PORT=5173 pnpm dev
```

`PORT` is a required environment variable — the app throws an error on
startup if it's missing (see `vite.config.ts`). `BASE_PATH` defaults to
`/` if not set, which is fine for local development.

To build a production bundle locally, matching what GitHub Actions runs:

```bash
PORT=3000 BASE_PATH=/crazy-games/ NODE_ENV=production pnpm --filter @workspace/games-portal run build
```

Output goes to `artifacts/games-portal/dist/public`.

---

## Deployment

Deployment is automatic via GitHub Actions on every push to `main` (see
the known issue above regarding duplicate workflows).

**Requirements for this to work:**
- Repo Settings → Pages → Source must be set to **GitHub Actions** (not
  "Deploy from a branch")
- No secrets or API keys are needed — games and music are all
  client-side/embedded content

---

## Adding a new game

Add an entry to `artifacts/games-portal/src/data/games.ts`:

```ts
{
  id: "your-game-id",
  title: "Game Title",
  description: "A short description.",
  category: "Arcade", // one of GameCategorySchema's enum values
  url: "https://...",
  thumbnail: yourImportedThumbnail,
}
```

## Adding a new song

Add an entry to `artifacts/games-portal/src/data/music.ts` with the
song's YouTube video ID.

---
.
