/*
 * What each dashboard tool does, shown on the homepage. Titles and icons come from
 * `dashboardNav` (matched by `href`); `id` is the anchor on the homepage; `body` is one
 * string per paragraph. This is the author's own wording: do not edit it without asking.
 */
export type DashboardSection = { id: string; href: string; body: string[] };

export const dashboardSections: DashboardSection[] = [
  {
    id: "overview",
    href: "/dashboard",
    body: [
      "The best place to get a quick look at how your shop is doing. See your total revenue, number of orders, average purchase amount, and how your sales are growing, all in just a few seconds.",
    ],
  },
  {
    id: "sales",
    href: "/dashboard/sales",
    body: [
      "Find out which drinks are your customers' favorites, which ones aren't as popular, your busiest hours, and which days bring in the most sales.",
    ],
  },
  {
    id: "weather",
    href: "/dashboard/weather",
    body: [
      "Do people order differently when it's rainy or cold? This tool compares your sales with the weather at your store's location to help you discover any patterns.",
    ],
  },
  {
    id: "forecasting",
    href: "/dashboard/forecast",
    body: ["Get an estimate of how many drinks you might sell tomorrow or next week, based on your past sales."],
  },
  {
    id: "inventory",
    href: "/dashboard/inventory",
    body: [
      "Turns your sales forecast into a suggested prep list! How many beans, how much milk, and how many cups you might need. You can even add your own recipes so the estimates match how you make your drinks.",
    ],
  },
  {
    id: "data-imports",
    href: "/dashboard/imports",
    body: [
      "This is the first step to learning more about your sales! Upload a CSV or Excel file exported from your point-of-sale (POS) system, the system you use to process customer purchases.",
      "You'll then be asked to match your columns and fill in any missing information the dashboard needs.",
    ],
  },
  {
    id: "pipelines",
    href: "/dashboard/pipelines",
    body: [
      "Get a better look at what's happening behind the scenes. See when your data was last updated, whether your latest import was successful, and what went wrong if something didn't work.",
    ],
  },
  {
    id: "settings",
    href: "/dashboard/settings",
    body: ["Manage your business details and store locations."],
  },
];

/** Headline figures for the overview. Values stay null until processed sales exist. */
export const counterMetrics: readonly { label: string; value: string | null }[] = [
  { label: "Total revenue", value: null },
  { label: "Transactions", value: null },
  { label: "Average purchase", value: null },
  { label: "Sales growth", value: null },
];
