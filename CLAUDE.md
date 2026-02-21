# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio — built with TanStack Start (SSR React framework) deployed on Cloudflare Workers with Cloudflare D1 (SQLite) database.

## Commands

- `bun dev` — Start dev server on port 3000
- `bun run build` — Production build
- `bun run test` — Run tests with Vitest (`vitest run`)
- `bun run test -- src/path/to/file.test.ts` — Run a single test file
- `bun run deploy` — Build and deploy to Cloudflare Workers
- `bun run db:generate` — Generate Drizzle migrations
- `bun run db:migrate:local` — Apply migrations to local D1
- `bun run db:migrate:remote` — Apply migrations to remote D1
- `bun run cf-typegen` — Generate Cloudflare Worker types

## Architecture

**Framework:** TanStack Start with file-based routing (TanStack Router), React 19, Vite 7

**Routing:** File-based under `src/routes/`. The route tree is auto-generated in `src/routeTree.gen.ts` — do not edit manually. Root layout is in `src/routes/__root.tsx`. Router config (scroll restoration, intent-based preloading) is in `src/router.tsx`.

**Root layout pattern:** `__root.tsx` defines the HTML shell (`RootDocument`), global `<head>` meta/links, 404 component, and wraps the app in `<LazyMotion features={domAnimation}>` for optimized framer-motion.

**Path alias:** `@/*` maps to `./src/*` (configured in both tsconfig.json and vite.config.ts via TsConfigPaths plugin).

**Database:** Drizzle ORM with Cloudflare D1 (SQLite). Schema in `src/db/schema.ts`, connection helper `getDb()` in `src/db/index.ts`. Access D1 binding via `getCloudflareContext()` from `@cloudflare/vite-plugin`. After schema changes: run `db:generate` then `db:migrate:local` or `db:migrate:remote`.

**Styling:** Tailwind CSS v4 via `@tailwindcss/vite` — no `tailwind.config` file. Theme (colors, fonts, spacing) is defined inline in `src/styles.css` using `@theme` directive with CSS custom properties.

**Icons:** lucide-react throughout the codebase.

**Deployment:** Cloudflare Workers via `@cloudflare/vite-plugin`. Config in `wrangler.jsonc`.

## Key Patterns

**Animations:** All section components use framer-motion `m.*` elements (not `motion.*`) with `LazyMotion` for tree-shaking. Shared animation presets live in `src/lib/motion.ts`: variant presets (`fadeUp`, `fadeLeft`, `fadeRight`, `fadeIn`, `scaleIn`), `staggerContainer()` for cascading animations, and `useMotionPreference()` hook that returns noop variants when the user prefers reduced motion. Components trigger animations with `whileInView` and `viewport={{ once: true }}`.

**Utilities:** `cn()` in `src/lib/utils.ts` combines `clsx` + `tailwind-merge` for conditional class merging with Tailwind conflict resolution.

**Components:** Flat structure in `src/components/` — all are semantic page sections (Nav, Hero, About, TechStack, Services, Projects, Contact, Footer) composed in route files.

## Code Style

- TypeScript strict mode with `noUnusedLocals` and `noUnusedParameters`
- Named exports for components (not default exports)

## Testing

Vitest with `@testing-library/react` and `jsdom`. Test infrastructure is set up but tests are not yet written.

## React Debugging

This project uses agent-react-devtools to inspect the running React app.

- `agent-react-devtools start` — start the daemon
- `agent-react-devtools status` — check if the app is connected
- `agent-react-devtools get tree` — see the component hierarchy
- `agent-react-devtools get component @c1` — inspect a specific component
- `agent-react-devtools find <Name>` — search for components
- `agent-react-devtools profile start` / `profile stop` / `profile slow` — diagnose render performance
