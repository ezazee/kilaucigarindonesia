import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { pickLocale, categoryFallbackIcon, isBoxImage } from "@/lib/product-helpers";
import { getPageField } from "@/lib/page-content";
import ProdukPageClient, { ProductListItem } from "./ProdukPageClient";

export const revalidate = 300;

export default async function ProdukPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Products" });
  const page = await prisma.page.findUnique({ where: { slug: "produk" } });
  const heroTitle = getPageField(page, "heroTitle", locale, t("title"));
  const heroSubtitle = getPageField(page, "heroSubtitle", locale, t("subtitle"));
  const heroDescription = getPageField(page, "heroDescription", locale, t("description"));

  const products = await prisma.product.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: {
      id: true,
      slug: true,
      nameId: true,
      nameEn: true,
      stockStatus: true,
      category: { select: { name: true, slug: true } },
      images: { select: { url: true, alt: true } },
      variants: { select: { packagingType: true, price: true } },
    },
  });

  const items: ProductListItem[] = products.map((p) => {
    const mainImage = p.images.find((img) => !isBoxImage(img));
    const boxImage = p.images.find((img) => isBoxImage(img));
    const fallback = categoryFallbackIcon(p.category.slug);

    return {
      id: p.id,
      slug: p.slug,
      name: pickLocale(p.nameId, p.nameEn, locale),
      category: p.category.name,
      img: mainImage?.url ?? fallback,
      boxImg: boxImage?.url ?? null,
      hasSatuan: p.variants.some((v) => v.packagingType === "SATUAN"),
      hasCardBox: p.variants.some((v) => v.packagingType === "CARD_BOX"),
      hasWoodenBox: p.variants.some((v) => v.packagingType === "WOODEN_BOX"),
      minPrice: p.variants.length > 0 ? Math.min(...p.variants.map((v) => v.price)) : null,
      stockStatus: p.stockStatus,
    };
  });

  return <ProdukPageClient products={items} heroTitle={heroTitle} heroSubtitle={heroSubtitle} heroDescription={heroDescription} />;
}
