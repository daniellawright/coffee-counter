"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { CloseIcon, MenuIcon } from "@/components/icons/Icons";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { marketingNav } from "@/lib/navigation";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-espresso bg-white" onKeyDown={(event) => {
      if (event.key === "Escape" && open) { close(); toggle.current?.focus(); }
    }}>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="CoffeeCounter home" className="rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {marketingNav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-3 py-2 text-sm font-medium hover:bg-espresso/5">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ButtonLink href="/login" variant="ghost">
            Log In
          </ButtonLink>
          <ButtonLink href="/register">Get Started</ButtonLink>
        </div>

        <button
          ref={toggle}
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-espresso text-white hover:bg-espresso/85 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </Container>

      {open ? (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-white md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {marketingNav.map((item) => (
              <Link key={item.href} href={item.href} onClick={close} className="rounded-xl px-3 py-3 font-medium hover:bg-espresso/5">
                {item.label}
              </Link>
            ))}
            <Link href="/login" onClick={close} className="rounded-xl px-3 py-3 font-medium hover:bg-espresso/5">
              Log In
            </Link>
            <Link href="/register" onClick={close} className={buttonClasses("primary", "md", "mt-2")}>
              Get Started
            </Link>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
