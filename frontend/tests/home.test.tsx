import { render, screen, within } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import Home from "@/app/page";
import AboutPage from "@/app/about/page";
import LegacyDashboard from "@/app/dashboard/page";
import { counterMetrics, features, importSteps } from "@/lib/content";

const navigation = vi.hoisted(() => ({ pathname: "/", permanentRedirect: vi.fn() }));
vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
  permanentRedirect: navigation.permanentRedirect,
}));

it("opens the dashboard directly at home with Overview selected", () => {
  navigation.pathname = "/";
  render(<Home />);
  const main = within(screen.getByRole("main"));
  expect(main.getByRole("heading", { level: 1, name: "Overview" })).toBeInTheDocument();
  for (const metric of counterMetrics) expect(main.getByText(metric.label)).toBeInTheDocument();
  expect(main.getAllByText("No data yet")).toHaveLength(counterMetrics.length);
  expect(main.getByText(/Nothing to count yet/)).toBeInTheDocument();
  for (const figure of main.getAllByRole("definition")) expect(figure.textContent).not.toMatch(/\d/);
  expect(main.getByRole("link", { name: "How imports will work" })).toHaveAttribute("href", "/about#how-it-works");
  const nav = within(screen.getByRole("navigation", { name: "Workspace" }));
  expect(nav.getByRole("link", { current: "page" })).toHaveTextContent("Overview");
  expect(nav.getByRole("link", { name: "Overview" })).toHaveAttribute("href", "/");
  expect(nav.getByRole("link", { name: "About CoffeeCounter" })).toHaveAttribute("href", "/about");
  expect(screen.queryByRole("navigation", { name: "Main" })).not.toBeInTheDocument();
  expect(screen.queryByText("Every coffee counts!")).not.toBeInTheDocument();
});

it("puts product information and the import explanation inside the workspace", () => {
  navigation.pathname = "/about";
  const { container } = render(<AboutPage />);
  expect(screen.getByRole("heading", { level: 1, name: "About CoffeeCounter" })).toBeInTheDocument();
  expect(screen.getByRole("link", { current: "page" })).toHaveTextContent("About CoffeeCounter");
  expect(screen.getByText(/Sales analytics, demo data, uploads, and accounts are not available yet/)).toBeInTheDocument();
  expect(container.querySelector("#how-it-works")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Open dashboard" })).toHaveAttribute("href", "/");
  const receipt = within(screen.getByRole("article", { name: "CoffeeCounter receipt" }));
  for (const feature of features) expect(receipt.getByText(feature.title)).toBeInTheDocument();
  expect(receipt.getAllByText("Brewing*")).toHaveLength(features.length);
  expect(receipt.getByText(/Brewing: in development/)).toBeInTheDocument();
  expect(within(receipt.getByRole("list")).getAllByRole("listitem")).toHaveLength(importSteps.length);
});

it("keeps old dashboard bookmarks working through a redirect", () => {
  LegacyDashboard();
  expect(navigation.permanentRedirect).toHaveBeenCalledWith("/");
});
