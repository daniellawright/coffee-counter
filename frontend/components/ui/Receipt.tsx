import type { HTMLAttributes, ReactNode } from "react";

/*
 * A paper receipt: torn zigzag top and bottom, monospace lines with dot leaders. White
 * paper by default; `paper="caramel"` prints on caramel for contrast. Meant to sit on a
 * contrasting surface (`bg-surface` on white pages, espresso on the homepage), which is
 * what makes the paper edge visible (no borders, shadows, or gradients). A fixed tooth
 * count stretches to any width so the edges always meet the sides.
 */
const TEETH = 20;

type Paper = "white" | "caramel";
const paperBody: Record<Paper, string> = { white: "bg-white", caramel: "bg-caramel" };
const paperEdge: Record<Paper, string> = { white: "text-white", caramel: "text-caramel" };

function TornEdge({ side, paper }: { side: "top" | "bottom"; paper: Paper }) {
  const points = Array.from({ length: TEETH * 2 + 1 }, (_, i) => {
    const peak = i % 2 === 1;
    const y = side === "top" ? (peak ? 0 : 8) : peak ? 8 : 0;
    return `${i * 5},${y}`;
  });
  const closing = side === "top" ? ["100,8", "0,8"] : ["100,0", "0,0"];
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${TEETH * 10} 8`} preserveAspectRatio="none" className={`block h-2 w-full ${paperEdge[paper]}`}>
      <polygon points={[...points, ...closing].join(" ")} fill="currentColor" />
    </svg>
  );
}

export function Receipt({ paper = "white", className = "", children, ...rest }: HTMLAttributes<HTMLElement> & { paper?: Paper }) {
  return (
    <article className={`w-full max-w-md font-mono text-sm leading-relaxed text-espresso ${className}`} {...rest}>
      <TornEdge side="top" paper={paper} />
      <div className={`${paperBody[paper]} px-7 py-8 sm:px-10`}>{children}</div>
      <TornEdge side="bottom" paper={paper} />
    </article>
  );
}

export function ReceiptRule() {
  return <hr className="my-7 border-0 border-t border-dashed border-espresso/25" />;
}

export function ReceiptHeading({ id, children }: { id?: string; children: ReactNode }) {
  return <h2 id={id} className="mb-4 scroll-mt-8 text-xs font-medium tracking-[0.14em] text-muted uppercase">{children}</h2>;
}

/** One printed line: label, dot leader, status; optional muted detail beneath. */
export function ReceiptLine({ label, value, note }: { label: ReactNode; value: ReactNode; note?: ReactNode }) {
  return (
    <div className="py-2">
      <p className="flex items-baseline gap-2">
        <span className="font-medium">{label}</span>
        <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-espresso/35" />
        <span className="text-muted tabular-nums">{value}</span>
      </p>
      {note ? <p className="mt-0.5 text-xs text-muted">{note}</p> : null}
    </div>
  );
}

/** The bold closing line of a receipt. */
export function ReceiptTotal({ label, value }: { label: ReactNode; value: ReactNode }) {
  return (
    <p className="flex items-baseline gap-2 text-base font-semibold uppercase">
      <span>{label}</span>
      <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-3px] border-b-2 border-dotted border-espresso/60" />
      <span className="tabular-nums">{value}</span>
    </p>
  );
}
