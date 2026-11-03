"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
import { LogoMark } from "@/components/brand/Logo";
import { CloseIcon, MenuIcon, UserIcon, type IconProps } from "@/components/icons/Icons";
import { dashboardNav, isActive, navGroups } from "@/lib/navigation";

/*
 * Desktop: an icon-only rail that widens over the page on hover or keyboard focus,
 * revealing labels. Labels stay in the accessibility tree while visually hidden.
 * Mobile: a top bar with a menu toggle. Changes are instant (no motion).
 */
const reveal = "lg:opacity-0 lg:group-hover/rail:opacity-100 lg:group-focus-within/rail:opacity-100";

function RailLink({ href, label, icon: Icon, active, onNavigate }: { href: string; label: string; icon: (p: IconProps) => ReactNode; active: boolean; onNavigate: () => void }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={`relative flex h-11 items-center gap-4 rounded-md px-[13px] text-sm whitespace-nowrap ${active ? "bg-white/10 font-medium text-lilac" : "text-white/80 hover:bg-white/5 hover:text-white"}`}
    >
      {active ? <span aria-hidden="true" className="absolute top-2.5 bottom-2.5 -left-3 w-[3px] rounded-r bg-lilac" /> : null}
      <Icon size={22} />
      <span className={reveal}>{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  return (
    <aside className="lg:w-[72px] lg:shrink-0">
      <div
        data-dark-surface
        className="group/rail bg-espresso text-white lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-[72px] lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:hover:w-60 lg:focus-within:w-60"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) { close(); toggle.current?.focus(); }
        }}
      >
        <div className="flex h-16 items-center justify-between px-5 lg:h-20 lg:px-0 lg:pl-[22px]">
          <Link href="/" aria-label="CoffeeCounter home" onClick={close} className="flex items-center gap-3 rounded-md whitespace-nowrap">
            <LogoMark size={28} />
            <span className={`font-display text-lg ${reveal}`}>CoffeeCounter</span>
          </Link>
          <button ref={toggle} type="button" aria-expanded={open} aria-controls="dashboard-menu" aria-label={open ? "Close workspace menu" : "Open workspace menu"} onClick={() => setOpen(!open)} className="rounded-md p-2 hover:bg-white/10 lg:hidden">
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <nav id="dashboard-menu" aria-label="Workspace" className={`${open ? "flex" : "hidden"} flex-1 flex-col px-3 pb-5 lg:flex`}>
          {navGroups.map((group, index) => (
            <ul key={group} className={index > 0 ? "mt-3 border-t border-white/10 pt-3" : ""}>
              {dashboardNav.filter((item) => item.group === group).map((item) => (
                <li key={item.href} className="mb-1">
                  <RailLink {...item} active={isActive(pathname, item.href)} onNavigate={close} />
                </li>
              ))}
            </ul>
          ))}
          <div className="mt-auto border-t border-white/10 pt-3">
            <RailLink href="/login" label="Account" icon={UserIcon} active={false} onNavigate={close} />
          </div>
        </nav>
      </div>
    </aside>
  );
}
