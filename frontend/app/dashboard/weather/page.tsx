import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/components/dashboard/FeaturePlaceholder";

export const metadata: Metadata = { title: "Weather Insights" };

export default function Page() {
  return <FeaturePlaceholder feature="weather" />;
}

