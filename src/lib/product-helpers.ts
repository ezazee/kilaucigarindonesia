const CATEGORY_ICON: Record<string, string> = {
  "black-gold": "/images/icons/black.png",
  "blue-gold": "/images/icons/blue.png",
  "red-gold": "/images/icons/red.png",
  "white-gold": "/images/icons/white.png",
};

export function categoryFallbackIcon(categorySlug: string) {
  return CATEGORY_ICON[categorySlug] ?? "/images/icons/black.png";
}

export function pickLocale<T extends string | null | undefined>(id: T, en: T, locale: string): T {
  return locale === "en" ? en : id;
}

export function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

/** Identifies box-packaging photos among a product's uploaded media, checking both
 * the filename (e.g. "-box.png" / "-cardbox.png" used by the initial data migration)
 * and the alt text (for images added later via the dashboard, whose filenames are
 * randomized on upload and carry no naming convention). */
export function isBoxImage(image: { url: string; alt?: string | null }) {
  return /-(card)?box\.[a-z0-9]+$/i.test(image.url) || /\bbox\b/i.test(image.alt ?? "");
}

/** Orders a product's full photo set with the cigar-stick photo(s) first and any
 * box/packaging photos last, without dropping extra photos beyond the first two. */
export function orderProductGallery<T extends { url: string; alt?: string | null }>(images: T[]) {
  const main = images.filter((img) => !isBoxImage(img));
  const box = images.filter((img) => isBoxImage(img));
  return [...main, ...box];
}
