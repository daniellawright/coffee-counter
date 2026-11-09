import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import AboutPage from "@/app/(public)/about/page";
import Home from "@/app/(public)/page";
import PublicTemplate from "@/app/(public)/template";
import DashboardTemplate from "@/app/dashboard/template";
import { AccountMenu } from "@/components/marketing/AccountMenu";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { buttonClasses } from "@/components/ui/Button";

vi.mock("next/navigation", () => ({ usePathname: () => "/dashboard" }));

const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");

it("defines subtle keyframes that only fade and nudge a few pixels, with no shadows or gradients", () => {
  for (const name of ["enter", "pop", "reveal"]) expect(css).toContain(`@keyframes ${name}`);
  const keyframes = [...css.matchAll(/@keyframes[\s\S]*?\n}\n/g)].map((m) => m[0]).join("\n");
  expect(keyframes).toMatch(/opacity: 0/);
  const shifts = [...keyframes.matchAll(/translateY\((-?\d+)px\)/g)].map((m) => Math.abs(Number(m[1])));
  expect(shifts.length).toBe(3);
  expect(Math.max(...shifts)).toBeLessThanOrEqual(16);
  const rules = css.replace(/\/\*[\s\S]*?\*\//g, "");
  expect(rules).not.toMatch(/gradient|box-shadow|filter: blur|drop-shadow/);
  // links and buttons fade colors over a short time
  expect(css).toMatch(/a,\s*button\s*{[^}]*transition-duration: 160ms/);
});

it("turns every animation off for people who prefer reduced motion", () => {
  const reduced = css.slice(css.indexOf("@media (prefers-reduced-motion: reduce)"));
  expect(reduced).toMatch(/animation-duration: 0\.01ms !important/);
  expect(reduced).toMatch(/transition-duration: 0\.01ms !important/);
  // entrance animations and scroll-driven reveals (which ignore duration) are switched off outright
  expect(reduced).toMatch(/\.animate-enter,\s*\.animate-pop,\s*\.reveal\s*{\s*animation: none !important/);
  // and the scroll reveal only exists where it is supported, so nothing is ever hidden without it
  expect(css).toMatch(/@supports \(animation-timeline: view\(\)\)\s*{\s*\.reveal/);
});

it("eases each public and dashboard page in through a route template", () => {
  const { container, unmount } = render(<PublicTemplate><p>public page</p></PublicTemplate>);
  expect(container.firstElementChild).toHaveClass("animate-enter");
  expect(screen.getByText("public page")).toBeInTheDocument();
  unmount();
  const dashboard = render(<DashboardTemplate><p>dashboard page</p></DashboardTemplate>);
  expect(dashboard.container.firstElementChild).toHaveClass("animate-enter");
});

it("fades the homepage tool cards and the About sections up as they scroll into view", () => {
  const home = render(<Home />);
  const tour = home.container.querySelectorAll("#overview, #sales, #weather, #forecasting, #inventory, #data-imports, #pipelines, #settings");
  expect(tour).toHaveLength(8);
  for (const item of tour) expect(item).toHaveClass("reveal");
  home.unmount();
  const about = render(<AboutPage />);
  const sections = about.container.querySelectorAll("section");
  expect(sections.length).toBe(6);
  for (const section of sections) expect(section).toHaveClass("reveal");
});

it("lifts the homepage hero buttons and tool cards 2px on hover, with an arrow cue on the cards, and none of it for reduced motion", () => {
  const home = render(<Home />);
  for (const name of ["Open dashboard", "Explore the demo"]) expect(screen.getByRole("link", { name })).toHaveClass("hover-lift");
  const cards = home.container.querySelectorAll("#overview > div, #sales > div, #weather > div, #forecasting > div, #inventory > div, #data-imports > div, #pipelines > div, #settings > div");
  expect(cards).toHaveLength(8);
  for (const card of cards) {
    expect(card).toHaveClass("hover-lift", "group");
    const arrow = card.querySelector('span[aria-hidden="true"].opacity-0');
    expect(arrow).toBeInTheDocument();
    expect(arrow).toHaveClass("group-hover:opacity-100", "group-focus-within:opacity-100");
  }
  home.unmount();
  const rules = css.replace(/\/\*[\s\S]*?\*\//g, "");
  expect(rules).toMatch(/\.hover-lift:hover\s*{\s*translate: 0 -2px;/);
  // individual transform properties (Tailwind v4 uses translate and scale) must be in the transition list, or they would snap
  expect(rules).toMatch(/a,\s*button\s*{[^}]*translate, scale;/);
  const reduced = rules.slice(rules.indexOf("@media (prefers-reduced-motion: reduce)"));
  expect(reduced).toMatch(/\.hover-lift:hover\s*{\s*translate: none !important/);
});

it("does not lift ordinary buttons or any other page on hover, and gives buttons a small press response", () => {
  const classes = buttonClasses("primary", "md");
  expect(classes).toContain("active:scale-[0.98]");
  expect(classes).not.toMatch(/hover:(-?translate|scale)|hover-lift/);
  const about = render(<AboutPage />);
  expect(about.container.querySelector(".hover-lift")).not.toBeInTheDocument();
});

it("pops menus in softly when they open", async () => {
  const user = userEvent.setup();
  const header = render(<SiteHeader />);
  await user.click(screen.getByRole("button", { name: "Open menu" }));
  expect(screen.getByRole("navigation", { name: "Mobile" })).toHaveClass("animate-pop");
  header.unmount();

  const account = render(<AccountMenu />);
  await user.click(screen.getByRole("button", { name: "Account menu" }));
  expect(screen.getByRole("group", { name: "Account" })).toHaveClass("animate-pop");
  account.unmount();

  render(<Sidebar />);
  const nav = screen.getByRole("navigation", { name: "Workspace" });
  expect(nav).not.toHaveClass("animate-pop");
  await user.click(screen.getByRole("button", { name: "Open workspace menu" }));
  expect(nav).toHaveClass("animate-pop", "lg:animate-none");
});
