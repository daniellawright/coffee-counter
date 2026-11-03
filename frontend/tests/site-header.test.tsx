import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { SiteHeader } from "@/components/marketing/SiteHeader";

it("opens and closes the mobile menu and closes it after navigation", async () => {
  const user = userEvent.setup();
  render(<SiteHeader />);
  expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Open menu" }));
  expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  await user.click(within(screen.getByRole("navigation", { name: "Mobile" })).getByRole("link", { name: "About CoffeeCounter" }));
  expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Open menu" }));
  await user.click(screen.getByRole("button", { name: "Close menu" }));
  expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
});

it("closes registration navigation and restores focus on Escape", async () => {
  const user = userEvent.setup();
  render(<SiteHeader />);
  await user.click(screen.getByRole("button", { name: "Open menu" }));
  await user.click(within(screen.getByRole("navigation", { name: "Mobile" })).getByRole("link", { name: "Get Started" }));
  expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Open menu" }));
  await user.keyboard("{Escape}");
  expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
});
