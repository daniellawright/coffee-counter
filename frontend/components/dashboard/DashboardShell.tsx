import type { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";

/* The sidebar is permanent and takes its own 248px column, so content never sits under it. */
export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <main id="main-content" className="min-w-0 flex-1 px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
