import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/components/dashboard/FeaturePlaceholder";

export const metadata: Metadata = { title: "Data Imports" };

export default function Page() {
  return <FeaturePlaceholder feature="imports" />;
}

