"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { UserIcon } from "@/components/icons/Icons";

/*
 * Account menu for the signed-in header: a button that opens a small panel of links.
 * Escape and clicking elsewhere close it. Only Settings is listed, because that is the
 * only account page that exists; add Log out when real sign-in is built.
 */
export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div
      ref={root}
      className="relative"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          setOpen(false);
          button.current?.focus();
        }
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="account-menu"
        aria-label="Account menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10"
      >
        <UserIcon size={22} />
      </button>
      {open ? (
        <div id="account-menu" role="group" aria-label="Account" data-light-surface className="animate-pop absolute top-full right-0 z-50 mt-2 w-48 rounded-xl border border-espresso bg-white p-1 text-espresso">
          <Link href="/dashboard/settings" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-espresso/5">
            Settings
          </Link>
        </div>
      ) : null}
    </div>
  );
}
