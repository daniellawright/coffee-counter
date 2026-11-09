import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteHeader } from "@/components/marketing/SiteHeader";

const navigation = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => navigation.pathname }));

it("opens and closes the mobile menu and closes it after navigation", async () => {
  const user = userEvent.setup();
  render(<SiteHeader />);
  expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Open menu" }));
  expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  await user.click(within(screen.getByRole("navigation", { name: "Mobile" })).getByRole("link", { name: "About" }));
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

const labels = (nav: HTMLElement) => within(nav).getAllByRole("link").map((link) => link.textContent);

it("is a solid dark brown bar with white text instead of a thin outline", () => {
  render(<SiteHeader />);
  const header = screen.getByRole("banner");
  expect(header).toHaveClass("bg-espresso", "text-white");
  expect(header.className).not.toMatch(/border-b|border-espresso/);
  const main = within(screen.getByRole("navigation", { name: "Main" }));
  expect(main.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  expect(main.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
});

it("signed out: no Dashboard link, Explore Demo stays a regular link, Log In and Get Started show", async () => {
  const user = userEvent.setup();
  render(<SiteHeader />);
  const desktop = screen.getByRole("navigation", { name: "Main" });
  expect(labels(desktop)).toEqual(["Home", "About", "Explore Demo"]);
  expect(within(desktop).getByRole("link", { name: "Explore Demo" })).toHaveAttribute("href", "/demo");
  expect(screen.getByRole("link", { name: "Log In" })).toHaveAttribute("href", "/login");
  expect(screen.getByRole("link", { name: "Get Started" })).toHaveAttribute("href", "/register");
  expect(screen.queryByRole("link", { name: /Dashboard/ })).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "Account menu" })).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Open menu" }));
  const mobile = screen.getByRole("navigation", { name: "Mobile" });
  expect(labels(mobile)).toEqual(["Home", "About", "Explore Demo", "Log In", "Get Started"]);
});

it("signed in: Dashboard joins the links (after Home), and Log In / Get Started become Open Dashboard and an account menu", async () => {
  const user = userEvent.setup();
  render(<SiteHeader signedIn />);
  const desktop = screen.getByRole("navigation", { name: "Main" });
  expect(labels(desktop)).toEqual(["Home", "Dashboard", "About", "Explore Demo"]);
  expect(within(desktop).getByRole("link", { name: "Dashboard" })).toHaveAttribute("href", "/dashboard");
  expect(within(desktop).getByRole("link", { name: "Explore Demo" })).toHaveAttribute("href", "/demo");
  expect(screen.getByRole("link", { name: "Open Dashboard" })).toHaveAttribute("href", "/dashboard");
  expect(screen.queryByRole("link", { name: "Log In" })).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "Get Started" })).not.toBeInTheDocument();

  const menuButton = screen.getByRole("button", { name: "Account menu" });
  expect(menuButton).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("link", { name: "Settings" })).not.toBeInTheDocument();
  await user.click(menuButton);
  expect(menuButton).toHaveAttribute("aria-expanded", "true");
  expect(within(screen.getByRole("group", { name: "Account" })).getByRole("link", { name: "Settings" })).toHaveAttribute("href", "/dashboard/settings");
  // Escape closes it and returns focus to the button
  await user.keyboard("{Escape}");
  expect(menuButton).toHaveAttribute("aria-expanded", "false");
  expect(menuButton).toHaveFocus();
  // clicking elsewhere closes it too
  await user.click(menuButton);
  await user.click(document.body);
  expect(screen.queryByRole("group", { name: "Account" })).not.toBeInTheDocument();
  // choosing Settings closes it
  await user.click(menuButton);
  await user.click(screen.getByRole("link", { name: "Settings" }));
  expect(screen.queryByRole("group", { name: "Account" })).not.toBeInTheDocument();
});

it("signed in on mobile: Dashboard, Settings, and an Open Dashboard button replace Log In and Get Started", async () => {
  const user = userEvent.setup();
  render(<SiteHeader signedIn />);
  await user.click(screen.getByRole("button", { name: "Open menu" }));
  const mobile = screen.getByRole("navigation", { name: "Mobile" });
  expect(labels(mobile)).toEqual(["Home", "Dashboard", "About", "Explore Demo", "Settings", "Open Dashboard"]);
  expect(within(mobile).queryByRole("link", { name: "Log In" })).not.toBeInTheDocument();
});

it("links to the author's website from the footer", () => {
  render(<SiteFooter />);
  const link = screen.getByRole("link", { name: "daniellawright.com" });
  expect(link).toHaveAttribute("href", "https://daniellawright.com/");
  expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
});

it("footer shows Dashboard only after sign-in, and Log In / Get Started only before it", () => {
  const { unmount } = render(<SiteFooter />);
  const out = within(screen.getByRole("navigation", { name: "Footer" }));
  expect(out.queryByRole("link", { name: "Dashboard" })).not.toBeInTheDocument();
  expect(out.getByRole("link", { name: "Explore Demo" })).toHaveAttribute("href", "/demo");
  expect(out.getByRole("link", { name: "Log In" })).toBeInTheDocument();
  expect(out.getByRole("link", { name: "Get Started" })).toBeInTheDocument();
  unmount();
  render(<SiteFooter signedIn />);
  const signedIn = within(screen.getByRole("navigation", { name: "Footer" }));
  expect(signedIn.getByRole("link", { name: "Dashboard" })).toHaveAttribute("href", "/dashboard");
  expect(signedIn.queryByRole("link", { name: "Log In" })).not.toBeInTheDocument();
  expect(signedIn.queryByRole("link", { name: "Get Started" })).not.toBeInTheDocument();
});

const current = (nav: HTMLElement) => within(nav).queryAllByRole("link", { current: "page" }).map((link) => link.textContent);

it.each([
  ["/", ["Home"]],
  ["/about", ["About"]],
  ["/demo", ["Explore Demo"]],
  ["/login", []],
])("marks the current page in the desktop nav at %s", (path, expected) => {
  navigation.pathname = path;
  render(<SiteHeader />);
  const desktop = screen.getByRole("navigation", { name: "Main" });
  expect(current(desktop)).toEqual(expected);
  // marked visually too: a lighter pill on the current link only, and no underline anywhere
  for (const link of within(desktop).getAllByRole("link")) {
    const isCurrent = expected.includes(link.textContent ?? "");
    expect(link.classList.contains("bg-white/10")).toBe(isCurrent);
    expect(link.className).not.toMatch(/after:|underline|border-b/);
  }
});

it("marks Log In and Get Started when on those pages, and Dashboard and its sub-pages when signed in", () => {
  navigation.pathname = "/login";
  const { unmount } = render(<SiteHeader />);
  expect(screen.getByRole("link", { name: "Log In" })).toHaveAttribute("aria-current", "page");
  expect(screen.getByRole("link", { name: "Get Started" })).not.toHaveAttribute("aria-current");
  unmount();
  navigation.pathname = "/register";
  const second = render(<SiteHeader />);
  expect(screen.getByRole("link", { name: "Get Started" })).toHaveAttribute("aria-current", "page");
  second.unmount();
  navigation.pathname = "/dashboard/sales";
  render(<SiteHeader signedIn />);
  expect(current(screen.getByRole("navigation", { name: "Main" }))).toEqual(["Dashboard"]);
});

it("marks the current page in the mobile menu too", async () => {
  const user = userEvent.setup();
  navigation.pathname = "/about";
  render(<SiteHeader />);
  await user.click(screen.getByRole("button", { name: "Open menu" }));
  const mobile = screen.getByRole("navigation", { name: "Mobile" });
  expect(current(mobile)).toEqual(["About"]);
  expect(within(mobile).getByRole("link", { name: "About" }).className).toContain("before:bg-caramel");
  expect(within(mobile).getByRole("link", { name: "Home" }).className).not.toContain("before:bg-caramel");
});
