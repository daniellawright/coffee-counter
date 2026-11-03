import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { LogoMark } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Receipt, ReceiptHeading, ReceiptLine, ReceiptRule } from "@/components/ui/Receipt";
import { features, importSteps } from "@/lib/content";
import { tagline } from "@/lib/brand";

export const metadata: Metadata = { title: "About CoffeeCounter" };

export default function AboutPage() {
  return (
    <DashboardShell>
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h1 className="font-display text-4xl sm:text-5xl">About CoffeeCounter</h1>
          <p className="mt-5 text-lg leading-relaxed">
            Coffee shop analytics that turns your sales files into a clear picture: what sells, when you’re busiest, and what to prepare next.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            This is an early development preview. Sales analytics, demo data, uploads, and accounts are not available yet. No business data is connected, and this preview is not a private workspace.
          </p>
          <div className="mt-8"><ButtonLink href="/">Open dashboard</ButtonLink></div>
          <p className="mt-16 text-xs leading-relaxed text-muted">
            Set in Young Serif, Schibsted Grotesk, and Spline Sans Mono. Icons are{" "}
            <a href="https://github.com/zraly/humbleicons" className="rounded-sm underline underline-offset-2 hover:text-espresso">Humbleicons</a>{" "}
            by Jiří Zralý (MIT).
          </p>
        </div>

        <Receipt aria-label="CoffeeCounter receipt" className="lg:col-span-6 lg:col-start-7 lg:justify-self-end">
          <div className="flex flex-col items-center text-center">
            <LogoMark size={36} />
            <p className="mt-3 font-display text-2xl">CoffeeCounter</p>
            <p className="mt-1 text-muted">{tagline}</p>
            <p className="text-muted">Development preview</p>
          </div>

          <ReceiptRule />
          <section aria-labelledby="receipt-menu">
            <ReceiptHeading id="receipt-menu">On the menu</ReceiptHeading>
            {features.map(({ title, note }) => (
              <ReceiptLine key={title} label={title} value="Brewing*" note={note} />
            ))}
          </section>

          <ReceiptRule />
          <section aria-labelledby="how-it-works">
            <ReceiptHeading id="how-it-works">How imports will work</ReceiptHeading>
            <ol>
              {importSteps.map((step, index) => (
                <li key={step} className="flex gap-3 py-1">
                  <span className="tabular-nums text-muted">{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <ReceiptRule />
          <ReceiptLine label="Business data connected" value="None" />
          <ReceiptLine label="Made-up numbers" value="0" />

          <ReceiptRule />
          <p className="text-muted">* Brewing: in development, not available yet. Numbers will come from your processed sales. When information is missing, we say so.</p>
          <p className="mt-6 text-center tracking-[0.12em] uppercase">Thank you for visiting</p>
        </Receipt>
      </div>
    </DashboardShell>
  );
}
