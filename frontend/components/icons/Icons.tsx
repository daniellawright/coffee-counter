import { iconPaths, iconViewBox, type IconName } from "@/components/icons/icon-paths";

export type IconProps = { size?: number; title?: string; className?: string };

/**
 * Tabler Icons (MIT, Paweł Kuna): 2px outline strokes that inherit the surrounding
 * text color, so they are white on the espresso rail and espresso on white surfaces.
 * Unlabeled icons are decorative beside text.
 */
function Icon({ name, size = 24, title, className = "" }: IconProps & { name: IconName }) {
  return (
    <svg
      viewBox={iconViewBox}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      className={`inline-block shrink-0 ${className}`}
      // Trusted, generated SVG markup from components/icons/icon-paths.ts.
      dangerouslySetInnerHTML={{ __html: iconPaths[name] }}
    />
  );
}

export const OverviewIcon = (props: IconProps) => <Icon {...props} name="layout-dashboard" />;
export const ChartIcon = (props: IconProps) => <Icon {...props} name="chart-bar" />;
export const WeatherIcon = (props: IconProps) => <Icon {...props} name="cloud" />;
export const ForecastIcon = (props: IconProps) => <Icon {...props} name="trending-up" />;
export const InventoryIcon = (props: IconProps) => <Icon {...props} name="package" />;
export const UploadIcon = (props: IconProps) => <Icon {...props} name="file-upload" />;
export const PipelineIcon = (props: IconProps) => <Icon {...props} name="route" />;
export const SettingsIcon = (props: IconProps) => <Icon {...props} name="settings" />;
export const AboutIcon = (props: IconProps) => <Icon {...props} name="info-circle" />;
export const UserIcon = (props: IconProps) => <Icon {...props} name="user-circle" />;
export const MenuIcon = (props: IconProps) => <Icon {...props} name="menu-2" />;
export const CloseIcon = (props: IconProps) => <Icon {...props} name="x" />;
export const ArrowRightIcon = (props: IconProps) => <Icon {...props} name="arrow-right" />;
export const RevenueIcon = (props: IconProps) => <Icon {...props} name="currency-dollar" />;
export const ReceiptIcon = (props: IconProps) => <Icon {...props} name="receipt" />;
export const CoffeeIcon = (props: IconProps) => <Icon {...props} name="coffee" />;
