import {
  ChartIcon,
  AboutIcon,
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

export const marketingNav = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "About", href: "/about" },
  { label: "Explore Demo", href: "/demo" },
] as const;

export const dashboardNav: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: OverviewIcon, group: "Analyze" },
  { label: "Sales Analytics", href: "/dashboard/sales", icon: ChartIcon, group: "Analyze" },
  { label: "Weather Insights", href: "/dashboard/weather", icon: WeatherIcon, group: "Analyze" },
  { label: "Forecasting", href: "/dashboard/forecast", icon: ForecastIcon, group: "Analyze" },
  { label: "Inventory", href: "/dashboard/inventory", icon: InventoryIcon, group: "Analyze" },
  { label: "Data Imports", href: "/dashboard/imports", icon: UploadIcon, group: "Data" },
  { label: "Pipelines", href: "/dashboard/pipelines", icon: PipelineIcon, group: "Data" },
  { label: "Settings", href: "/dashboard/settings", icon: SettingsIcon, group: "Workspace" },
  { label: "About", href: "/about", icon: AboutIcon, group: "Workspace" },
];

/** Overview (/dashboard) matches only exactly, since every other workspace page lives beneath it. */
export function isActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}
