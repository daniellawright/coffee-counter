import { render, screen, within } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import Home from "@/app/(public)/page";
import AboutPage from "@/app/about/page";
import DashboardLayout from "@/app/dashboard/layout";
import DashboardPage from "@/app/dashboard/page";
import { answerLines, counterMetrics, features, guessworkLines, importSteps } from "@/lib/content";

const navigation = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => navigation.pathname }));

it("opens with the catchphrase, the problem, and what CoffeeCounter is for", () => {
  navigation.pathname = "/";
  render(<Home />);
  expect(screen.getByRole("heading", { level: 1, name: "Every cup counts." })).toHaveClass("font-display");
  expect(screen.getByText(/sit on months of sales records they never get to use/)).toBeInTheDocument();
  expect(screen.getByText(/is being built to turn those files into a clear picture/)).toBeInTheDocument();
  expect(screen.queryByRole("navigation", { name: "Workspace" })).not.toBeInTheDocument();
});

it("links to the dashboard and the demo, and describes the sample-data demo honestly", () => {
  render(<Home />);
  expect(screen.getByRole("link", { name: "Open dashboard" })).toHaveAttribute("href", "/dashboard");
  expect(screen.getByRole("link", { name: "Explore the demo" })).toHaveAttribute("href", "/demo");
  const sample = within(screen.getByRole("region", { name: "Try it with sample data" }));
  expect(sample.getByText(/public dataset of real coffee vending machine sales/)).toBeInTheDocument();
  expect(sample.getByText(/It isn’t connected yet/)).toBeInTheDocument();
  expect(sample.getByText(/No numbers are made up/)).toBeInTheDocument();
});

it("shows two different receipts that rise in turn, one per delay, with honest in-development copy", () => {
  const { container } = render(<Home />);
  const without = within(screen.getByRole("article", { name: "Receipt: without counting" }));
  for (const line of guessworkLines) expect(without.getByText(line.label)).toBeInTheDocument();
  expect(without.getByText("Cups counted")).toBeInTheDocument();
  expect(without.getByText("none")).toBeInTheDocument();
  expect(without.queryByText("Brewing")).not.toBeInTheDocument();
  const withApp = within(screen.getByRole("article", { name: "Receipt: with CoffeeCounter" }));
  for (const line of answerLines) expect(withApp.getByText(line.label)).toBeInTheDocument();
  expect(withApp.getAllByText("Brewing")).toHaveLength(answerLines.length);
  expect(withApp.getByText(/Brewing: in development/)).toBeInTheDocument();
  // different paper for contrast: white for the guesswork receipt, lilac for CoffeeCounter's
  expect(container.querySelector('article[aria-label="Receipt: without counting"] .bg-white')).toBeInTheDocument();
  expect(container.querySelector('article[aria-label="Receipt: with CoffeeCounter"] .bg-lilac')).toBeInTheDocument();
  expect(container.querySelector('article[aria-label="Receipt: without counting"] .bg-lilac')).not.toBeInTheDocument();
  const delays = [...container.querySelectorAll<HTMLElement>(".receipt-rise")].map((el) => el.style.getPropertyValue("--rise-delay"));
  expect(delays).toEqual(["0ms", "1100ms"]);
  expect(Number.parseInt(delays[1])).toBeGreaterThan(Number.parseInt(delays[0]));
  // jsdom has no IntersectionObserver, so the block reveals immediately.
  expect(container.querySelector("[data-revealed]")).toHaveAttribute("data-revealed", "true");
});

it("serves the workspace overview at /dashboard with Overview selected", () => {
  navigation.pathname = "/dashboard";
  render(<DashboardLayout><DashboardPage /></DashboardLayout>);
  const main = within(screen.getByRole("main"));
  expect(main.getByRole("heading", { level: 1, name: "Overview" })).toBeInTheDocument();
  for (const metric of counterMetrics) expect(main.getByText(metric.label)).toBeInTheDocument();
  expect(main.getAllByText("No data yet")).toHaveLength(counterMetrics.length);
  expect(main.getByText(/Nothing to count yet/)).toBeInTheDocument();
  for (const figure of main.getAllByRole("definition")) expect(figure.textContent).not.toMatch(/\d/);
  expect(main.getByRole("link", { name: /How imports will work/ })).toHaveAttribute("href", "/about#how-it-works");
  const nav = within(screen.getByRole("navigation", { name: "Workspace" }));
  expect(nav.getByRole("link", { current: "page" })).toHaveTextContent("Overview");
  expect(nav.getByRole("link", { name: "Overview" })).toHaveAttribute("href", "/dashboard");
  expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  expect(screen.getByRole("link", { name: "CoffeeCounter home" })).toHaveAttribute("href", "/");
  expect(screen.queryByRole("navigation", { name: "Main" })).not.toBeInTheDocument();
});

it("puts product information, the Claude disclaimer, and the import explanation inside the workspace", () => {
  navigation.pathname = "/about";
  const { container } = render(<AboutPage />);
  expect(screen.getByRole("heading", { level: 1, name: "About" })).toBeInTheDocument();
  expect(screen.getByRole("link", { current: "page" })).toHaveTextContent("About");
  expect(screen.getByText(/Sales analytics, demo data, uploads, and accounts are not available yet/)).toBeInTheDocument();
  const disclaimer = within(screen.getByRole("region", { name: "Disclaimer" }));
  expect(disclaimer.getByText(/Claude, an AI assistant made by Anthropic, was used as an assistant for this project/)).toBeInTheDocument();
  expect(container.querySelector("#how-it-works")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Open dashboard" })).toHaveAttribute("href", "/dashboard");
  const receipt = within(screen.getByRole("article", { name: "CoffeeCounter receipt" }));
  for (const feature of features) expect(receipt.getByText(feature.title)).toBeInTheDocument();
  expect(receipt.getAllByText("Brewing")).toHaveLength(features.length);
  expect(receipt.getByText(/Brewing: in development/)).toBeInTheDocument();
  expect(within(receipt.getByRole("list")).getAllByRole("listitem")).toHaveLength(importSteps.length);
});
