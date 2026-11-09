# CoffeeCounter

Coffee shop analytics SaaS + data engineering portfolio project. Tagline: **Every cup counts!**
Full spec: `docs/coffee-counter-specs.md` (source of truth). Progress: `TASKS.md`.

User-approved changes superseding the original spec (latest, 2026-11-06): `/` is a short marketing homepage in the public layout (solid espresso header + footer), set high on the page (heading 96px below the header on desktop, 64px on mobile; `pt-24`/`pt-16` on the hero container, shared with About) with nothing above the heading (the tally marks were removed from the homepage and About): the catchphrase "Every cup counts!" in the display font, two paragraphs, an "Open dashboard" button (the main product) beside "Explore the demo", a note on what the demo will use, and a tour of the dashboard tools (one full-width outlined card per tool: plain espresso icon, display-font title, description beside it; no lilac badge; anchored by id, e.g. `/#data-imports`). The homepage wording and the tool descriptions in `lib/content.ts` are the author's own, supplied verbatim 2026-11-06: do not rewrite them without asking. While the backend is unbuilt, a temporary full-width caramel bar (`UnderConstructionBanner`, Tabler alert-triangle icon, not an emoji) is pinned at the very top of every dashboard page via `DashboardShell`, above the sidebar and content: "Backend is under construction so the dashboard will be empty for now!" The fixed sidebar starts below it through the `--banner-height` variable. Remove the bar and that variable once real data is connected; the homepage does not carry that message. The receipt section was removed from the homepage. The sample-data demo is NOT connected yet, so the homepage must keep saying so (it describes the planned Kaggle vending-machine dataset, with no made-up numbers); update that copy only when the demo is real. `/dashboard` is the workspace Overview inside the sidebar shell. `/about` is a public page laid out like Explore the demo, Log in, and Get started (container `py-14`, `PageHeader` title with a hairline beneath, then icon-badge `EmptyState` blocks: Sample data, Your own data, Where the idea came from, Find me online, Disclaimer). Its wording is the author's own, supplied verbatim 2026-11-08 (the opening "About" paragraph is the PageHeader intro): do not rewrite it without asking. Find me online links LinkedIn, Email (mailto), and Website https://daniellawright.com/ (also in the footer); the disclaimer says Claude was used as an assistant and credits the fonts and Tabler Icons. About is not in the dashboard sidebar. Do not invent biography. The public header (user request 2026-11-08): signed out it shows Home, About, Explore Demo (always a plain link, so visitors can try the demo before signing up), then Log In / Get Started; the Dashboard link appears ONLY after sign-in, when the person has their own data to explore, and then Log In / Get Started are replaced by an Open Dashboard button and an account menu (`AccountMenu`, currently just Settings; add Log out when real auth exists). The footer follows the same rule. The header marks the current page (user request 2026-11-08): `aria-current="page"` plus a lighter white/10 pill with NO underline (user request 2026-11-08: the caramel bar under the current link was removed; mobile menu: lighter row plus a 3px caramel bar on the left); Log In / Get Started get a lighter pill / lilac fill on their own pages. Matching is `isCurrentPage` in `lib/navigation.ts` (Home only on `/`). Signed-in state comes from `lib/session.ts` `isSignedIn()`, which returns false until accounts are built; the signed-in variants are built and tested but unreachable until then. The hero "Open dashboard" button and the placeholder pages' "Open dashboard" actions still link to `/dashboard`, which is not gated (no auth yet). It links her website https://daniellawright.com/ (also in the footer) and carries the disclaimer that Claude was used as an assistant for the project, plus the font and icon credits. About is not in the dashboard sidebar. Keep the About story to what the author has told us; do not invent biography. Copy style (user request 2026-11-06): plain, casual, conversational, like the author's own messages. Use the bean-with-rising-seam mark (`frontend/public/brand/coffee-counter-logo.svg`, user-requested replacement on 2026-11-04) throughout the app and favicon.

## Non-negotiable rules
- Everything must actually work: no fake data, no hardcoded metrics, no decorative controls that do nothing.
- Never fabricate real-world data, store locations, weather conclusions, forecast intervals, or inventory needs.
- Synthetic data only for tests/dev and always labeled. Demo dataset: Kaggle "Coffee Sales" (Yaroslav Isaienkov) — it is vending-machine data, no location; say so.
- Multi-tenant: every private query scoped by `organization_id`; never leak data between orgs.
- Idempotent imports: re-importing must never duplicate transactions.
- Money as NUMERIC or integer minor units. Timezone-aware timestamps.
- Never commit secrets; use `.env` (template in `.env.example`).
- Do not report tests as passing unless actually run.

## Architecture
Files/APIs -> Python ingestion -> raw storage (local/S3) -> Postgres staging -> dbt (staging/intermediate/marts) -> FastAPI -> Next.js.
Airflow = scheduled batch DAGs. Redis + RQ = interactive upload jobs. Guest uploads isolated + auto-expiring.

```
frontend/   Next.js 15 App Router, TS, Tailwind v4, Recharts, Vitest
backend/    FastAPI, Pydantic, SQLAlchemy, Alembic (migrations/)
pipeline/   ingestion, validation, forecasting, datasets
transforms/ dbt project (staging, intermediate, marts, tests)
airflow/    DAGs
infra/      docker, aws
compose.yaml  Postgres (+ Redis, API, worker later)
```

## Branding (strict)
Palette only (tokens in `frontend/app/globals.css`):
espresso `#33261F` (text, nav, dark bg, icon tiles) · caramel `#C99260` (accents, charts, selected states; espresso text on it) · white `#FFFFFF` (page backgrounds, cards, forms, text on dark surfaces) · `surface` (espresso at 4%, a quiet neutral panel added 2026-11-04). Per the user's 2026-10-29 update, cream is removed entirely from the app theme, and per the 2026-11-08 request purple (lilac `#C4BFDF`) is removed entirely too: the token, the `brand` constant, and every use are gone, and `tests/brand.test.tsx` fails if `lilac` or `#C4BFDF` reappears in `app/`, `components/`, or `lib/`. Do not reintroduce it.
Neutral dividers: espresso at low opacity (`border-line`).

- NO gradients, emojis, shadows, glow, glassmorphism, or hover movement. Motion is allowed only as the subtle set below (user request 2026-11-08). Outlines (user request 2026-11-04): containers on the white page (cards, status rows) use a 1px espresso outline (`border-espresso`) on white; internal dividers stay `border-line`. Never caramel borders. The public header is a solid espresso bar with white text, not an outline (user preference 2026-11-06). Motion (user request 2026-11-08, replacing the earlier "nothing animates" rule), all defined in `globals.css`: links and buttons fade color changes over 160ms; each public and dashboard page eases in (opacity plus an 8px rise, 420ms) through `template.tsx` route templates (`.animate-enter`); menus pop in (160ms, 4px: header mobile menu, account menu, sidebar mobile menu; `.animate-pop`); buttons shrink to 0.98 while pressed; homepage tool cards and About sections fade up (16px) as they scroll into view via CSS scroll-driven animation (`.reveal`, wrapped in `@supports (animation-timeline: view())`, so they are simply visible where unsupported). Homepage-only hover lift (user request 2026-11-08): the hero buttons and tool cards rise 2px on hover (`.hover-lift`), and each tool card fades in a small right arrow; both are off for reduced motion. Otherwise only opacity, small translations, and color: no shadows, glows, gradients, or hover movement elsewhere. Everything is switched off under `prefers-reduced-motion` (`tests/motion.test.tsx` checks this). Keep new motion in this style.
- Minimalist (user request 2026-11-03): few elements, generous whitespace, no status bars or decorative sections, no decorative controls (no search box, notification bell, or invented business name/avatar; do not copy those from reference designs). Layout (user requests 2026-11-04, modeled on the user's own mockup): a permanent 248px espresso sidebar: logo + wordmark, groups Analyze/Data/Workspace in small mono capitals (`font-mono`, user-approved here) separated by white/12 hairlines, edge-to-edge rows, current page = slightly lighter row + 3px caramel bar, plain "Account" link at the foot. The Workspace group holds only Settings (About moved to the public site). It never collapses on desktop and does not animate there; on mobile it becomes a top bar with a menu toggle. Content sits in its own column beside it. No top header; every page opens with `PageHeader`. Overview metrics are separate outlined `Card`s with an espresso icon tile.
- Visible non-decorative focus outlines; respect `prefers-reduced-motion`.
- Fonts (user updates 2026-11-03, replacing Coffee/Comfortaa, then Hanken Grotesk): Young Serif (`font-display`, headings and wordmark; single 400 weight, so never add `font-semibold` to it), Schibsted Grotesk (`font-sans`, body and interface; has true tabular figures), and Spline Sans Mono (`font-mono`, small uppercase labels only: sidebar group labels and the homepage/About section labels) via `next/font/google` in `app/layout.tsx`. The user's original Coffee/Comfortaa files remain in `fonts/` but are unused. Tabular numerals (`tabular-nums`) for money.
- Icons (user update 2026-11-04, replacing Humbleicons): Tabler Icons (MIT, Paweł Kuna), 2px outline strokes that inherit `currentColor` (white on the espresso sidebar and footer, espresso on white; the sidebar draws them at 1.6px), via `frontend/components/icons/Icons.tsx`. `components/icons/icon-paths.ts` is generated by `npm run icons` (edit the list in `scripts/generate-icons.mjs`); keep `TABLER-LICENSE.txt` and the credit on the About page. On white, place icons on a solid espresso rounded-square tile with a white icon (`components/ui/IconTile.tsx`, used by `EmptyState` and the Overview metric cards; user request 2026-11-08, replacing the lilac circular badges). Lilac is no longer used for icons.
- Receipt pattern (`components/ui/Receipt.tsx`): a printed-receipt primitive (torn edges, mono lines with dot leaders, `paper="white|caramel"`, `ReceiptTotal`) that is currently UNUSED: the homepage and About no longer use receipts (user request 2026-11-06). Keep it for possible reuse; do not delete without asking. Every page opens with `PageHeader` (dashboard) or the tally marks + display title (homepage, About). The menu toggle shows menu/close icons with accessible open/close labels.
- Logo: `frontend/components/brand/Logo.tsx` uses `frontend/public/brand/coffee-counter-logo.svg` (caramel bean with a transparent seam shaped like a rising line); `frontend/app/icon.svg` is the same file, used as the favicon. The user's earlier PNG logo remains in `images/` but is unused.
- Friendly non-technical copy for owners; technical detail only on Pipelines page / expandable sections.
- No invented testimonials, customer counts, logos, or performance claims.

## Frontend conventions
- Tailwind v4: tokens live in `@theme` in `globals.css` (no tailwind.config). Use `bg-espresso`, `text-muted`, `border-line`, `font-display`, etc. Shadow utilities are disabled.
- Path alias `@/` = `frontend/`. Copy/config in `lib/` (`content.ts`, `navigation.ts`, `brand.ts`); UI primitives in `components/ui/`; feature components by area (`marketing/`, `dashboard/`).
- Use `Button`/`ButtonLink`, `Card`/`MetricCard`, `EmptyState`, `Container`/`SectionHeading` rather than restyling.
- Placeholders for unbuilt features: honest `EmptyState` copy, never fake numbers.

## Environment
Windows 11, Node 24, npm 11, Docker 29. Python NOT installed yet (needed from M2).

## Commands
(`compose.yaml` and `npm test` are now configured. Copy `.env.example` to `.env` and set a local password first. Use `npm.cmd` / `npx.cmd` if PowerShell blocks script execution. See TASKS.md for verification and remaining milestones.)
```
docker compose up -d db          # Postgres
cd frontend && npm run dev       # http://localhost:3000
cd frontend && npm test          # Vitest
cd frontend && npm run lint && npm run build
```
