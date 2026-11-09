import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon, type IconProps } from "@/components/icons/Icons";
import { Card } from "@/components/ui/Card";

type SplitCardProps = {
  title: string;
  /** Plain espresso icon beside the title (no badge). */
  icon?: (props: IconProps) => ReactNode;
  /** When set, the title links here and the whole card is clickable. */
  href?: string;
  /** Id for the title heading, so a surrounding section can be labelled by it. */
  headingId?: string;
  children: ReactNode;
};

/*
 * One full-width outlined row shared by the homepage tour and the About page: icon and
 * display-font title on the left, text on the right (stacked on mobile).
 */
export function SplitCard({ title, icon: Icon, href, headingId, children }: SplitCardProps) {
  return (
    <Card className={`relative flex flex-col gap-4 md:flex-row md:items-start md:gap-10 md:p-8 ${href ? "hover-lift group transition-[translate,background-color] duration-200 ease-out hover:bg-espresso/5 md:pr-16" : ""}`}>
      <div className="flex shrink-0 items-center gap-3 md:w-64">
        {Icon ? <Icon size={24} className="shrink-0" /> : null}
        <h3 id={headingId} className="font-display text-xl">
          {href ? <Link href={href} className="rounded-sm after:absolute after:inset-0 after:rounded-xl">{title}</Link> : title}
        </h3>
      </div>
      <div className="space-y-3 leading-relaxed text-muted md:flex-1">{children}</div>
      {href ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-8 right-8 hidden -translate-x-1 opacity-0 transition-[opacity,translate] duration-200 ease-out group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 md:block"
        >
          <ArrowRightIcon size={20} />
        </span>
      ) : null}
    </Card>
  );
}
