"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/*
 * Flips `data-revealed` to "true" once the block scrolls into view, which starts the
 * CSS slide-in of any `.receipt-rise` children (see globals.css). Without
 * IntersectionObserver it reveals immediately. Reduced-motion users never see motion
 * (handled in CSS).
 */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-revealed={revealed} className={className}>
      {children}
    </div>
  );
}
