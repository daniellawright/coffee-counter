import type { HTMLAttributes, ReactNode } from "react";

/*
 * A paper receipt: hairline sides, torn zigzag top and bottom, monospace lines with
 * dot leaders. Edges are SVG strokes in the neutral divider color (no fills, shadows,
 * or gradients). A fixed tooth count stretches to any width, so edges meet the sides.
 */
const TEETH = 22;

function TornEdge({ side }: { side: "top" | "bottom" }) {
  const points = Array.from({ length: TEETH * 2 + 1 }, (_, i) => {
    const peak = i % 2 === 1;
    const y = side === "top" ? (peak ? 0 : 8) : peak ? 8 : 0;
    return `${i * 5},${y}`;
  }).join(" ");
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${TEETH * 10} 8`} preserveAspectRatio="none" className="block h-2 w-full overflow-visible text-line">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function Receipt({ className = "", children, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <article className={`w-full max-w-sm font-mono text-[13px] leading-relaxed ${className}`} {...rest}>
      <TornEdge side="top" />
      <div className="border-x border-line px-6 py-6 sm:px-7">{children}</div>
      <TornEdge side="bottom" />
    </article>
  );
}

export function ReceiptRule() {
  return <hr className="my-5 border-0 border-t border-dashed border-espresso/25" />;
}

export function ReceiptHeading({ id, children }: { id?: string; children: ReactNode }) {
  return <h2 id={id} className="mb-3 scroll-mt-8 text-xs tracking-[0.12em] text-muted uppercase">{children}</h2>;
}

/** One printed line: label, dot leader, value; optional modifier line beneath, like "+ oat milk". */
export function ReceiptLine({ label, value, note }: { label: ReactNode; value: ReactNode; note?: ReactNode }) {
  return (
    <div className="py-1">
      <p className="flex items-baseline gap-2">
        <span>{label}</span>
        <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-espresso/40" />
        <span className="tabular-nums">{value}</span>
      </p>
      {note ? <p className="pl-4 text-muted">+ {note}</p> : null}
    </div>
  );
}
