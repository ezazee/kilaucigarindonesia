type PageRecord = {
  status: string;
  contentId: unknown;
  contentEn: unknown;
} | null;

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

export function getPageField(page: PageRecord, key: string, locale: string, fallback: string): string {
  if (!page || page.status !== "PUBLISHED") return fallback;
  const src = locale === "en" ? asRecord(page.contentEn) : asRecord(page.contentId);
  const val = src[key];
  return typeof val === "string" && val.trim() ? val : fallback;
}

export function getPageImage(page: PageRecord, key: string, fallback: string): string {
  if (!page || page.status !== "PUBLISHED") return fallback;
  const images = asRecord(asRecord(page.contentId).images);
  const val = images[key];
  return typeof val === "string" && val ? val : fallback;
}
