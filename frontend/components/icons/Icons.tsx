import { iconPaths, iconViewBox, type IconName } from "@/components/icons/icon-paths";

export type IconProps = { size?: number; title?: string; className?: string };

/**
 * Humbleicons (MIT, Jiří Zralý), always drawn in white.
 * Place them on espresso surfaces; on white pages wrap them in an espresso badge.
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
      className={`inline-block shrink-0 text-white ${className}`}
      // Trusted, generated SVG markup from components/icons/icon-paths.ts.
      dangerouslySetInnerHTML={{ __html: iconPaths[name] }}
    />
  );
}

export const OverviewIcon = (props: IconProps) => <Icon {...props} name="dashboard" />;
export const ChartIcon = (props: IconProps) => <Icon {...props} name="pie-chart" />;
export const WeatherIcon = (props: IconProps) => <Icon {...props} name="cloud-sun" />;
export const ForecastIcon = (props: IconProps) => <Icon {...props} name="sparks" />;
export const InventoryIcon = (props: IconProps) => <Icon {...props} name="package" />;
export const UploadIcon = (props: IconProps) => <Icon {...props} name="upload" />;
export const PipelineIcon = (props: IconProps) => <Icon {...props} name="layers" />;
export const SettingsIcon = (props: IconProps) => <Icon {...props} name="cog" />;
export const AboutIcon = (props: IconProps) => <Icon {...props} name="info-circle" />;
export const UserIcon = (props: IconProps) => <Icon {...props} name="user" />;
export const MenuIcon = (props: IconProps) => <Icon {...props} name="bars" />;
export const CloseIcon = (props: IconProps) => <Icon {...props} name="times" />;
