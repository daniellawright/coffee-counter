import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Logo, LogoMark } from "@/components/brand/Logo";
import { brand } from "@/lib/brand";

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

it("uses no purple (lilac) anywhere in the app: the palette is espresso, caramel, and white", () => {
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (/\.(tsx?|css|svg)$/.test(entry.name)) files.push(path);
    }
  };
  for (const dir of ["app", "components", "lib"]) walk(join(process.cwd(), dir));
  expect(files.length).toBeGreaterThan(20);
  const offenders = files.filter((file) => /lilac|#c4bfdf/i.test(readFileSync(file, "utf8")));
  expect(offenders).toEqual([]);
  expect(Object.keys(brand)).toEqual(["espresso", "caramel", "white"]);
});
