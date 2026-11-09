"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { CloseIcon, MenuIcon } from "@/components/icons/Icons";
import { AccountMenu } from "@/components/marketing/AccountMenu";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { isCurrentPage, marketingLinks } from "@/lib/navigation";

/*
 * A solid espresso bar (user preference over a thin outline), so everything on it is white.
 * Signed out: Home, About, Explore Demo, then Log In / Get Started. Signed in: Dashboard
 * joins the links, and Log In / Get Started become an Open Dashboard button and an account
 * menu. Explore Demo is always a plain link so anyone can try it before signing up.
 * The current page is marked (aria-current) with a lighter pill and no underline (user
 * request 2026-11-08); the mobile menu row also gets a 3px caramel bar on its left edge.
 */
export function SiteHeader({ signedIn = false }: { signedIn?: boolean }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);
  const pathname = usePathname();
  const links = marketingLinks(signedIn);
  const desktopLink = (current: boolean) =>
    `relative rounded-full px-3 py-2 text-sm font-medium hover:bg-white/10 hover:text-white ${current ? "bg-white/10 text-white" : "text-white/85"}`;
  const mobileLink = (current: boolean) =>
    `relative rounded-xl px-3 py-3 font-medium hover:bg-white/10 hover:text-white ${current ? "bg-white/10 text-white before:absolute before:inset-y-2 before:left-0 before:w-[3px] before:bg-caramel" : "text-white/90"}`;

  return (
    <header data-dark-surface className="sticky top-0 z-40 bg-espresso text-white" onKeyDown={(event) => {
      if (event.key === "Escape" && open) { close(); toggle.current?.focus(); }
    }}>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="CoffeeCounter home" className="rounded-md">
          <Logo tone="dark" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isCurrentPage(pathname, item.href) ? "page" : undefined} className={desktopLink(isCurrentPage(pathname, item.href))}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {signedIn ? (
            <>
              <ButtonLink href="/dashboard" variant="inverse">Open Dashboard</ButtonLink>
              <AccountMenu />
            </>
          ) : (
            <>
              <ButtonLink href="/login" variant="ghostInverse" aria-current={isCurrentPage(pathname, "/login") ? "page" : undefined} className="aria-[current=page]:bg-white/15">
                Log In
              </ButtonLink>
              <ButtonLink href="/register" variant="inverse" aria-current={isCurrentPage(pathname, "/register") ? "page" : undefined} className="aria-[current=page]:bg-caramel">Get Started</ButtonLink>
            </>
          )}
        </div>

        <button
          ref={toggle}
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </Container>

      {open ? (
        <nav id="mobile-menu" aria-label="Mobile" className="animate-pop border-t border-white/[0.12] bg-espresso md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((item) => (
              <Link key={item.href} href={item.href} onClick={close} aria-current={isCurrentPage(pathname, item.href) ? "page" : undefined} className={mobileLink(isCurrentPage(pathname, item.href))}>
                {item.label}
              </Link>
            ))}
            {signedIn ? (
              <>
                <Link href="/dashboard/settings" onClick={close} className={mobileLink(false)}>
                  Settings
                </Link>
                <Link href="/dashboard" onClick={close} className={buttonClasses("inverse", "md", "mt-2")}>
                  Open Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" onClick={close} aria-current={isCurrentPage(pathname, "/login") ? "page" : undefined} className={mobileLink(isCurrentPage(pathname, "/login"))}>
                  Log In
                </Link>
                <Link href="/register" onClick={close} className={buttonClasses("inverse", "md", "mt-2")}>
                  Get Started
                </Link>
              </>
            )}
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
