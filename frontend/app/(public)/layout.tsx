import type { ReactNode } from "react";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { isSignedIn } from "@/lib/session";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const signedIn = isSignedIn();
  return <div className="flex min-h-screen flex-col"><SiteHeader signedIn={signedIn} /><main id="main-content" className="flex-1">{children}</main><SiteFooter signedIn={signedIn} /></div>;
}
