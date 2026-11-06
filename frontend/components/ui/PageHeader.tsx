import type { ReactNode } from "react";

/** One consistent page opening: title, optional one-line description, hairline beneath. */
export function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="mb-10 border-b border-line pb-8 lg:mb-12">
      <h1 className="font-display text-3xl sm:text-4xl">{title}</h1>
      {children ? <p className="mt-3 max-w-2xl leading-relaxed text-muted">{children}</p> : null}
    </header>
  );
}
