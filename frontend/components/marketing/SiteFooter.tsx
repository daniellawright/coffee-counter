import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Section";
import { tagline } from "@/lib/brand";

const links = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "About", href: "/about" },
  { label: "Explore Demo", href: "/demo" },
  { label: "Upload Your Data", href: "/upload" },
  { label: "Log In", href: "/login" },
  { label: "Get Started", href: "/register" },
];

export function SiteFooter() {
  return (
    <footer data-dark-surface className="bg-espresso text-white">
      <Container className="flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo tone="dark" />
          <p className="mt-3 text-sm text-white/75">{tagline}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded text-white/85 hover:text-lilac">
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
      <Container className="border-t border-white/15 py-6 text-xs text-white/60">
        © {new Date().getFullYear()} CoffeeCounter. A portfolio project in coffee shop analytics.
      </Container>
    </footer>
  );
}
