import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { LogoMark } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Receipt, ReceiptHeading, ReceiptLine, ReceiptRule } from "@/components/ui/Receipt";
import { features, importSteps } from "@/lib/content";
import { tagline } from "@/lib/brand";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <DashboardShell>
      <PageHeader title="About">
        Coffee shop analytics that turns your sales files into a clear picture: what sells, when you’re busiest, and what to prepare next.
      </PageHeader>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col lg:col-span-5">
          <p className="leading-relaxed text-muted">
            This is an early development preview. Sales analytics, demo data, uploads, and accounts are not available yet. No business data is connected, and this preview is not a private workspace.
          </p>
          <div className="mt-8"><ButtonLink href="/dashboard">Open dashboard</ButtonLink></div>
          <section aria-labelledby="disclaimer" className="mt-12 border-t border-line pt-6">
            <h2 id="disclaimer" className="font-mono text-[10.5px] leading-none font-medium tracking-[0.12em] text-muted uppercase">Disclaimer</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Claude, an AI assistant made by Anthropic, was used as an assistant for this project. Its code, design, and wording were developed with that help.
            </p>
          </section>
          <p className="mt-8 text-xs leading-relaxed text-muted">
            Set in Young Serif, Schibsted Grotesk, and Spline Sans Mono. Icons are{" "}
            <a href="https://github.com/tabler/tabler-icons" className="rounded-sm underline underline-offset-2 hover:text-espresso">Tabler Icons</a>{" "}
            by Paweł Kuna (MIT).
          </p>
        </div>

        <div className="flex justify-center rounded-xl border border-espresso bg-surface px-4 py-10 sm:px-10 lg:col-span-7">
          <Receipt aria-label="CoffeeCounter receipt">
            <div className="flex flex-col items-center text-center">
              <LogoMark size={40} />
              <p className="mt-3 font-display text-2xl">CoffeeCounter</p>
              <p className="mt-1 text-muted">{tagline}</p>
            </div>

            <ReceiptRule />
            <section aria-labelledby="receipt-menu">
              <ReceiptHeading id="receipt-menu">On the menu</ReceiptHeading>
              {features.map(({ title, note }) => (
                <ReceiptLine key={title} label={title} value="Brewing" note={note} />
              ))}
            </section>

            <ReceiptRule />
            <section aria-labelledby="how-it-works">
              <ReceiptHeading id="how-it-works">How imports will work</ReceiptHeading>
              <ol>
                {importSteps.map((step, index) => (
                  <li key={step} className="flex gap-4 py-1.5">
                    <span className="w-3 text-muted tabular-nums">{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            <ReceiptRule />
            <p className="text-xs leading-relaxed text-muted">Brewing: in development, not available yet. Numbers will come from your processed sales. When information is missing, we say so.</p>
          </Receipt>
        </div>
      </div>
    </DashboardShell>
  );
}
