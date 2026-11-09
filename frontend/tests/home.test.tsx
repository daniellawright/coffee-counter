import { render, screen, within } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import Home from "@/app/(public)/page";
import AboutPage from "@/app/(public)/about/page";
import DashboardLayout from "@/app/dashboard/layout";
import DashboardPage from "@/app/dashboard/page";
import { counterMetrics, dashboardSections } from "@/lib/content";
import { dashboardNav } from "@/lib/navigation";

const navigation = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => navigation.pathname }));

const website = "https://daniellawright.com/";

it("opens with the catchphrase and the problem, with no symbol above it and no receipts", () => {
  navigation.pathname = "/";
  render(<Home />);
  const h1 = screen.getByRole("heading", { level: 1, name: "Every cup counts!" });
  expect(h1).toHaveClass("font-display");
  // nothing (no tally marks or other graphic) sits above the heading
  expect(h1.previousElementSibling).toBeNull();
  expect(screen.getByText("Coffee shops can have months of sales records without ever getting the chance to discover what those numbers might reveal.")).toBeInTheDocument();
  expect(screen.getByText("Sales data often comes from point-of-sale systems and spreadsheets. This dashboard brings everything together to make it easier to spot patterns, discover your customers' favorite drinks, and make decisions about what to stock, when to staff, and what to prepare.")).toBeInTheDocument();
  expect(screen.queryByRole("article")).not.toBeInTheDocument();
  expect(screen.queryByRole("navigation", { name: "Workspace" })).not.toBeInTheDocument();
});

it("links to the dashboard and the demo, and describes what the demo will use", () => {
  render(<Home />);
  expect(screen.getByRole("link", { name: "Open dashboard" })).toHaveAttribute("href", "/dashboard");
  expect(screen.getByRole("link", { name: "Explore the demo" })).toHaveAttribute("href", "/demo");
  const demo = within(screen.getByRole("region", { name: "About the demo" }));
  expect(demo.getByText("The demo will use a publicly available dataset of real coffee vending machine sales, so you can explore the dashboard without creating an account or uploading your own data.")).toBeInTheDocument();
  // the under-construction notice now lives on the dashboard, not the homepage
  expect(screen.queryByText(/still under construction/)).not.toBeInTheDocument();
});

it("shows a temporary full-width under-construction bar at the very top of dashboard pages", () => {
  navigation.pathname = "/dashboard";
  const { container } = render(<DashboardLayout><DashboardPage /></DashboardLayout>);
  const bar = screen.getByRole("status");
  expect(bar).toHaveTextContent("Backend is under construction so the dashboard will be empty for now!");
  expect(bar.querySelector("svg")).toBeInTheDocument();
  // it is the first thing on the page, outside both the sidebar and the main column
  expect(container.firstElementChild!.firstElementChild).toBe(bar);
  expect(screen.getByRole("main")).not.toContainElement(bar);
  expect(bar).toHaveClass("sticky", "top-0");
  // the old in-content banner wording is gone
  expect(screen.queryByText(/still under construction/)).not.toBeInTheDocument();
});

it("shows every dashboard tool as its own full-width card, in the author's wording, linked to its page", () => {
  const { container } = render(<Home />);
  const tour = within(screen.getByRole("region", { name: "What’s inside the dashboard" }));
  expect(tour.getByText("Here’s a quick look at what each tool in the dashboard does:")).toBeInTheDocument();
  expect(dashboardSections).toHaveLength(dashboardNav.length);
  expect(tour.getAllByRole("listitem")).toHaveLength(dashboardNav.length);
  for (const section of dashboardSections) {
    const nav = dashboardNav.find((item) => item.href === section.href);
    expect(nav).toBeDefined();
    const heading = tour.getByRole("heading", { level: 3, name: nav!.label });
    expect(within(heading).getByRole("link", { name: nav!.label })).toHaveAttribute("href", section.href);
    for (const paragraph of section.body) expect(tour.getByText(paragraph)).toBeInTheDocument();
    const item = container.querySelector(`#${section.id}`)!;
    expect(item).toBeInTheDocument();
    // one card per row, with a plain icon and no lilac badge
    expect(item.className).not.toMatch(/col-span|w-1\/2/);
    expect(item.querySelector("svg")).toBeInTheDocument();
    expect(item.innerHTML).not.toMatch(/lilac/);
  }
  expect(tour.getAllByRole("list")).toHaveLength(1);
  expect(tour.getByRole("list").className).not.toMatch(/grid/);
  // the Overview and placeholder pages link here to explain how imports will work
  expect(container.querySelector("#data-imports")).toHaveTextContent(/CSV or Excel/);
});

it("serves the workspace overview at /dashboard with Overview selected and no About item", () => {
  navigation.pathname = "/dashboard";
  render(<DashboardLayout><DashboardPage /></DashboardLayout>);
  const main = within(screen.getByRole("main"));
  expect(main.getByRole("heading", { level: 1, name: "Overview" })).toBeInTheDocument();
  for (const metric of counterMetrics) expect(main.getByText(metric.label)).toBeInTheDocument();
  expect(main.getAllByText("No data yet")).toHaveLength(counterMetrics.length);
  expect(main.getByText(/Nothing to count yet/)).toBeInTheDocument();
  // metric icons sit on espresso tiles, not purple badges
  expect(screen.getByRole("main").innerHTML).not.toMatch(/lilac/);
  expect(screen.getByRole("main").querySelectorAll("dt span.bg-espresso")).toHaveLength(counterMetrics.length);
  for (const figure of main.getAllByRole("definition")) expect(figure.textContent).not.toMatch(/\d/);
  expect(main.getByRole("link", { name: /How imports will work/ })).toHaveAttribute("href", "/#data-imports");
  const nav = within(screen.getByRole("navigation", { name: "Workspace" }));
  expect(nav.getByRole("link", { current: "page" })).toHaveTextContent("Overview");
  expect(nav.getByRole("link", { name: "Overview" })).toHaveAttribute("href", "/dashboard");
  expect(nav.queryByRole("link", { name: /About/ })).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "CoffeeCounter home" })).toHaveAttribute("href", "/");
  expect(screen.queryByRole("navigation", { name: "Main" })).not.toBeInTheDocument();
});

it("lays About out like the demo, log in, and get started pages", () => {
  navigation.pathname = "/about";
  const { container: about } = render(<AboutPage />);
  // same opening as the placeholder pages: a left-aligned PageHeader title with a hairline beneath
  const h1 = screen.getByRole("heading", { level: 1, name: "About" });
  expect(h1).toHaveClass("font-display");
  expect(h1.parentElement).toHaveClass("border-b", "border-line");
  expect(about.firstElementChild).toHaveClass("py-14");
  // the hairline sits directly under the title, as on Log in and Get started: no text inside the header
  expect(h1.parentElement!.querySelector("p")).not.toBeInTheDocument();
  expect(h1.parentElement!.textContent).toBe("About");
  // the opening paragraph now sits under its own subtitle, first after the separator
  const intro = screen.getByRole("region", { name: "What is CoffeeCounter?" });
  expect(h1.parentElement!.compareDocumentPosition(intro) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(within(intro).getByText(/^CoffeeCounter turns your coffee shop’s sales records into something easy to understand./)).toBeInTheDocument();
  expect(screen.queryByRole("heading", { level: 2, name: "About" })).not.toBeInTheDocument();
  // the same icon-badge blocks as EmptyState, one per section, in the order supplied
  const titles = screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent);
  expect(titles).toEqual(["What is CoffeeCounter?", "Sample data", "Your own data", "Where the idea came from", "Find me online", "Disclaimer"]);
  for (const heading of screen.getAllByRole("heading", { level: 2 })) {
    expect(heading.parentElement!.querySelector("svg")).toBeInTheDocument();
    expect(heading.parentElement!.firstElementChild).toHaveClass("bg-espresso", "text-white");
    expect(heading.parentElement!.innerHTML).not.toMatch(/lilac/);
  }
  // the old story-card layout is gone
  expect(about.querySelector(".md\:flex-row")).not.toBeInTheDocument();
  expect(screen.queryByRole("navigation", { name: "Workspace" })).not.toBeInTheDocument();
});

it("shows the About text exactly as the author wrote it", () => {
  render(<AboutPage />);
  const text = [
    "CoffeeCounter turns your coffee shop’s sales records into something easy to understand. Discover your customers’ favorite drinks, your busiest hours, and how your sales change over time. Simply upload a CSV file from your point-of-sale system and explore your data through clear visuals and wording anyone can understand.",
    "Since the dataset doesn’t include a location, it can’t be used to explore how weather affects drink choices. Weather comparisons require sales data from a shop with a known location.",
    "When you’re ready to explore your own sales data, you’ll be asked to match your file’s columns to the information the dashboard needs. This helps CoffeeCounter work with the different file formats coffee shops use.",
    "I absolutely love coffee and visiting coffee shops. Sometimes, while I’m there, I wonder about the numbers behind it all. Do people’s orders follow a pattern? When does it get busiest? Does the weather change what people order? I know it certainly does for me!",
    "Those questions inspired me to build CoffeeCounter and see what real data could reveal.",
    "My name is Daniella, and I created CoffeeCounter to gain practical experience with data engineering and data science workflows while building something for my portfolio!",
    "I’ve had a lot of fun working on this project. If you’d like to get in touch or explore more of my work, you can find me here:",
    "Claude was used as an assistant during the development of this project.",
  ];
  for (const paragraph of text) expect(screen.getByText(paragraph)).toBeInTheDocument();
  // the sample-data sentence contains the dataset link, so check its full text
  const dataset = screen.getByRole("link", { name: "“Coffee Sales” dataset by Yaroslav Isaienkov" });
  expect(dataset.parentElement!.textContent).toBe(
    "Try the dashboard without uploading anything of your own! The demo uses the public “Coffee Sales” dataset by Yaroslav Isaienkov on Kaggle, which contains real coffee vending machine sales.",
  );
  expect(screen.getByText(/Fonts: Young Serif, Schibsted Grotesk, and Spline Sans Mono\. Icons:/).textContent).toBe(
    "Fonts: Young Serif, Schibsted Grotesk, and Spline Sans Mono. Icons: Tabler Icons by Paweł Kuna, used under the MIT license.",
  );
});

it("links the Kaggle dataset, LinkedIn, email, her website, and Tabler Icons from About", () => {
  render(<AboutPage />);
  const dataset = screen.getByRole("link", { name: "“Coffee Sales” dataset by Yaroslav Isaienkov" });
  expect(dataset).toHaveAttribute("href", "https://www.kaggle.com/datasets/ihelon/coffee-sales");
  expect(dataset).toHaveAttribute("target", "_blank");
  expect(dataset).toHaveAttribute("rel", expect.stringContaining("noopener"));
  const online = within(screen.getByRole("region", { name: "Find me online" }));
  expect(online.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/daniella-wright/");
  expect(online.getByRole("link", { name: "Email" })).toHaveAttribute("href", "mailto:wrightnogueda@wisc.edu");
  expect(online.getByRole("link", { name: "Website" })).toHaveAttribute("href", website);
  for (const name of ["LinkedIn", "Website"]) {
    const link = online.getByRole("link", { name });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  }
  expect(online.getByRole("link", { name: "LinkedIn" }).parentElement!.textContent).toBe("LinkedIn · Email · Website");
  const disclaimer = within(screen.getByRole("region", { name: "Disclaimer" }));
  expect(disclaimer.getByRole("link", { name: "Tabler Icons" })).toHaveAttribute("href", "https://github.com/tabler/tabler-icons");
});
