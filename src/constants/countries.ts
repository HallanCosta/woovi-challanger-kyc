export const COUNTRIES = [
  "Brazil",
  "United States", 
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Portugal",
] as const;

export type Country = typeof COUNTRIES[number];
