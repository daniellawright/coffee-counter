import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "inverse";
type Size = "md" | "lg";

// Hover states only swap colors instantly: no motion, no shadow (brand rule).
const variants: Record<Variant, string> = {
  primary: "bg-espresso text-white hover:bg-espresso/85",
  secondary: "bg-lilac text-espresso hover:bg-lilac/70",
  outline: "border border-espresso bg-white text-espresso hover:bg-espresso/5",
  ghost: "bg-transparent text-espresso hover:bg-espresso/5",
  inverse: "bg-white text-espresso hover:bg-white/90",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className = "") {
  return `inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`;
}

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function Button({ variant, size, className, ...rest }: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={buttonClasses(variant, size, className)} {...rest} />;
}

export function ButtonLink({ href, variant, size, className, children }: CommonProps & { href: string }) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)}>
      {children}
    </Link>
  );
}
