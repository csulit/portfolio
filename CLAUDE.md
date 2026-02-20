# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio — built with TanStack Start (SSR React framework) deployed on Cloudflare Workers with Cloudflare D1 (SQLite) database.

## Commands

- `bun dev` — Start dev server on port 3000
- `bun run build` — Production build
- `bun run test` — Run tests with Vitest (`vitest run`)
- `bun run deploy` — Build and deploy to Cloudflare Workers
- `bun run db:generate` — Generate Drizzle migrations
- `bun run db:migrate:local` — Apply migrations to local D1
- `bun run db:migrate:remote` — Apply migrations to remote D1
- `bun run cf-typegen` — Generate Cloudflare Worker types

## Architecture

**Framework:** TanStack Start with file-based routing (TanStack Router), React 19, Vite 7

**Routing:** File-based under `src/routes/`. The route tree is auto-generated in `src/routeTree.gen.ts` — do not edit manually. Root layout is in `src/routes/__root.tsx`.

**Path alias:** `@/*` maps to `./src/*` (configured in both tsconfig.json and vite.config.ts via TsConfigPaths plugin).

**Database:** Drizzle ORM with Cloudflare D1 (SQLite). Schema in `src/db/schema.ts`, connection helper in `src/db/index.ts`. Access D1 via `getCloudflareContext()` from `@cloudflare/vite-plugin`.

**Styling:** Tailwind CSS v4 with styles in `src/styles.css`.

**Icons:** lucide-react throughout the codebase.

**Deployment:** Cloudflare Workers via `@cloudflare/vite-plugin`. Config in `wrangler.jsonc`.

## Code Style

- TypeScript strict mode with `noUnusedLocals` and `noUnusedParameters`
- Named exports for components (not default exports)

## React Debugging

This project uses agent-react-devtools to inspect the running React app.

- `agent-react-devtools start` — start the daemon
- `agent-react-devtools status` — check if the app is connected
- `agent-react-devtools get tree` — see the component hierarchy
- `agent-react-devtools get component @c1` — inspect a specific component
- `agent-react-devtools find <Name>` — search for components
- `agent-react-devtools profile start` / `profile stop` / `profile slow` — diagnose render performance
