import type { ReactNode } from "react";
import type { IconProps } from "@/components/icons/Icons";

/** Honest placeholder. White icon on an espresso badge, then plain copy. */
export function EmptyState({
  icon: Icon,
  title,
  children,
  action,
}: {
  icon: (p: IconProps) => ReactNode;
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="max-w-xl">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-espresso">
        <Icon size={24} />
      </span>
      <h2 className="mt-6 text-lg font-semibold">{title}</h2>
      <div className="mt-2 leading-relaxed text-muted">{children}</div>
      {action ? <div className="mt-8">{action}</div> : null}
    </div>
  );
}
