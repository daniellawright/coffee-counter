import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { HomeReceipts } from "@/components/marketing/HomeReceipts";
import { tagline } from "@/lib/brand";

/** A row of five tally marks (four strokes and the crossing one), drawn once in caramel. */
function Tally() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 36" width="64" height="36" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="mx-auto text-caramel">
      <path d="M9 3v30M22 3v30M35 3v30M48 3v30M3 27L58 9" />
    </svg>
  );
}

/*
 * Home: tally marks, the catchphrase in the display font, the problem and then what
 * CoffeeCounter is for, the way into the dashboard (the main product), a note on trying
 * it with sample data, then the receipts. Copy makes no performance claims and says
 * plainly what is still in development, including that the sample-data demo is not
 * connected yet.
 */
export default function Home() {
  return (
    <>
      <Container className="pt-16 pb-16 text-center sm:pt-24 sm:pb-20">
        <Tally />
        <h1 className="mt-8 font-display text-5xl leading-tight sm:text-7xl">{tagline}</h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed sm:text-xl">
          Many coffee shops sit on months of sales records they never get to use. The numbers are stuck in point-of-sale exports and spreadsheets, so deciding what to stock, when to staff, and what to prepare comes down to guesswork.
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          CoffeeCounter is being built to turn those files into a clear picture in plain language: what sells, when you’re busiest, and what to prepare next, with no data skills required.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/dashboard" size="lg">Open dashboard</ButtonLink>
          <ButtonLink href="/demo" size="lg" variant="outline">Explore the demo</ButtonLink>
        </div>

        <section aria-labelledby="sample-data" className="mx-auto mt-14 max-w-xl">
          <h2 id="sample-data" className="font-mono text-[10.5px] leading-none font-medium tracking-[0.12em] text-muted uppercase">Try it with sample data</h2>
          <p className="mt-3 leading-relaxed text-muted">
            The demo is being set up with a public dataset of real coffee vending machine sales, so you can explore the dashboard without an account or any data of your own. It isn’t connected yet, so the dashboard is empty for now. No numbers are made up.
          </p>
        </section>
      </Container>
      <HomeReceipts />
    </>
  );
}
