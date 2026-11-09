import type { ReactNode } from "react";
import type { IconProps } from "@/components/icons/Icons";

const sizes = {
  md: { box: "h-11 w-11 rounded-xl", icon: 22 },
  sm: { box: "h-9 w-9 rounded-lg", icon: 18 },
} as const;

/**
 * Icon on white surfaces: a solid espresso rounded square with a white icon, the same
 * pairing as the sidebar and the primary button. Decorative, so hidden from screen readers.
 */
export function IconTile({ icon: Icon, size = "md" }: { icon: (p: IconProps) => ReactNode; size?: keyof typeof sizes }) {
  const { box, icon } = sizes[size];
  return (
    <span aria-hidden="true" className={`flex shrink-0 items-center justify-center bg-espresso text-white ${box}`}>
      <Icon size={icon} />
    </span>
  );
}
