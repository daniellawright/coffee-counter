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

export const navGroups = ["Insights", "Data", "Workspace"] as const;
export type NavGroup = (typeof navGroups)[number];
export type NavItem = { label: string; href: string; icon: (p: IconProps) => ReactNode; group: NavGroup };

export const marketingNav = [
  { label: "Dashboard", href: "/" },
  { label: "About CoffeeCounter", href: "/about" },
  { label: "Explore Demo", href: "/demo" },
] as const;

export const dashboardNav: NavItem[] = [
  { label: "Overview", href: "/", icon: OverviewIcon, group: "Insights" },
  { label: "Sales Analytics", href: "/dashboard/sales", icon: ChartIcon, group: "Insights" },
  { label: "Weather Insights", href: "/dashboard/weather", icon: WeatherIcon, group: "Insights" },
  { label: "Forecasting", href: "/dashboard/forecast", icon: ForecastIcon, group: "Insights" },
  { label: "Inventory", href: "/dashboard/inventory", icon: InventoryIcon, group: "Insights" },
  { label: "Data Imports", href: "/dashboard/imports", icon: UploadIcon, group: "Data" },
  { label: "Pipelines", href: "/dashboard/pipelines", icon: PipelineIcon, group: "Data" },
  { label: "Settings", href: "/dashboard/settings", icon: SettingsIcon, group: "Workspace" },
  { label: "About CoffeeCounter", href: "/about", icon: AboutIcon, group: "Workspace" },
];

/** Overview matches only exactly; other items also match their sub-routes. */
export function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
