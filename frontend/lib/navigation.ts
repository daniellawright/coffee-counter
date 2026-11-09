import {
  ChartIcon,
  ForecastIcon,
  InventoryIcon,
  OverviewIcon,
  PipelineIcon,
  SettingsIcon,
  UploadIcon,
  WeatherIcon,
  type IconProps,
} from "@/components/icons/Icons";
import type { ReactNode } from "react";

export const navGroups = ["Analyze", "Data", "Workspace"] as const;
export type NavGroup = (typeof navGroups)[number];
export type NavItem = { label: string; href: string; icon: (p: IconProps) => ReactNode; group: NavGroup };

export type MarketingNavItem = { label: string; href: string; /** Shown only once someone is signed in and has their own data to explore. */ signedInOnly?: boolean };

export const marketingNav: readonly MarketingNavItem[] = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard", signedInOnly: true },
  { label: "About", href: "/about" },
  { label: "Explore Demo", href: "/demo" },
];

/** The public header links for a visitor: Dashboard appears only after sign-in; Explore Demo is always there. */
export function marketingLinks(signedIn: boolean): readonly MarketingNavItem[] {
  return marketingNav.filter((item) => signedIn || !item.signedInOnly);
}

export const dashboardNav: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: OverviewIcon, group: "Analyze" },
  { label: "Sales Analytics", href: "/dashboard/sales", icon: ChartIcon, group: "Analyze" },
  { label: "Weather Insights", href: "/dashboard/weather", icon: WeatherIcon, group: "Analyze" },
  { label: "Forecasting", href: "/dashboard/forecast", icon: ForecastIcon, group: "Analyze" },
  { label: "Inventory", href: "/dashboard/inventory", icon: InventoryIcon, group: "Analyze" },
  { label: "Data Imports", href: "/dashboard/imports", icon: UploadIcon, group: "Data" },
  { label: "Pipelines", href: "/dashboard/pipelines", icon: PipelineIcon, group: "Data" },
  { label: "Settings", href: "/dashboard/settings", icon: SettingsIcon, group: "Workspace" },
];

/** The public header's current page: Home only on "/", every other link on its page and anything beneath it. */
export function isCurrentPage(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Overview (/dashboard) matches only exactly, since every other workspace page lives beneath it. */
export function isActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}
