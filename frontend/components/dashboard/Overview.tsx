import Link from "next/link";
import { counterMetrics } from "@/lib/content";

/** Minimal overview: one heading, the four headline figures, one honest status line. */
export function Overview() {
  return (
    <>
      <h1 className="font-display text-4xl sm:text-5xl">Overview</h1>
      <p className="mt-3 max-w-2xl text-muted">Nothing to count yet. Your sales figures will appear here after your first import.</p>

      <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-10 lg:grid-cols-4">
        {counterMetrics.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="mt-2 text-4xl font-medium tabular-nums">
              {value ?? (
                <>
                  <span aria-hidden="true">—</span>
                  <span className="sr-only">No data yet</span>
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-16 text-sm text-muted">
        No business connected. Imports are still in development.{" "}
        <Link href="/about#how-it-works" className="rounded-sm text-espresso underline decoration-espresso/30 underline-offset-4 hover:decoration-espresso">How imports will work</Link>
      </p>
    </>
  );
}
