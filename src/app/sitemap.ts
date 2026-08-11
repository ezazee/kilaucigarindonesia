import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { getBaseUrl } from '@/lib/seo';

// The sitemap is backed by live database rows but doesn't need to be
// regenerated on every single crawl hit — ISR keeps it fresh without paying
// a full DB round trip per request.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const locales = ['id', 'en'] as const;
  const staticRoutes = ['', '/produk', '/tentang-kami', '/kontak', '/privacy', '/shipping', '/terms', '/faq'];

  const [collections, products, pages] = await Promise.all([
    prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.product.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.page.findMany({ select: { slug: true, updatedAt: true } }),
  ]).catch((err) => {
    console.error("[sitemap] DB query failed:", err);
    throw err;
  });

  const pageUpdatedAt = new Map(pages.map((p) => [p.slug, p.updatedAt]));
  const now = new Date();

  const routes: { route: string; lastModified: Date; priority: number }[] = [
    ...staticRoutes.map((route) => ({
      route,
      // Home/produk/tentang-kami/kontak map to CMS-editable Page rows; legal
      // pages (privacy/shipping/terms/faq) also have a Page row — fall back
      // to `now` only if that page was never customized in the CMS.
      lastModified: pageUpdatedAt.get(route === '' ? 'home' : route.slice(1)) ?? now,
      priority: route === '' ? 1 : 0.8,
    })),
    ...collections.map((c) => ({ route: `/montenegro/${c.slug}`, lastModified: c.updatedAt, priority: 0.7 })),
    ...products.map((p) => ({ route: `/produk/${p.slug}`, lastModified: p.updatedAt, priority: 0.7 })),
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach(({ route, lastModified, priority }) => {
    const languages: Record<string, string> = {};
    locales.forEach((l) => {
      languages[l] = `${baseUrl}/${l}${route}`;
    });
    languages['x-default'] = `${baseUrl}/id${route}`;

    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified,
        changeFrequency: 'weekly',
        priority,
        alternates: { languages },
      });
    });
  });

  return sitemapEntries;
}
