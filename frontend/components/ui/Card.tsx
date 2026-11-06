import type { HTMLAttributes, ReactNode } from "react";

/** White content surface with a 1px espresso outline. No fills, shadows, or effects. */
export function Card({ className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-xl border border-espresso bg-white p-6 ${className}`} {...rest} />;
}

export function CardTitle({ children, description }: { children: ReactNode; description?: ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-semibold">{children}</h3>
      {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
    </div>
  );
}

/** KPI card. `value` is null until real data exists; then it shows an honest placeholder. */
export function MetricCard({ label, value, description }: { label: string; value: string | null; description: string }) {
  return (
    <Card>
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums">{value ?? "—"}</p>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </Card>
  );
}
