import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { FeaturePlaceholder } from "@/components/dashboard/FeaturePlaceholder";
import { PublicPlaceholder } from "@/components/marketing/PublicPlaceholder";
import { dashboardNav } from "@/lib/navigation";
import { dashboardPlaceholders, publicPlaceholders, type DashboardFeature } from "@/lib/placeholders";

vi.mock("next/navigation", () => ({ usePathname: () => "/dashboard/imports/batch-1" }));

it("marks only the active section and supports mobile navigation and Escape", async () => {
  const user = userEvent.setup();
  render(<Sidebar />);
  const nav = within(screen.getByRole("navigation", { name: "Workspace" }));
  expect(nav.getAllByRole("link", { current: "page" })).toHaveLength(1);
  expect(nav.getByRole("link", { name: "Data Imports" })).toHaveAttribute("aria-current", "page");
  for (const item of dashboardNav) expect(nav.getByRole("link", { name: item.label })).toHaveAttribute("href", item.href);
  await user.click(screen.getByRole("button", { name: "Open workspace menu" }));
  await user.click(nav.getByRole("link", { name: "Data Imports" }));
  expect(screen.getByRole("button", { name: "Open workspace menu" })).toHaveAttribute("aria-expanded", "false");
  await user.click(screen.getByRole("button", { name: "Open workspace menu" }));
  await user.keyboard("{Escape}");
  expect(screen.getByRole("button", { name: "Open workspace menu" })).toHaveFocus();
});

it("keeps account access in the rail and shows labels to assistive tech while collapsed", () => {
  render(<Sidebar />);
  const nav = within(screen.getByRole("navigation", { name: "Workspace" }));
  expect(nav.getByRole("link", { name: "Account" })).toHaveAttribute("href", "/login");
  for (const item of dashboardNav) expect(nav.getByText(item.label)).toBeInTheDocument();
  expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
});

it.each(Object.keys(dashboardPlaceholders) as DashboardFeature[])("explains the unavailable %s feature", (feature) => {
  render(<FeaturePlaceholder feature={feature} />);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/not available yet/);
  expect(screen.getByRole("link", { name: "About CoffeeCounter" })).toHaveAttribute("href", "/about");
});

it.each(Object.keys(publicPlaceholders) as (keyof typeof publicPlaceholders)[])("provides an honest %s placeholder with a working next step", (feature) => {
  render(<PublicPlaceholder feature={feature} />);
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/not available yet/);
  expect(screen.getByRole("link")).toHaveAttribute("href", publicPlaceholders[feature].href);
  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
});
