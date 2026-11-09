import type { ReactNode } from "react";
import type { IconProps } from "@/components/icons/Icons";
import { IconTile } from "@/components/ui/IconTile";

/** Honest placeholder: white icon on an espresso tile, then plain copy. Also used for the About sections. */
export function EmptyState({
  icon: Icon,
  title,
  children,
  action,
  headingId,
}: {
  icon: (p: IconProps) => ReactNode;
  title: string;
  children: ReactNode;
  action?: ReactNode;
  /** Id for the title, so a surrounding section can be labelled by it. */
  headingId?: string;
}) {
  return (
    <div className="max-w-xl">
      <IconTile icon={Icon} />
      <h2 id={headingId} className="mt-5 text-lg font-semibold">{title}</h2>
      <div className="mt-2 leading-relaxed text-muted">{children}</div>
      {action ? <div className="mt-7">{action}</div> : null}
    </div>
  );
}
