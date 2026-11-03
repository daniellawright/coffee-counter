# CoffeeCounter Tasks

Status: **Milestone 1 complete (2026-10-28)**. Next: **Milestone 2 — Real Dataset and Analytics**. Spec: `docs/coffee-counter-specs.md` §26.

Repository review: M1 was partially complete at handoff; M2–M10 had no implementation beyond empty directories. M1 is now implemented and checked as described below. M2–M10 remain not started.

## Humbleicons, Schibsted Grotesk, receipt About page (2026-11-03)
- [x] Icons: replaced Doodle Icons with Humbleicons by Jiří Zralý (MIT), per the user's request for a set made by a real individual designer. Generator now writes `components/icons/icon-paths.ts`; license in `HUMBLEICONS-LICENSE.txt`; credit on the About page.
- [x] Body font: Hanken Grotesk → Schibsted Grotesk (verified tabular figures in-browser; Commissioner, Gantari, and Wix Madefor were rejected for proportional digits). Added Spline Sans Mono as `font-mono` for the receipt only.
- [x] About page rebuilt: short intro + "Open dashboard" on the left; a printed receipt on the right (`components/ui/Receipt.tsx`) listing planned tools as "Brewing*" with modifier notes, the five import steps (`#how-it-works`), "Business data connected: None", "Made-up numbers: 0", and an explanatory footnote. Removed unused `steps`/`benefits` content from the old marketing page.
- Verification: **29 tests passed** (About test now checks every receipt item, the Brewing footnote, and the import steps); lint and production build passed. Visually checked via headless Edge at 1440px (About, hovered rail) and 390px (About).

## Minimalist redesign: fonts, doodle icons, icon rail (2026-11-03, supersedes the overview redesign below)
- [x] Fonts: replaced Coffee/Comfortaa with Young Serif (headings) and Hanken Grotesk (interface, tabular numerals) via `next/font/google`. Removed the bundled copies in `frontend/app/fonts/`; originals in `fonts/` untouched.
- [x] Icons: replaced the PNG set with white, hand-drawn Doodle Icons (MIT, Nicole Tang). Only the 12 used icons are generated into `components/icons/doodle.ts` by `npm run icons`; license kept beside them. Removed `frontend/public/icons/`; originals in `images/` untouched. Icons on white sit in espresso badges; About feature cards no longer use icons.
- [x] Sidebar: icon-only 72px rail on desktop that widens over the content on hover or keyboard focus to show labels (instant, no animation). Groups separated by hairlines; selected item marked with a lilac bar and lilac label; Account at the foot. Mobile keeps the top bar and menu/close toggle.
- [x] Overview reduced to a heading, one sentence, the four headline figures ("—" until real data), and one status line with a working link. Removed the top status header, the espresso board, the readiness list, and the planned-views list. Feature placeholders restyled to match.
- Verification: **29 tests passed**; lint and production build passed (fonts downloaded at build time). Visually checked with headless Edge over DevTools at 1440px (collapsed and hovered rail, Overview and Sales) and at a 390px mobile viewport.

## Overview redesign (2026-11-03)
- [x] Replaced the single centered empty state at `/` with an editorial layout: asymmetric 12-column grid, hairline rules instead of boxed cards, display-font hierarchy.
- [x] Added `components/dashboard/CounterBoard.tsx`: the four spec KPIs on an espresso "menu board" with dot leaders. Values are `null` → "—" with screen-reader "No data yet"; ready to receive real figures in M2.
- [x] Added a "Before the first cup is counted" readiness list (sales history, store location, forecast history, recipes) with honest statuses and working links, plus a "Coming to this page" index of the spec's planned overview views. Copy lives in `lib/content.ts`.
- [x] Header is now a status strip (business, sales data, last updated: never). Sidebar navigation is grouped (Insights / Data / Workspace) with the tagline at the foot. Removed the unused overview placeholder.
- Verification: **29 tests passed** (one fewer because the overview placeholder case was removed; new assertions cover the board and readiness links); lint and production build passed. Visually checked via headless Edge screenshots at 1440px and a 390px iframe.

## User-supplied icons (2026-11-03)
- [x] Confirmed the user's final logo choice is `images/coffee-counter-logo.png`; the app logo and favicon match it exactly. The generated `coffee-counter-logo-v2.png` concept is not used by the app.
- [x] Replaced generated doodle SVGs with the supplied PNG assets through `components/icons/Icons.tsx` across sidebar navigation, About features, account/menu controls, and empty states.
- [x] Copied the 14 icon assets unchanged into `frontend/public/icons/`; kept original colors, accessible labels, decorative image semantics, and existing sizing.
- [x] Synced the updated coffee-bean logo in `images/coffee-counter-logo.png` to the public brand asset and favicon.
- [x] Menu toggles use the supplied menu image in both states while preserving open/close labels, expanded state, and keyboard handling. Public empty states now use relevant demo, upload, and account images.
- Verification: **30 existing tests passed**; production build passed including lint and TypeScript. All 14 icon copies, logo, and favicon match their source files by SHA-256. No generated SVGs or old icon imports remain in the frontend components. Browser visual verification was not performed.

## User-requested fonts and white theme (2026-10-29)
- [x] Replaced Google Fonts with the supplied local Comfortaa body/interface font and Coffee accent/wordmark font using `next/font/local`.
- [x] Preserved the originals in `fonts/`; added unchanged copies in `frontend/app/fonts/` for bundling within the frontend root.
- [x] Removed the cream theme token and palette entry; replaced every cream surface, text, divider, hover, and focus reference with white.
- [x] Updated README and CLAUDE.md with the new branding decisions, superseding the original specification.
- Verification: **30 existing tests passed**; production build passed, including lint and TypeScript checks, with no Google Fonts access. Source scan found no remaining cream or old font references in app code. Bundled font copies match the originals by SHA-256. Browser visual verification was not performed.

## User-requested navigation and branding changes (2026-10-28)
- [x] Removed the marketing homepage and dashboard-preview component. `/` now renders the overview inside the shared dashboard shell.
- [x] `/dashboard` permanently redirects to `/`; existing feature routes are preserved. Overview links now point to `/`.
- [x] Added `/about` and an About CoffeeCounter sidebar entry with a concise explanation, current availability, planned tools, and import workflow.
- [x] Updated public navigation, footer, and empty-state links so nothing points to the removed homepage sections.
- [x] Replaced the generated SVG mark everywhere with the original transparent `images/coffee-counter-logo.png`, including the favicon. Public logo and favicon copies have matching SHA-256 hashes; the original is unchanged.
- [x] Added sidebar overflow scrolling for the extra navigation item and closed the mobile menu when following the logo home.
- [x] Updated README and CLAUDE.md to record these user decisions, which supersede the original marketing-homepage and generated-logo requirements.
- Verification: **30 tests passed** across five files; production build passed including lint and TypeScript checks. HTTP checks passed for all 13 content pages, `/dashboard` returning a 308 redirect to `/`, About anchors, favicon, original logo, and Next.js optimized logo. Browser visual verification was not performed.

## Milestone 1: Project Foundation and Branding

### Done
- [x] Repo structure (`backend/`, `pipeline/`, `transforms/`, `airflow/`, `infra/`, `tests/`, `docs/`, `.github/workflows/`; empty dirs hold `.gitkeep`)
- [x] Next.js 15.5 + React 19 + TS + Tailwind v4 scaffold in `frontend/` (deps installed; Vitest, Testing Library, jsdom installed as dev deps)
- [x] Brand palette tokens and global rules in `frontend/app/globals.css` (shadow utilities disabled, focus outline, reduced motion)
- [x] Fonts: Fraunces + DM Sans via `next/font/google` in `frontend/app/layout.tsx`
- [x] Doodle icon set: `frontend/components/icons/DoodleIcons.tsx`
- [x] Logo: `components/brand/Logo.tsx` (`LogoMark`, `Logo`), static SVGs in `public/brand/` (horizontal light/dark, mark light/dark, app icon), favicon `app/icon.svg`
- [x] UI components: `components/ui/{Button,Card,EmptyState,Section}.tsx`
- [x] Content/config: `lib/brand.ts`, `lib/navigation.ts` (marketing + dashboard nav, `isActive`), `lib/content.ts` (steps, features, benefits, import steps)
- [x] Marketing: `components/marketing/SiteHeader.tsx` (responsive, mobile menu), `SiteFooter.tsx`
- [x] `npx tsc --noEmit` and `npm run lint` pass (as of pause)

### Completed in this continuation
1. [x] `components/marketing/DashboardPreview.tsx`: explicitly labeled dashboard layout preview with no invented figures or chart data.
2. [x] Landing page with the specified hero, calls to action, How It Works, seven features, dashboard preview, benefits, import workflow, final CTA, and footer. Planned functionality is labeled as in development.
3. [x] Dashboard shell with espresso sidebar, lilac active navigation, mobile toggle, Escape handling, header, account link, and honest business/data freshness status.
4. [x] `/dashboard` and `/dashboard/{sales,weather,forecast,inventory,imports,pipelines,settings}` with shared, feature-specific empty states and page metadata.
5. [x] `/demo`, `/upload`, `/login`, `/register` with a shared public layout and honest empty states; no fake upload or authentication forms.
6. [x] PostgreSQL 17 Compose service with persistent volume, healthcheck, localhost port binding, UTC initialization, `.env.example`, and root `.gitignore`.
7. [x] Vitest/jsdom configuration and 25 tests covering active navigation, logo accessibility, mobile menus, Escape/focus behavior, landing sections, and all placeholder states. Aligned `@vitejs/plugin-react` 4.7 with Vitest 3.2.7 / Vite 7.3.7.
8. [x] Root README with setup, test/build commands, architecture status, and limitations.
9. [x] Production build, tests, lint, TypeScript, Compose validation, and HTTP checks completed. Pinned Turbopack's root to the frontend directory to avoid unrelated parent lockfiles.
10. [x] Skip-to-content link and visible keyboard focus on dark surfaces; fixed mobile registration link leaving the menu open.

### Verification (2026-10-28)
- `npm.cmd test`: **25 passed** in five files. jsdom reports its expected lack of full-document navigation; real route responses were checked separately.
- `npm.cmd run lint`: passed.
- `npx.cmd tsc --noEmit`: passed; production build also completed lint/type checks.
- `npm.cmd run build`: passed; all 13 application pages generated successfully.
- `docker compose --env-file .env.example config --quiet`: passed. Sandbox emitted Docker config access warnings; no private credentials were used.
- Production server smoke check: all 13 application routes returned **HTTP 200** and contained the main content landmark.
- Browser visual checks and PostgreSQL container startup were **not** performed. Docker's daemon was unavailable; Compose syntax is verified, database runtime is not.
- Tests needed execution outside the Windows sandbox for esbuild path resolution. Build needed network access for the existing Google Fonts integration. PowerShell requires `npm.cmd` / `npx.cmd` here because `.ps1` execution is disabled.

## Next: Milestone 2 — Real Dataset and Analytics (not started)
- [ ] Provide Python 3.12+ and a running PostgreSQL service.
- [ ] Inspect the real Kaggle dataset, license, fields, date range, and privacy limitations; document a manual-file ingestion path if needed.
- [ ] Add FastAPI/SQLAlchemy/Alembic foundation and tenant-aware schema with precise money and timestamp handling.
- [ ] Implement validated, idempotent ingestion and initial SQL analytics with reconciliation tests.
- [ ] Connect `/demo` to actual database-backed revenue, transaction, trend, and product analytics, with source attribution and functional filters.

## Later milestones (not started)
- M3 User data import (FastAPI, CSV/XLSX, mapping, validation, dedupe, RQ worker, guest uploads)
- M4 Accounts + multi-tenancy
- M5 dbt + Airflow + pipeline monitor
- M6 Weather (Open-Meteo)
- M7 Forecasting
- M8 Inventory planning
- M9 Deployment + polish
- M10 Optional advanced

## Blockers / notes
- **Python is not installed** (Windows Store alias only). Needed from M2 onward. Install Python 3.12+ before backend work.
- Node 24.13.1, npm 11.8.0, Docker 29.6.1 available.
- `fonts/` contains the active user-supplied Coffee and Comfortaa originals. Runtime copies live in `frontend/app/fonts/`; no Google Fonts integration remains.
- Spec file is `docs/coffee-counter-specs.md` (not `COFFEECOUNTER_SPEC.md`).
- `AGENTS.md` was not found in this repository or its immediate parent. Followed `CLAUDE.md` and the product specification.
- Dependency follow-up: `npm audit` reports five advisories in the existing Vitest/tinypool/mocker and Next/PostCSS dependency chains (two critical, one high, two moderate). No forced major upgrades were applied during M1. Review compatible remediation before exposing development tooling or deployment.
- Git: on `master`, nothing committed yet.
