# This is a bleeding-edge Vite + Vue + three.js stack

This portfolio was migrated off Next.js. It now runs on **Vite 8**, **Vue 3.5** (Composition API, `<script setup>`), **Tailwind v4** (via `@tailwindcss/vite`, no PostCSS config), **TypeScript 6**, **vite-ssg** (static prerender), and **three.js** for the pixelated arcade background.

These are versions ahead of most training data — APIs, conventions, and file structure may differ. Notes that have already bitten:
- TypeScript 6 deprecated `baseUrl`; use `paths` without it.
- `tsc` cannot parse `.vue` — type-check with `vue-tsc --noEmit`.
- lucide ships no brand icons; custom GitHub/LinkedIn/X SVGs live in `src/components/icons/brand.ts`.
- `THREE.Clock` is deprecated; the background uses `performance.now()`.

Read the relevant guide under `node_modules/<pkg>/...` before writing non-trivial code, and **heed deprecation notices** (they're load-bearing here).

## Layout
- `index.html` — entry + meta/OG/JSON-LD
- `src/main.ts` — `ViteSSG(App, …)` registers global directives (`v-reveal`, `v-tilt`, `v-magnetic`, `v-scrub`)
- `src/App.vue` — background + Navbar + sections + Footer + CRT overlay; inits Lenis smooth scroll
- `src/data/*` — all content (presentational components import from here)
- `src/components/{layout,sections,background,icons}`, `src/composables`, `src/directives`, `src/three`
- `api/github.ts` — Vercel serverless function for live GitHub stats

## Commands
- `npm run dev` — Vite dev server
- `npm run build` — `vue-tsc --noEmit && vite-ssg build` (output → `dist/`)
- `npm run preview` — serve the prerendered build
