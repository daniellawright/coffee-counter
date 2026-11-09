import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AlertIcon, ChartIcon, CoffeeIcon, OverviewIcon, UploadIcon, UserIcon, type IconProps } from "@/components/icons/Icons";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Section";

export const metadata: Metadata = { title: "About" };

const linkClass = "rounded-sm text-espresso underline decoration-espresso/30 underline-offset-4 hover:decoration-espresso";

function External({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>{children}</a>;
}

function Section({ id, title, icon, children }: { id: string; title: string; icon: (p: IconProps) => ReactNode; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="reveal py-10 first:pt-0 last:pb-0">
      <EmptyState icon={icon} title={title} headingId={id}>
        <div className="space-y-4">{children}</div>
      </EmptyState>
    </section>
  );
}

/*
 * About: laid out like Explore the demo, Log in, and Get started (container, PageHeader with
 * a hairline right under the title, then icon-tile blocks). The wording is the author's own,
 * supplied verbatim 2026-11-08 (she has since tweaked some of it): do not rewrite it without
 * asking. Her opening "About" paragraph sits in the first block under the subtitle "What is
 * CoffeeCounter?" (the subtitle is new, added 2026-11-08 at her request).
 */
export default function AboutPage() {
  return (
    <Container className="py-14">
      <PageHeader title="About" />

      <div className="divide-y divide-line">
        <Section id="what-is-it" title="What is CoffeeCounter?" icon={OverviewIcon}>
          <p>
            CoffeeCounter turns your coffee shop’s sales records into something easy to understand. Discover your customers’ favorite drinks, your busiest hours, and how your sales change over time. Simply upload a CSV file from your point-of-sale system and explore your data through clear visuals and wording anyone can understand.
          </p>
        </Section>

        <Section id="sample-data" title="Sample data" icon={ChartIcon}>
          <p>
            Try the dashboard without uploading anything of your own! The demo uses the public{" "}
            <External href="https://www.kaggle.com/datasets/ihelon/coffee-sales">“Coffee Sales” dataset by Yaroslav Isaienkov</External>{" "}
            on Kaggle, which contains real coffee vending machine sales.
          </p>
          <p>
            Since the dataset doesn’t include a location, it can’t be used to explore how weather affects drink choices. Weather comparisons require sales data from a shop with a known location.
          </p>
        </Section>

        <Section id="your-own-data" title="Your own data" icon={UploadIcon}>
          <p>
            When you’re ready to explore your own sales data, you’ll be asked to match your file’s columns to the information the dashboard needs. This helps CoffeeCounter work with the different file formats coffee shops use.
          </p>
        </Section>

        <Section id="idea" title="Where the idea came from" icon={CoffeeIcon}>
          <p>
            I absolutely love coffee and visiting coffee shops. Sometimes, while I’m there, I wonder about the numbers behind it all. Do people’s orders follow a pattern? When does it get busiest? Does the weather change what people order? I know it certainly does for me!
          </p>
          <p>Those questions inspired me to build CoffeeCounter and see what real data could reveal.</p>
        </Section>

        <Section id="online" title="Find me online" icon={UserIcon}>
          <p>
            My name is Daniella, and I created CoffeeCounter to gain practical experience with data engineering and data science workflows while building something for my portfolio!
          </p>
          <p>
            I’ve had a lot of fun working on this project. If you’d like to get in touch or explore more of my work, you can find me here:
          </p>
          <p>
            <External href="https://www.linkedin.com/in/daniella-wright/">LinkedIn</External>
            {" · "}
            <a href="mailto:wrightnogueda@wisc.edu" className={linkClass}>Email</a>
            {" · "}
            <External href="https://daniellawright.com/">Website</External>
          </p>
        </Section>

        <Section id="disclaimer" title="Disclaimer" icon={AlertIcon}>
          <p>Claude was used as an assistant during the development of this project.</p>
          <p>
            Fonts: Young Serif, Schibsted Grotesk, and Spline Sans Mono. Icons:{" "}
            <External href="https://github.com/tabler/tabler-icons">Tabler Icons</External>{" "}
            by Paweł Kuna, used under the MIT license.
          </p>
        </Section>
      </div>
    </Container>
  );
}
