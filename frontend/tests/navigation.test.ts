import { describe, expect, it } from "vitest";
import { isActive } from "@/lib/navigation";

describe("workspace navigation matching", () => {
  it.each([
    ["/", "/", true],
    ["/dashboard/sales", "/", false],
    ["/about", "/", false],
    ["/about", "/about", true],
    ["/about-other", "/about", false],
    ["/dashboard/sales", "/dashboard/sales", true],
    ["/dashboard/imports/batch-1", "/dashboard/imports", true],
    ["/dashboard/sales-other", "/dashboard/sales", false],
    ["/demo", "/", false],
  ])("matches %s against %s as %s", (path, href, expected) => {
    expect(isActive(path, href)).toBe(expected);
  });
});
