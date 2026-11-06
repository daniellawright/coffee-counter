import type { ReactNode } from "react";
import type { IconProps } from "@/components/icons/Icons";

/** Honest placeholder: espresso icon on a lilac badge, then plain copy. */
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
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lilac text-espresso">
        <Icon size={22} />
      </span>
      <h2 className="mt-5 text-lg font-semibold">{title}</h2>
      <div className="mt-2 leading-relaxed text-muted">{children}</div>
      {action ? <div className="mt-7">{action}</div> : null}
    </div>
  );
}
