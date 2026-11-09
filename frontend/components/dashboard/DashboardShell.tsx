import type { CSSProperties, ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { UnderConstructionBanner } from "@/components/dashboard/UnderConstructionBanner";

/*
 * The sidebar is permanent and takes its own 248px column, so content never sits under it.
 * The temporary under-construction bar spans the full width above both; `--banner-height`
 * tells the fixed sidebar where to start (delete it along with the bar).
 */
const bannerHeight = { "--banner-height": "2.5rem" } as CSSProperties;

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div style={bannerHeight}>
      <UnderConstructionBanner />
      <div className="min-h-screen lg:flex">
        <Sidebar />
        <main id="main-content" className="min-w-0 flex-1 px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
