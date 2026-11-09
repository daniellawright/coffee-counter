import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Section";
import { tagline } from "@/lib/brand";

const links = [
  { label: "Dashboard", href: "/dashboard", when: "signedIn" },
  { label: "About", href: "/about" },
  { label: "Explore Demo", href: "/demo" },
  { label: "Upload Your Data", href: "/upload" },
  { label: "Log In", href: "/login", when: "signedOut" },
  { label: "Get Started", href: "/register", when: "signedOut" },
] as const;

/* Like the header: Dashboard only after sign-in, Log In / Get Started only before it. */
export function SiteFooter({ signedIn = false }: { signedIn?: boolean }) {
  const visible = links.filter((l) => !("when" in l) || (l.when === "signedIn") === signedIn);
  return (
    <footer data-dark-surface className="bg-espresso text-white">
      <Container className="flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo tone="dark" />
          <p className="mt-3 text-sm text-white/75">{tagline}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-3">
          {visible.map((l) => (
            <Link key={l.href} href={l.href} className="rounded text-white/85 hover:text-caramel">
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/15 py-6 text-xs text-white/60">
        <span>© {new Date().getFullYear()} CoffeeCounter. A portfolio project in coffee shop analytics.</span>
        <a href="https://daniellawright.com/" target="_blank" rel="noopener noreferrer" className="rounded-sm text-white/80 underline underline-offset-2 hover:text-caramel">daniellawright.com</a>
      </Container>
    </footer>
  );
}
