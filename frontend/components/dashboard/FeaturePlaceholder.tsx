import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";
import { dashboardNav } from "@/lib/navigation";
import { dashboardPlaceholders, type DashboardFeature } from "@/lib/placeholders";

export function FeaturePlaceholder({ feature }: { feature: DashboardFeature }) {
  const { title, body, href } = dashboardPlaceholders[feature];
  const nav = dashboardNav.find((item) => item.href === href)!;
  return (
    <>
      <h1 className="font-display text-4xl sm:text-5xl">{nav.label}</h1>
      <p className="mt-3 mb-14 text-muted">Feature in development</p>
      <EmptyState icon={nav.icon} title={title} action={<ButtonLink href="/about">About CoffeeCounter</ButtonLink>}>{body}</EmptyState>
    </>
  );
}
