import { AlertIcon } from "@/components/icons/Icons";

/*
 * Temporary full-width bar at the very top of every dashboard page while the backend is
 * being built. It stays pinned to the top, and the fixed sidebar starts below it through
 * the `--banner-height` variable that DashboardShell sets (the bar is exactly that tall
 * on desktop). Remove the bar and that variable once real data is connected.
 */
export function UnderConstructionBanner() {
  return (
    <div role="status" className="sticky top-0 z-50 flex min-h-10 items-center justify-center gap-2 bg-caramel px-4 py-2 text-sm font-medium text-espresso lg:h-10 lg:py-0">
      <AlertIcon size={18} />
      <p>Backend is under construction so the dashboard will be empty for now!</p>
    </div>
  );
}
