import type { Metadata } from "next";
import { PublicPlaceholder } from "@/components/marketing/PublicPlaceholder";

export const metadata: Metadata = { title: "Explore Demo" };

export default function Page() {
  return <PublicPlaceholder feature="demo" />;
}

