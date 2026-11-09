import { SplitCard } from "@/components/marketing/SplitCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { tagline } from "@/lib/brand";
import { dashboardSections } from "@/lib/content";
import { dashboardNav } from "@/lib/navigation";

/*
 * Home: the catchphrase in the display font, the problem and what the dashboard does, the
 * way into the dashboard (the main product) and the demo, a note on what the demo will use
 * (the under-construction notice lives on the dashboard), then a tour of the dashboard tools,
 * one full-width card each. All wording is the author's own (see `lib/content.ts` for the
 * tour); do not rewrite it without asking.
 */
export default function Home() {
  return (
    <>
      <Container className="pt-16 pb-16 text-center sm:pt-24 sm:pb-20">
        <h1 className="font-display text-5xl leading-tight sm:text-7xl">{tagline}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
          Coffee shops can have months of sales records without ever getting the chance to discover what those numbers might reveal.
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed sm:text-xl">
          Sales data often comes from point-of-sale systems and spreadsheets. This dashboard brings everything together to make it easier to spot patterns, discover your customers&apos; favorite drinks, and make decisions about what to stock, when to staff, and what to prepare.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/dashboard" size="lg" className="hover-lift">Open dashboard</ButtonLink>
          <ButtonLink href="/demo" size="lg" variant="outline" className="hover-lift">Explore the demo</ButtonLink>
        </div>

        <section aria-label="About the demo" className="mx-auto mt-12 max-w-2xl">
          <p className="leading-relaxed text-muted">
            The demo will use a publicly available dataset of real coffee vending machine sales, so you can explore the dashboard without creating an account or uploading your own data.
          </p>
        </section>
      </Container>

      <section aria-labelledby="inside-dashboard" className="border-t border-line">
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="inside-dashboard" className="font-display text-3xl sm:text-4xl">What’s inside the dashboard</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">Here’s a quick look at what each tool in the dashboard does:</p>
          </div>

          <ul className="mt-12 space-y-5">
            {dashboardSections.map(({ id, href, body }) => {
              const nav = dashboardNav.find((item) => item.href === href)!;
              return (
                <li key={id} id={id} className="reveal scroll-mt-24">
                  <SplitCard title={nav.label} icon={nav.icon} href={href}>
                    {body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </SplitCard>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}
