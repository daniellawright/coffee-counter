# CoffeeCounter

Coffee shop analytics SaaS + data engineering portfolio project. Tagline: **Every cup counts.**
Full spec: `docs/coffee-counter-specs.md` (source of truth). Progress: `TASKS.md`.

User-approved changes superseding the original spec (latest, 2026-11-04): `/` is a short marketing homepage in the public layout (header + footer): the catchphrase "Every cup counts." in the display font, a problem-then-benefit description, an "Open dashboard" button (the main product) beside "Explore the demo", a "Try it with sample data" note, and a dark espresso panel holding two tilted receipts that slide up one after the other. The sample-data demo is NOT connected yet, so the homepage must keep saying so (it describes the planned Kaggle vending-machine dataset, with no made-up numbers); update that copy only when the demo is real. `/dashboard` is the workspace Overview inside the sidebar shell (the earlier "`/` is the dashboard, `/dashboard` redirects" decision is reversed). `/about` (titled and labeled just "About") is in the sidebar and carries a disclaimer that Claude was used as an assistant for the project. Use the bean-with-rising-seam mark (`frontend/public/brand/coffee-counter-logo.svg`, user-requested replacement on 2026-11-04) throughout the app and favicon.

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
espresso `#33261F` (text, nav, dark bg) · caramel `#C99260` (accents) · lilac `#C4BFDF` (interactive/selected/charts; espresso text on it) · white `#FFFFFF` (page backgrounds, cards, forms, text on dark surfaces) · `surface` (espresso at 4%, a quiet neutral panel added 2026-11-04). Per the user's 2026-10-29 update, cream is removed entirely from the app theme.
Neutral dividers: espresso at low opacity (`border-line`).

- NO gradients, emojis, shadows, glow, glassmorphism, hover motion (color change only, instant). Outlines (user request 2026-11-04): containers on the white page (cards, receipt panel, public header) use a 1px espresso outline (`border-espresso`) on white; internal dividers stay `border-line`. Never caramel/lilac borders. Exception (user request 2026-11-04): on the homepage only, the two receipts slide up from below once, staggered (second starts after the first lands), triggered when they scroll into view (`Reveal`, `.receipt-rise` in `globals.css`); `prefers-reduced-motion` shows them still.
- Minimalist (user request 2026-11-03): few elements, generous whitespace, no status bars or decorative sections, no decorative controls (no search box, notification bell, or invented business name/avatar; do not copy those from reference designs). Layout (user requests 2026-11-04, modeled on the user's own mockup): a permanent 248px espresso sidebar: logo + wordmark, groups Analyze/Data/Workspace in small mono capitals (`font-mono`, user-approved here) separated by white/12 hairlines, edge-to-edge rows, current page = slightly lighter row + 3px caramel bar, plain "Account" link at the foot. It never collapses on desktop and nothing animates; on mobile it becomes a top bar with a menu toggle. Content sits in its own column beside it. No top header; every page opens with `PageHeader`. Overview metrics are separate outlined `Card`s with a lilac icon badge.
- Visible non-decorative focus outlines; respect `prefers-reduced-motion`.
- Fonts (user updates 2026-11-03, replacing Coffee/Comfortaa, then Hanken Grotesk): Young Serif (`font-display`, headings and wordmark; single 400 weight, so never add `font-semibold` to it), Schibsted Grotesk (`font-sans`, body and interface; has true tabular figures), and Spline Sans Mono (`font-mono`, receipt surfaces only) via `next/font/google` in `app/layout.tsx`. The user's original Coffee/Comfortaa files remain in `fonts/` but are unused. Tabular numerals (`tabular-nums`) for money.
- Icons (user update 2026-11-04, replacing Humbleicons): Tabler Icons (MIT, Paweł Kuna), 2px outline strokes that inherit `currentColor` (white on the espresso sidebar and footer, espresso on white; the sidebar draws them at 1.6px), via `frontend/components/icons/Icons.tsx`. `components/icons/icon-paths.ts` is generated by `npm run icons` (edit the list in `scripts/generate-icons.mjs`); keep `TABLER-LICENSE.txt` and the credit on the About page. On white, place icons in a lilac badge with espresso strokes (`EmptyState`).
- Receipt pattern (`components/ui/Receipt.tsx`): the About page is a printed receipt (white paper with torn edges on a `bg-surface` panel, mono lines with dot leaders, "Brewing" = in development). Keep it sparse: header, planned tools, import steps, one footnote. The homepage reuses it for two tilted receipts on an espresso panel (`components/marketing/HomeReceipts.tsx`): a white "Without counting" receipt (guesswork lines, "Cups counted: none") and a lilac `paper="lilac"` "With CoffeeCounter" receipt (the same questions, marked Brewing). Copy lives in `lib/content.ts`; no figures. Reuse it for summary-style content rather than inventing new containers. Every page opens with `PageHeader`. The menu toggle shows menu/close icons with accessible open/close labels.
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
