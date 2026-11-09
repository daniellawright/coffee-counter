import type { ReactNode } from "react";

/* A template (not a layout) remounts on every navigation, so each public page eases in. */
export default function PublicTemplate({ children }: { children: ReactNode }) {
  return <div className="animate-enter">{children}</div>;
}
