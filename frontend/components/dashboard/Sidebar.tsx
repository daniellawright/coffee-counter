"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
import { LogoMark } from "@/components/brand/Logo";
import { CloseIcon, MenuIcon, UserIcon, type IconProps } from "@/components/icons/Icons";
import { dashboardNav, isActive, navGroups } from "@/lib/navigation";

/*
 * Desktop: a permanent 248px espresso sidebar. Groups are separated by hairlines and
 * labeled in small mono capitals; rows run edge to edge. The current page gets a
 * slightly lighter row and a 3px caramel bar. Nothing hides, moves, or animates.
 * Mobile: a top bar with a menu toggle that opens the same navigation below it.
 */
const row = "relative flex items-center gap-3 px-5 py-[9px] text-sm whitespace-nowrap focus-visible:-outline-offset-2";

function NavLink({ href, label, icon: Icon, active, onNavigate }: { href: string; label: string; icon: (p: IconProps) => ReactNode; active: boolean; onNavigate: () => void }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={`${row} ${active ? "bg-white/[0.07] text-white" : "text-white/75 hover:bg-white/[0.07] hover:text-white"}`}
    >
      {active ? <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-caramel" /> : null}
      <Icon size={18} className="[&_*]:stroke-[1.6]" />
      <span>{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  return (
    <aside className="lg:w-[248px] lg:shrink-0">
      <div
        data-dark-surface
        className="bg-espresso text-white lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-[248px] lg:flex-col lg:overflow-y-auto"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) { close(); toggle.current?.focus(); }
        }}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/[0.12] px-5">
          <Link href="/" aria-label="CoffeeCounter home" onClick={close} className="flex items-center gap-2.5 rounded-md whitespace-nowrap">
            <LogoMark size={28} />
            <span className="font-display text-[19px]">CoffeeCounter</span>
          </Link>
          <button ref={toggle} type="button" aria-expanded={open} aria-controls="dashboard-menu" aria-label={open ? "Close workspace menu" : "Open workspace menu"} onClick={() => setOpen(!open)} className="rounded-md border border-white/25 p-2 hover:bg-white/[0.07] lg:hidden">
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <nav id="dashboard-menu" aria-label="Workspace" className={`${open ? "flex" : "hidden"} flex-1 flex-col lg:flex`}>
          {navGroups.map((group, index) => (
            <div key={group} className={`py-2.5 ${index < navGroups.length - 1 ? "border-b border-white/[0.12]" : ""}`}>
              <p id={`nav-group-${index}`} className="px-5 pt-2.5 pb-2 font-mono text-[10.5px] leading-none font-medium tracking-[0.12em] text-white/50 uppercase">{group}</p>
              <ul aria-labelledby={`nav-group-${index}`}>
                {dashboardNav.filter((item) => item.group === group).map((item) => (
                  <li key={item.href}>
                    <NavLink {...item} active={isActive(pathname, item.href)} onNavigate={close} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mt-auto border-t border-white/[0.12] py-2.5">
            <NavLink href="/login" label="Account" icon={UserIcon} active={false} onNavigate={close} />
          </div>
        </nav>
      </div>
    </aside>
  );
}
