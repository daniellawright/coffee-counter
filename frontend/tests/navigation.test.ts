import { describe, expect, it } from "vitest";
import { isActive, marketingNav } from "@/lib/navigation";

describe("workspace navigation matching", () => {
  it.each([
    ["/dashboard", "/dashboard", true],
    ["/dashboard/sales", "/dashboard", false],
    ["/", "/dashboard", false],
    ["/about", "/dashboard", false],
    ["/about", "/about", true],
    ["/about-other", "/about", false],
    ["/dashboard/sales", "/dashboard/sales", true],
    ["/dashboard/imports/batch-1", "/dashboard/imports", true],
    ["/dashboard/sales-other", "/dashboard/sales", false],
    ["/demo", "/dashboard", false],
  ])("matches %s against %s as %s", (path, href, expected) => {
    expect(isActive(path, href)).toBe(expected);
  });
});

it("points the public Dashboard link at /dashboard and the About link at /about", () => {
  expect(marketingNav.find((item) => item.label === "Dashboard")?.href).toBe("/dashboard");
  expect(marketingNav.find((item) => item.label === "About")?.href).toBe("/about");
});
