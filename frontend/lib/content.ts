/** Planned tools, printed on the About receipt. `note` is the short modifier line. */
export const features = [
  { title: "Business dashboard", note: "revenue, orders, growth" },
  { title: "Sales analytics", note: "bestsellers, slow movers, busy hours" },
  { title: "Weather insights", note: "needs your store's verified location" },
  { title: "Demand forecasting", note: "daily estimates with a likely range" },
  { title: "Inventory planning", note: "beans, milk, cups from recipes" },
  { title: "Data imports", note: "CSV or Excel from your POS" },
  { title: "Pipeline monitor", note: "when your numbers were last updated" },
];

/** The planned import workflow, one printed line per step. */
export const importSteps = [
  "Choose a CSV or XLSX file",
  "Preview the first rows",
  "Match your columns",
  "Flag problems for review",
  "Process and refresh",
];

/*
 * Homepage receipts: the same questions, first answered by guesswork, then by what
 * CoffeeCounter is being built to answer. Illustrative copy only; no figures.
 */
export const guessworkLines = [
  { label: "What sold best", value: "a hunch" },
  { label: "Busiest hour", value: "a hunch" },
  { label: "Cups for tomorrow", value: "a guess" },
  { label: "What to prep", value: "a guess" },
];

export const answerLines = [
  { label: "What sold best", note: "bestsellers and slow movers" },
  { label: "Busiest hour", note: "by hour and by day of the week" },
  { label: "Weather effect", note: "needs your store's verified location" },
  { label: "Cups for tomorrow", note: "daily estimates with a likely range" },
  { label: "What to prep", note: "beans, milk, and cups from your recipes" },
  { label: "Data up to date?", note: "when your numbers were last updated" },
];

/** Headline figures for the overview. Values stay null until processed sales exist. */
export const counterMetrics: readonly { label: string; value: string | null }[] = [
  { label: "Total revenue", value: null },
  { label: "Transactions", value: null },
  { label: "Average purchase", value: null },
  { label: "Sales growth", value: null },
];
