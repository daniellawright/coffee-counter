# CoffeeCounter Tasks

Status: **Milestone 1 complete (2026-10-28)**. Next: **Milestone 2 — Real Dataset and Analytics**. Spec: `docs/coffee-counter-specs.md` §26.

Repository review: M1 was partially complete at handoff; M2–M10 had no implementation beyond empty directories. M1 is now implemented and checked as described below. M2–M10 remain not started.

## Homepage hover animation (2026-11-08)
- [x] Hero buttons (Open dashboard, Explore the demo) and the eight tool cards rise 2px on hover (`.hover-lift`, 200ms), and each tool card also fades a small arrow in on the right (hover or keyboard focus) as a "this is clickable" cue; cards reserve room on the right so text never runs under it. Nothing else lifts. Reduced motion: no lift, and the arrow simply appears.
- [x] Fix: Tailwind v4 uses the separate `translate` and `scale` properties, so the global link/button transition list now includes them (the button press scale from the previous change would otherwise have snapped).
- Verification: lint, `tsc --noEmit`, **65 tests**, production build; headless Edge with a real mouse hover: card translate 0 to -2px (settled, mid-transition at 120ms), tint and arrow fade in, button -2px; with reduced motion emulated, no translate.

## Subtle animations (2026-11-08)
- [x] Added a small, calm motion system in `globals.css` (this overrides the earlier "nothing animates" rule): 160ms color fades on every link and button; page ease-in (opacity plus 8px rise, 420ms) on each navigation via `app/(public)/template.tsx` and `app/dashboard/template.tsx`; soft pop (160ms, 4px) for the header mobile menu, the account menu, and the sidebar mobile menu; a 0.98 press scale on buttons; homepage tool cards and About sections fade up as they scroll into view using CSS scroll-driven animation (`.reveal`, progressive enhancement: visible without it). Tour cards also fade their hover fill.
- [x] Reduced motion: the existing global rule shortens all durations, and `.animate-enter`, `.animate-pop`, and `.reveal` are switched off outright.
- Verification: lint, `tsc --noEmit`, **64 tests** (new `tests/motion.test.tsx`), production build; headless Edge checked the real behavior: page enter runs (opacity 0 to 1, 8px to 0), link transition 0.16s, an offscreen card is at opacity 0 until scrolled in then 1, and with reduced motion emulated every animation is off and content is visible immediately. I did not watch it by eye; the timing and feel are worth a look in your own browser.

## Purple removed everywhere; About intro under its own subtitle (2026-11-08)
- [x] About: the hairline now sits directly under the "About" title (like Log in and Get started). The opening paragraph moved, wording unchanged, into its own first block under a new subtitle, "What is CoffeeCounter?", with an icon tile like the other sections.
- [x] Purple (lilac) is gone from the whole app, replaced with caramel: the secondary button variant (caramel fill, espresso text), the Get Started selected state on /register, the footer link hover, and the unused Receipt's second paper (`paper="caramel"`). The `--color-lilac` token and the `brand.lilac` constant were deleted. Charts and selected states use caramel and espresso from now on. `tests/brand.test.tsx` scans `app/`, `components/`, and `lib/` and fails if lilac or #C4BFDF returns; the built CSS has zero matches.
- Verification: lint, `tsc --noEmit`, **58 tests**, production build; headless Edge at 1440px (About, Get started).

## Icon tiles replace the purple badges (2026-11-08)
- [x] The lilac circular icon badges are gone. New `components/ui/IconTile.tsx`: a solid espresso rounded square (44px, or 36px on the Overview metric cards) with a white icon, the same pairing as the sidebar and primary buttons, decorative (aria-hidden). Used by `EmptyState` (About sections, Explore the demo, Log in, Get started, dashboard placeholders) and `Overview`. The homepage tour keeps its plain icons beside the titles. Lilac remains only as a token (secondary button, the Get Started selected state, the footer link hover, the unused Receipt).
- Verification: lint, `tsc --noEmit`, **57 tests**, production build; headless Edge at 1440px (About, Overview).

## Current page marked in the header (2026-11-08)
- [x] The public header shows which page you are on: the current link gets `aria-current="page"`, a lighter white/10 pill, and white text. (A 3px caramel bar under the link was first added, then removed at the user's request the same day; no underline remains on desktop.) The mobile menu uses the lighter row plus a left caramel bar. Log In and Get Started also mark themselves on /login and /register (lighter pill, lilac fill). `ButtonLink` now accepts `aria-current`; `isCurrentPage()` does the matching (Home only on `/`, other links on their page and anything beneath).
- Verification: lint, `tsc --noEmit`, **57 tests**, production build; headless Edge at 1440px (Home, About, Demo, Log In: bar is 3px caramel and ends at the header's bottom edge) and 390px (open menu).

## Header and footer by sign-in state (2026-11-08)
- [x] Signed out (the only state today): header links Home, About, Explore Demo; Log In and Get Started on the right. The Dashboard link no longer shows. Explore Demo stays a regular link to /demo.
- [x] Signed in (built and tested, not reachable yet): Dashboard joins the links right after Home; Log In / Get Started become an Open Dashboard button and an account menu (`components/marketing/AccountMenu.tsx`: Escape, outside click, and choosing a link close it; lists Settings only). Mobile menu shows Dashboard, Settings, and an Open Dashboard button. Footer: Dashboard only when signed in, Log In / Get Started only when signed out.
- [x] `lib/session.ts` `isSignedIn()` returns false because there are no accounts yet; `(public)/layout.tsx` passes it to the header and footer. Navigation data: `marketingNav` items have `signedInOnly`, and `marketingLinks(signedIn)` filters them. New `[data-light-surface]` focus rule so the white account panel keeps a dark focus outline inside the dark header.
- Open follow-ups: wire `isSignedIn()` to real auth; add Log out to the account menu; decide whether the hero and placeholder "Open dashboard" buttons, and /dashboard itself, should require sign-in (nothing is gated yet).
- Verification: lint, `tsc --noEmit`, **43 tests**, production build; headless Edge at 1440px and 390px for the signed-out header (real build) and the signed-in header with the account menu open (temporarily forced, then reverted).

## About matched to the demo/login pages, author's text (2026-11-08)
- [x] About now follows the Explore the demo / Log in / Get started layout: `Container py-14`, `PageHeader` (left-aligned display title, hairline beneath) with the opening paragraph as its intro, then one icon-badge block per section via `EmptyState` (new optional `headingId` so each section is labelled): Sample data, Your own data, Where the idea came from, Find me online, Disclaimer. The text is the author's, verbatim; the duplicate "About" heading was folded into the page title. Find me online links LinkedIn, Email (`mailto:wrightnogueda@wisc.edu`, as supplied), and Website. Replaces the previous SplitCard-based About (SplitCard remains in use on the homepage). The Open dashboard / Visit my website buttons were dropped since they were not in the supplied text.
- Verification: lint, `tsc --noEmit`, **40 tests**, production build; checked in headless Edge at 1440px.

## Hero spacing, About redo, Home link (2026-11-08)
- [x] Hero heading moved down a little: hero container top padding went from 80px to 96px on desktop (`sm:pt-20` to `sm:pt-24`) and from 56px to 64px on mobile (`pt-14` to `pt-16`). About uses the same value, so both titles sit at the same height.
- [x] About redone to match the homepage: same Container width (max-w-6xl) and full-width outlined cards via a new shared `components/marketing/SplitCard.tsx` (the homepage tour now uses it too). Kept the author's first paragraph exactly; the cards are: where the idea came from, what it does, sample data (credits the Kaggle "Coffee Sales" dataset by Yaroslav Isaienkov, notes it has no location), your own data, how it's built (Next.js/TypeScript built; Python, PostgreSQL, dbt, FastAPI, Airflow planned, stated as still being built), where it's at, find me online (website link), and the disclaimer with font and icon credits. New wording is mine in her casual voice and says only what the project docs and the author told us.
- [x] Header: added "Home" (to `/`) right before "Dashboard" in `marketingNav`, so it shows in the desktop and mobile menus.
- Verification: lint, `tsc --noEmit`, **39 tests**, production build; checked in headless Edge at 1440px (home, About; header items all centered at y=32; both h1 at the same height).

## Hero spacing and under-construction banner (2026-11-06)
- [x] Hero moved down a bit (top padding pt-14 / sm:pt-20, between the original and the previous tighter value).
- [x] Removed the "backend is still under construction" line from the homepage. Added a temporary full-width bar at the very top of every dashboard page (`components/dashboard/UnderConstructionBanner.tsx`, rendered by `DashboardShell` above the sidebar and content): caramel, espresso text, warning icon, `role="status"`, sticky, saying "Backend is under construction so the dashboard will be empty for now!". The fixed sidebar now starts below it via `--banner-height`. (An earlier in-content banner version was replaced.) Delete the bar and the variable when real data is connected.
- Verification: lint, `tsc --noEmit`, **36 tests**, production build; checked in headless Edge (homepage and Overview at 1440px, bar stays pinned when scrolled, mobile at 390px).

## Homepage wording and tool cards (2026-11-06)
- [x] Tagline is now "Every cup counts!" everywhere (`lib/brand.ts`, footer, page title). The tally marks above the heading were removed from the homepage and About, and `components/brand/Tally.tsx` was deleted. The hero sits higher (less top padding).
- [x] Homepage copy replaced with the author's own wording, unchanged: two hero paragraphs, "Explore the demo", the demo note, the backend-under-construction line, the "What's inside the dashboard" intro, and all eight tool descriptions (`lib/content.ts`; `body` is now a list of paragraphs, since Data Imports has two). The "Open dashboard" button stays. The old "Try it with sample data" label and the extra sentences were dropped.
- [x] The warning line uses a Tabler alert-triangle icon (added to `scripts/generate-icons.mjs`, `AlertIcon`, 16 icons) instead of the emoji, since the brand rules forbid emojis.
- [x] Tool cards: each tool is a full-width outlined card (one per row) with a plain espresso icon beside the display-font title and the description beside it on desktop (stacked on mobile); the lilac badge is gone.
- Verification: lint, `tsc --noEmit`, **35 tests**, and the production build passed; checked in headless Edge at 1440px (home, About) and 390px (tool cards).

## Homepage tour, public About page, dark header (2026-11-06)
- [x] Homepage: removed the receipt section (and its slide-in animation, `HomeReceipts`, `Reveal`, the `.receipt-rise` CSS). Added "What's inside the dashboard": one outlined card per dashboard page (Overview, Sales Analytics, Weather Insights, Forecasting, Inventory, Data Imports, Pipelines, Settings) with a short casual description, each titled link going to its page and anchored by id (`/#data-imports` etc.). Copy is in `lib/content.ts` (`dashboardSections`) and says everything is still being built. The hero paragraph, buttons, and sample-data note are unchanged (the user had trimmed the second hero paragraph; left as is).
- [x] About: removed from the dashboard sidebar (Workspace group now holds only Settings; `AboutIcon`/`info-circle` dropped). New public page `app/(public)/about/page.tsx` styled like the homepage (tally marks, display title, mono section labels): where the idea came from (love of coffee and coffee shops; wondering about orders, busy times, and weather; hot drinks when rainy or cold), what she's building (existing data + a tool for people's own data, with the honest note that the vending-machine dataset has no location so it can't answer the weather question), where it's at, a link to https://daniellawright.com/ ("Visit my website" button and inline link), the Claude disclaimer, and the font and icon credits. The first name "Daniella" comes from the git config and the website domain; change it if she wants something else. The old receipt and `#how-it-works` anchor are gone, so the Overview "How imports will work" link and the Upload placeholder now go to `/#data-imports`.
- [x] Footer: added a daniellawright.com link (opens in a new tab, rel noopener).
- [x] Header: public header is now a solid espresso bar with white text (no thin outline); Log In is a white-text ghost button and Get Started a white button; the mobile menu and toggle are restyled to match. New `ghostInverse` button variant.
- Not removed: `components/ui/Receipt.tsx` stays in the repo, unused.
- Verification: lint, `tsc --noEmit`, **35 tests**, and production build passed; HTTP 200 for /, /about, /dashboard, /dashboard/sales, /login, /upload. Header measured in Edge at 1440px: background rgb(51, 38, 31), no border, every item centered at y=32. Visual checks in headless Edge: homepage and About full pages at 1440px, Overview at 1440px, open mobile menu at 390px.

## Homepage refresh: contrast receipts, tally marks, dashboard + sample-data note (2026-11-04)
- [x] Receipts redone with different contents and more contrast: a dark espresso panel holds a white "Without counting" receipt (four questions answered "a hunch"/"a guess", "Cups counted: none") and a lilac "With CoffeeCounter" receipt (the same questions plus weather and data freshness, each marked Brewing, with "Brewing: in development" printed at the top). They still rise one after the other; the second is cropped by the panel edge. `Receipt` gained a `paper` option (white | lilac) and `ReceiptTotal`.
- [x] Hero: a row of five caramel tally marks above the catchphrase; "Most coffee shops" softened to "Many coffee shops" (no unsourced statistic).
- [x] Dashboard link: "Open dashboard" (primary) to `/dashboard` and "Explore the demo" (new outline button variant) to `/demo`.
- [x] Sample data: a "Try it with sample data" note says the demo is being set up with a public dataset of real coffee vending machine sales, explorable without an account, and that it is not connected yet (dashboard empty for now, no made-up numbers). It must not claim the demo works until Milestone 2 connects the dataset.
- Animation start: the receipts begin when the panel scrolls into view; on a 900px-high window it now sits below the fold, so they start once the visitor scrolls. Sampled in Edge after scrolling: first lands by ~1.1s, second starts after and lands by ~2.3s; reduced motion shows them immediately.
- Verification: lint, `tsc --noEmit`, **33 tests**, and production build passed. Header items still centered at y=32 on / and /login. Visual checks in headless Edge: full homepage at 1440px, scrolled homepage at 390px with device emulation.

## Homepage, route swap, header fix, About (2026-11-04, reverses the "/ is the dashboard" decision below)
- [x] Routes: `/` is now a homepage inside the public layout (header + footer, same as `/login`); `/dashboard` is the Overview inside the sidebar shell (no longer a redirect). Updated the sidebar Overview link, active-state matching (`/dashboard` matches exactly), public header/footer links, placeholder buttons, and About's "Open dashboard".
- [x] Header alignment: the logo was an inline-flex element inside an inline link, which left a line-box gap below it and pushed it up. It is now a block-level flex. Measured in Edge at 1440px on `/` and `/login`: logo mark, wordmark, all nav links and both buttons are centered at y=32, the center of the header's content area. (I did not measure the old state before fixing.)
- [x] Homepage: "Every cup counts." in the display font; two paragraphs (the problem, then what CoffeeCounter is being built to do, in-development wording, no performance claims); two tilted receipts (menu; how imports will work) that slide up from below one after the other. Animation is pure CSS, started by an IntersectionObserver when the receipts scroll into view (`Reveal.tsx`). Sampled in Edge: first receipt lands by ~1.1s, second starts after and lands by ~2.2s; with prefers-reduced-motion both show immediately.
- [x] About: heading, tab title, and navigation labels are now "About" (was "About CoffeeCounter"); added a Disclaimer that Claude, an AI assistant made by Anthropic, was used as an assistant for this project.
- Verification: lint, `tsc --noEmit`, **32 tests**, and production build passed; HTTP 200 for /, /dashboard, /about, /login, /dashboard/sales. Visual checks in headless Edge: homepage full page at 1440px, scrolled homepage at 390px with device emulation.
- Note: `.next` got into a bad state once this session (`routesManifest.dataRoutes is not iterable`) and a build earlier failed once with `no direct app page entry found for /_not-found`; a clean rebuild fixed both. The repo sits inside OneDrive, whose sync may be touching `.next`; consider excluding `frontend/.next` and `node_modules` from sync.

## Sidebar restyled to the user's mockup (2026-11-04, supersedes the white sidebar below)
- [x] Sidebar is a permanent 248px espresso column again: logo + wordmark, mono group labels (Analyze / Data / Workspace; "Insights" renamed to "Analyze"), hairline-separated groups, edge-to-edge rows, current page = lighter row + 3px caramel bar, 18px icons at 1.6px stroke. Account stays a plain link at the foot; the mockup's invented business name and avatar were not copied. Mobile top bar and menu toggle restyled to match.
- Everything else (page content, cards, receipt, header, logo, fonts) unchanged.
- Verification: lint, **29 tests**, and production build passed. Checked in headless Edge: Sales page at 1440px; open menu at 390px with device emulation.

## Restructure: permanent outlined sidebar (2026-11-04, supersedes the hover-rail items below)
- [x] Sidebar: always expanded 256px white column with espresso right outline; logo + wordmark, labeled groups (Insights / Data / Workspace), lilac outlined selected pill, outlined Account box at the foot. Removed the hover/focus expansion and its transition; mobile keeps a top bar and menu toggle.
- [x] Shell: content lives in its own column (no overlay, no padding workaround), centered up to 1152px.
- [x] Outlines: 1px espresso on `Card`, Overview cards and status row, About receipt panel, the mobile menu toggle, and the public header. Page background stays white; dividers stay the faint `line` tone.
- [x] Overview: four separate outlined metric cards with a lilac icon badge (Total revenue, Transactions, Average purchase, Sales growth); values remain "No data yet". Added revenue, receipt, and coffee icons to the generator (16 total). Section content is otherwise unchanged.
- Not copied from the reference design: search box, notification bell, avatar, shadows, emoji, and its sample figures (all would be decorative or fabricated).
- Verification: lint and **29 tests** passed; production build passed. Checked in headless Edge: Overview, About at 1440px; About and the open menu at 390px with device emulation.
- Note: an earlier production build in this session failed once with `Invariant: no direct app page entry found for /_not-found` and passed on an immediate rerun with no changes.

## Professional polish: Tabler icons, new logo, sidebar motion, calmer About receipt (2026-11-04)
- [x] Icons: Humbleicons -> Tabler Icons (MIT, Paweł Kuna). Icons now inherit text color (white on the rail, espresso on lilac badges). Generator, license file, and About credit updated.
- [x] Logo: new caramel bean whose seam is a rising line (`public/brand/coffee-counter-logo.svg`, favicon `app/icon.svg`); transparent, readable at 28px. Replaces the PNG copies in the app; `images/` originals untouched.
- [x] Sidebar: 200ms width transition with labels fading in; selected item is a lilac pill with espresso text. Reduced-motion users get no animation.
- [x] Layout: shared `PageHeader` (title, description, hairline) on every page; consistent shell padding; Overview metrics in one divided grid plus a single status row.
- [x] About: left column trimmed to intro, preview notice, button, credits. Receipt is white paper on a `surface` panel with larger type, muted "Brewing" status, plain detail lines, and only the header, planned tools, import steps, and one footnote (removed the two status lines and the sign-off).
- [x] Follow-up: dashboard content now starts 264px from the left edge (72px rail + 192px padding, left-aligned, max 1024px wide) so the expanded 240px rail never covers it.
- Verification: lint, **29 tests**, and production build passed. Checked with headless Edge: Overview, About, and Sales at 1440px; rail width measured mid-transition (72 to ~201 to 240 on hover, 240 to ~125 to 72 on leave); About and the open menu at 390px.

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
