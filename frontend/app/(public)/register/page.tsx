import type { Metadata } from "next";
import { PublicPlaceholder } from "@/components/marketing/PublicPlaceholder";

export const metadata: Metadata = { title: "Get Started" };

export default function Page() {
  return <PublicPlaceholder feature="register" />;
}

