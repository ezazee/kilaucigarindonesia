import type { Metadata } from "next";

const LOCALES = ["id", "en"] as const;
const DEFAULT_LOCALE = "id";

// Single source of truth for the site's absolute base URL — every file that
// builds an absolute URL (sitemap, robots, canonical/hreflang, JSON-LD)
// must import this instead of re-deriving its own fallback, or a missing
// NEXT_PUBLIC_SITE_URL in production silently splits canonical URLs from
// the sitemap URLs across different fallback domains.
export function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}

/**
 * Truncates text to at most `max` characters without cutting mid-word, then
 * appends an ellipsis if truncation actually occurred. Used for meta
 * descriptions so SERP snippets never end mid-word.
 */
export function truncateAtWord(text: string, max = 160): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return `${lastSpace > 0 ? slice.slice(0, lastSpace) : slice}...`;
}

export function buildAlternates(route: string, locale: string): Metadata["alternates"] {
  const baseUrl = getBaseUrl();
  const normalizedRoute = route === "/" ? "" : route;

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${baseUrl}/${l}${normalizedRoute}`;
  }
  languages["x-default"] = `${baseUrl}/${DEFAULT_LOCALE}${normalizedRoute}`;

  return {
    canonical: `${baseUrl}/${locale}${normalizedRoute}`,
    languages,
  };
}
