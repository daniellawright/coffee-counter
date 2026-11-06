export const dashboardPlaceholders = {
  sales: { href: "/dashboard/sales", title: "Sales analytics are not available yet", body: "Product rankings, busy hours, and sales comparisons will use your processed transactions. No sales data is connected yet." },
  weather: { href: "/dashboard/weather", title: "Weather insights are not available yet", body: "Weather comparisons will need sales history and a verified store location. We will not assume a location for a dataset." },
  forecast: { href: "/dashboard/forecast", title: "Forecasts are not available yet", body: "Demand estimates will need enough sales history to evaluate a forecast. No predictions have been generated." },
  inventory: { href: "/dashboard/inventory", title: "Inventory planning is not available yet", body: "Ingredient estimates will need your recipes, stock levels, and evaluated demand forecasts. Inventory setup is still in development." },
  imports: { href: "/dashboard/imports", title: "Data imports are not available yet", body: "CSV and Excel uploads, column mapping, validation, and import history are still in development. No files can be uploaded or stored yet." },
  pipelines: { href: "/dashboard/pipelines", title: "Pipeline monitoring is not available yet", body: "Ingestion, transformation, and data quality runs will be reported here once the pipelines are connected. No jobs have run." },
  settings: { href: "/dashboard/settings", title: "Business settings are not available yet", body: "Account registration, business profiles, and store settings are still in development. This preview is not a private or authenticated workspace." },
} as const;

export type DashboardFeature = keyof typeof dashboardPlaceholders;

export const publicPlaceholders = {
  demo: { heading: "Explore the demo", title: "The demo is not available yet", body: "The public demo will use real coffee vending machine sales, with its source and limitations clearly identified. The dataset has not been connected yet.", action: "Open dashboard", href: "/dashboard" },
  upload: { heading: "Upload your data", title: "Uploads are not available yet", body: "Guest CSV and Excel imports are still in development. No files can be uploaded or stored yet. Previewing, column mapping, and validation will be part of this workflow.", action: "See how it will work", href: "/about#how-it-works" },
  login: { heading: "Log in", title: "Sign-in is not available yet", body: "Accounts and private business workspaces are still in development. No sign-in details are collected on this page.", action: "Back to CoffeeCounter", href: "/" },
  register: { heading: "Get started", title: "Registration is not available yet", body: "Business accounts are still in development. You can explore the workspace layout while we build registration and private data storage.", action: "Open dashboard", href: "/dashboard" },
} as const;
