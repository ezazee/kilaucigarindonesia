import { prisma } from "@/lib/prisma";
import { pickLocale, categoryFallbackIcon } from "@/lib/product-helpers";
import { getPageField, getPageImage } from "@/lib/page-content";
import CollectionPageClient from "./CollectionPageClient";

// No searchParams/cookies used on this route, so ISR can cache the rendered
// HTML for 5 minutes instead of hitting Postgres on every visit; admin
// mutations call revalidatePath so edits show sooner.
export const revalidate = 300;

export default async function CollectionPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;

  const page = await prisma.page.findUnique({ where: { slug: `montenegro-${slug}` } });
  const overrideTitle = getPageField(page, "title", locale, "");
  const overrideDesc = getPageField(page, "desc", locale, "");
  const overrideAssets = {
    left: getPageImage(page, "leftImage", ""),
    right: getPageImage(page, "rightImage", ""),
    main: getPageImage(page, "mainImage", ""),
  };

  const category = await prisma.category.findUnique({ where: { slug } });

  const products = category
    ? await prisma.product.findMany({
        where: { categoryId: category.id, published: true },
        orderBy: { order: "asc" },
        select: {
          id: true,
          slug: true,
          nameId: true,
          nameEn: true,
          stockStatus: true,
          images: { select: { url: true, alt: true }, take: 1 },
          variants: { select: { price: true } },
        },
      })
    : [];

  const items = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: pickLocale(p.nameId, p.nameEn, locale),
    category: category?.name ?? "",
    img: p.images[0]?.url ?? categoryFallbackIcon(slug),
    minPrice: p.variants.length > 0 ? Math.min(...p.variants.map((v) => v.price)) : null,
    stockStatus: p.stockStatus,
  }));

  return (
    <CollectionPageClient
      slug={slug}
      products={items}
      overrideTitle={overrideTitle}
      overrideDesc={overrideDesc}
      overrideAssets={overrideAssets}
    />
  );
}
