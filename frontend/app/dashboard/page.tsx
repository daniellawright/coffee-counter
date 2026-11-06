import type { Metadata } from "next";
import { Overview } from "@/components/dashboard/Overview";

export const metadata: Metadata = { title: "Overview" };

// The shared workspace shell (sidebar) comes from app/dashboard/layout.tsx.
export default function Page() {
  return <Overview />;
}
