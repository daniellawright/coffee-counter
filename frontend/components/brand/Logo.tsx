import Image from "next/image";

type Tone = "light" | "dark";

/** The user's original transparent logo; do not recolor or redraw the artwork. */
export function LogoMark({ size = 32, title }: { size?: number; title?: string }) {
  return (
    <Image
      src="/brand/coffee-counter-logo.png"
      width={size}
      height={size}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      className="shrink-0 object-contain"
    />
  );
}

export function Logo({ tone = "light", size = 32 }: { tone?: Tone; size?: number }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${tone === "light" ? "text-espresso" : "text-white"}`}>
      <LogoMark size={size} />
      <span className="font-display text-xl font-normal tracking-tight">CoffeeCounter</span>
    </span>
  );
}
