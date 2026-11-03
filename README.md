# CoffeeCounter

**Every cup counts.** Coffee shop analytics and data engineering, built with Next.js, TypeScript, and PostgreSQL, with Python/FastAPI, dbt, and Airflow planned for the data pipeline.

Milestone 1 provides a dashboard-first home, responsive workspace navigation, and honest empty states. The sidebar's About CoffeeCounter page explains the tool and planned features. The brand mark and favicon use the user's original logo in `images/coffee-counter-logo.png`. Demo analytics, file uploads, accounts, and backend processing are not available yet. See [TASKS.md](TASKS.md) for progress and [the specification](docs/coffee-counter-specs.md) for the original product requirements, with subsequent user decisions recorded in [CLAUDE.md](CLAUDE.md).

## Local setup

Prerequisites: Node.js 24 and npm, plus Docker Desktop with Linux containers for PostgreSQL. The frontend works without the database during this milestone. Python 3.12+ will be needed for Milestone 2.

From the repository root in PowerShell:

```powershell
Copy-Item .env.example .env
# Edit .env and choose a local database password.
docker compose config --quiet
docker compose up -d db
docker compose ps
cd frontend
npm ci
npm run dev
```

Open http://localhost:3000 to enter the dashboard directly. It remains an unauthenticated layout preview without private data. `/dashboard` redirects to `/`; existing `/dashboard/...` feature routes remain available. `/about` explains the tool, and `/demo`, `/upload`, `/login`, and `/register` explain what is still in development.

The database binds to localhost and persists in the `postgres_data` volume. Initialization SQL runs only when the volume is empty; application schemas will use Alembic migrations in Milestone 2. Stop services with `docker compose down` from the root; this preserves the database volume. Never commit `.env` or uploaded data.

## Checks

From `frontend/`:

```powershell
npm test
npm run lint
npx tsc --noEmit
npm run build
```

The app uses Young Serif (headings, wordmark), Schibsted Grotesk (interface, tabular numerals), and Spline Sans Mono (the About receipt) through `next/font/google`, so production builds need network access to download them. Icons are [Humbleicons](https://github.com/zraly/humbleicons) by Jiří Zralý (MIT; license in `frontend/components/icons/HUMBLEICONS-LICENSE.txt`); `npm run icons` regenerates the small subset the app uses. The page background and light surfaces are white. Run a successful production build with `npm start`.

If PowerShell blocks `npm.ps1` or `npx.ps1`, use `npm.cmd` and `npx.cmd` for these commands; no execution-policy change is needed.

From the root, `docker compose --env-file .env.example config --quiet` validates the Compose configuration without starting services or using private credentials.

## Structure and next milestone

- `frontend/`: Next.js App Router pages, reusable components, content, and Vitest tests.
- `infra/docker/postgres/` and `compose.yaml`: local PostgreSQL 17 foundation.
- `backend/`, `pipeline/`, `transforms/`, `airflow/`: reserved for the existing FastAPI → PostgreSQL → dbt → analytics architecture, with Airflow for scheduled jobs and Redis/RQ for interactive uploads.

Next: inspect and document the real vending-machine dataset, introduce database migrations and Python ingestion, and connect public demo analytics to processed records. The dataset must not be assigned an invented store location. Architectural decisions are in [CLAUDE.md](CLAUDE.md).
