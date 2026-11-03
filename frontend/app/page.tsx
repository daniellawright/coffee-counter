import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Overview } from "@/components/dashboard/Overview";

export const metadata: Metadata = { title: "Overview" };

export default function Home() {
  return (
    <DashboardShell>
      <Overview />
    </DashboardShell>
  );
}
