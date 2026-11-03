import type { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <main id="main-content" className="mx-auto w-full max-w-5xl min-w-0 flex-1 px-6 py-10 sm:px-10 lg:py-16">
        {children}
      </main>
    </div>
  );
}
