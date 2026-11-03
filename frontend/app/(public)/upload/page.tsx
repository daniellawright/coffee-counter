import type { Metadata } from "next";
import { PublicPlaceholder } from "@/components/marketing/PublicPlaceholder";

export const metadata: Metadata = { title: "Upload Your Data" };

export default function Page() {
  return <PublicPlaceholder feature="upload" />;
}

