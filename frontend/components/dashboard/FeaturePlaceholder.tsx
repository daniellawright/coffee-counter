import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { dashboardNav } from "@/lib/navigation";
import { dashboardPlaceholders, type DashboardFeature } from "@/lib/placeholders";

export function FeaturePlaceholder({ feature }: { feature: DashboardFeature }) {
  const { title, body, href } = dashboardPlaceholders[feature];
  const nav = dashboardNav.find((item) => item.href === href)!;
  return (
    <>
      <PageHeader title={nav.label}>Feature in development</PageHeader>
      <EmptyState icon={nav.icon} title={title} action={<ButtonLink href="/about">About CoffeeCounter</ButtonLink>}>{body}</EmptyState>
    </>
  );
}
