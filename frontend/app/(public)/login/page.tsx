import type { Metadata } from "next";
import { PublicPlaceholder } from "@/components/marketing/PublicPlaceholder";

export const metadata: Metadata = { title: "Log In" };

export default function Page() {
  return <PublicPlaceholder feature="login" />;
}

