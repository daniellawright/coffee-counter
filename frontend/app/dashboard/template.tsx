import type { ReactNode } from "react";

/* Remounts on every navigation, so each dashboard page eases in beside the fixed sidebar. */
export default function DashboardTemplate({ children }: { children: ReactNode }) {
  return <div className="animate-enter">{children}</div>;
}
