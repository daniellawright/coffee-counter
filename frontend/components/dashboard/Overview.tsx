import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRightIcon, CoffeeIcon, ForecastIcon, ReceiptIcon, RevenueIcon, type IconProps } from "@/components/icons/Icons";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { PageHeader } from "@/components/ui/PageHeader";
import { counterMetrics } from "@/lib/content";

const metricIcons: Record<string, (p: IconProps) => ReactNode> = {
  "Total revenue": RevenueIcon,
  Transactions: ReceiptIcon,
  "Average purchase": CoffeeIcon,
  "Sales growth": ForecastIcon,
};

/** Four outlined metric cards, then one honest status row. */
export function Overview() {
  return (
    <>
      <PageHeader title="Overview">Nothing to count yet. Your sales figures will appear here after your first import.</PageHeader>

      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {counterMetrics.map(({ label, value }) => {
          const Icon = metricIcons[label];
          return (
            <Card key={label}>
              <dt className="flex items-center gap-3 text-sm text-muted">
                {Icon ? <IconTile icon={Icon} size="sm" /> : null}
                {label}
              </dt>
              <dd className="mt-5 text-3xl font-medium tabular-nums">
                {value ?? (
                  <>
                    <span aria-hidden="true" className="text-espresso/35">—</span>
                    <span className="sr-only">No data yet</span>
                  </>
                )}
              </dd>
            </Card>
          );
        })}
      </dl>

      <Card className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-4 text-sm">
        <p className="text-muted">No business connected. Imports are still in development.</p>
        <Link href="/#data-imports" className="inline-flex items-center gap-1.5 rounded-sm font-medium hover:text-espresso/70">
          How imports will work
          <ArrowRightIcon size={16} />
        </Link>
      </Card>
    </>
  );
}
