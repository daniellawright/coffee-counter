import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/components/dashboard/FeaturePlaceholder";

export const metadata: Metadata = { title: "Sales Analytics" };

export default function Page() {
  return <FeaturePlaceholder feature="sales" />;
}

