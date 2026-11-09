import { describe, expect, it } from "vitest";
import { isActive, isCurrentPage, marketingLinks, marketingNav } from "@/lib/navigation";

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

it("lists Home first, linking to the homepage, and keeps Dashboard (and About) pointing at the right pages", () => {
  expect(marketingNav[0]).toMatchObject({ label: "Home", href: "/" });
  expect(marketingNav.find((item) => item.label === "Dashboard")?.href).toBe("/dashboard");
  expect(marketingNav.find((item) => item.label === "About")?.href).toBe("/about");
});

it("shows Dashboard only to signed-in visitors, and Explore Demo to everyone", () => {
  expect(marketingLinks(false).map((item) => item.label)).toEqual(["Home", "About", "Explore Demo"]);
  expect(marketingLinks(true).map((item) => item.label)).toEqual(["Home", "Dashboard", "About", "Explore Demo"]);
  expect(marketingLinks(false).find((item) => item.label === "Explore Demo")?.href).toBe("/demo");
});

it.each([
  ["/", "/", true],
  ["/about", "/", false],
  ["/about", "/about", true],
  ["/about/team", "/about", true],
  ["/about-other", "/about", false],
  ["/demo", "/demo", true],
  ["/dashboard/sales", "/dashboard", true],
  [null, "/", false],
])("public header: %s is current for %s: %s", (path, href, expected) => {
  expect(isCurrentPage(path, href)).toBe(expected);
});
