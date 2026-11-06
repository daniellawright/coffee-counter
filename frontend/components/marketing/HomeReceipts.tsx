import { LogoMark } from "@/components/brand/Logo";
import { Receipt, ReceiptHeading, ReceiptLine, ReceiptRule, ReceiptTotal } from "@/components/ui/Receipt";
import { Reveal } from "@/components/marketing/Reveal";
import { answerLines, guessworkLines } from "@/lib/content";

/*
 * Two tilted receipts on a dark espresso panel, rising one after the other. The same
 * questions, answered by guesswork on white paper, then by what CoffeeCounter is being
 * built to answer on lilac paper. The panel crops the second receipt like a slot.
 * Illustrative copy only: no figures, and the in-development status is printed on it.
 */
export function HomeReceipts() {
  return (
    <section aria-label="Guesswork compared with CoffeeCounter" className="px-4 pb-20 sm:px-6 sm:pb-28">
      <div data-dark-surface className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-espresso">
        <Reveal className="flex flex-col items-center gap-12 px-6 pt-14 pb-14 md:flex-row md:items-start md:justify-center md:gap-0 md:px-10 md:pt-20 md:pb-0">
          <div className="receipt-rise w-full max-w-[26rem] -rotate-2 md:-mr-4 md:rotate-[-4deg]" style={{ "--rise-delay": "0ms" } as React.CSSProperties}>
            <Receipt aria-label="Receipt: without counting">
              <ReceiptHeading>Without counting</ReceiptHeading>
              {guessworkLines.map(({ label, value }) => (
                <ReceiptLine key={label} label={label} value={value} />
              ))}
              <ReceiptRule />
              <ReceiptTotal label="Cups counted" value="none" />
            </Receipt>
          </div>

          <div className="receipt-rise w-full max-w-[26rem] rotate-2 md:mt-24 md:-mb-10 md:rotate-[4deg]" style={{ "--rise-delay": "1100ms" } as React.CSSProperties}>
            <Receipt paper="lilac" aria-label="Receipt: with CoffeeCounter">
              <div className="flex flex-col items-center text-center">
                <LogoMark size={36} />
                <p className="mt-2 font-display text-2xl">CoffeeCounter</p>
                <p className="mt-1 text-xs tracking-[0.14em] text-muted uppercase">Brewing: in development</p>
              </div>
              <ReceiptRule />
              {answerLines.map(({ label, note }) => (
                <ReceiptLine key={label} label={label} value="Brewing" note={note} />
              ))}
            </Receipt>
          </div>
        </Reveal>
      </div>
      <noscript>
        <style>{".receipt-rise{opacity:1!important;translate:none!important}"}</style>
      </noscript>
    </section>
  );
}
