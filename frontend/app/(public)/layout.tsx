import type { ReactNode } from "react";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen flex-col"><SiteHeader /><main id="main-content" className="flex-1">{children}</main><SiteFooter /></div>;
}
