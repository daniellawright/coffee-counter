import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Logo, LogoMark } from "@/components/brand/Logo";

it("provides brand text while keeping the adjacent mark decorative", () => {
  const { container } = render(<Logo />);
  expect(screen.getByText("CoffeeCounter")).toBeInTheDocument();
  expect(container.querySelector("img")).toHaveAttribute("aria-hidden", "true");
  expect(container.querySelector("img")?.getAttribute("src")).toContain("coffee-counter-logo.svg");
});

it("gives a standalone titled logo an accessible name", () => {
  render(<LogoMark title="CoffeeCounter" />);
  expect(screen.getByRole("img", { name: "CoffeeCounter" })).toBeInTheDocument();
});
