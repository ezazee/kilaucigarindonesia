import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { pickLocale, categoryFallbackIcon, orderProductGallery } from "@/lib/product-helpers";
import { getGeneralSettings } from "@/lib/settings-cache";
import { getBaseUrl } from "@/lib/seo";
import ProductDetailPageClient from "./ProductDetailPageClient";

export const revalidate = 300;

const BASE_URL = getBaseUrl();

const AVAILABILITY: Record<string, string> = {
  READY: "https://schema.org/InStock",
  SOLD_OUT: "https://schema.org/OutOfStock",
  DISCONTINUED: "https://schema.org/Discontinued",
};

export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    select: {
      slug: true,
      nameId: true,
      nameEn: true,
      descriptionId: true,
      descriptionEn: true,
      shortDescId: true,
      shortDescEn: true,
      stockStatus: true,
      published: true,
      categoryId: true,
      length: true,
      ring: true,
      shape: true,
      strengthId: true,
      strengthEn: true,
      wrapper: true,
      binder: true,
      filler: true,
      category: { select: { name: true, slug: true } },
      images: { select: { url: true, alt: true } },
      variants: { select: { packagingType: true, price: true, qtyPerBox: true, stockStatus: true } },
    },
  });

  if (!product || !product.published) notFound();

  const images = orderProductGallery(product.images).map((img) => ({ url: img.url, alt: img.alt }));

  if (images.length === 0) {
    images.push({ url: categoryFallbackIcon(product.category.slug), alt: null });
  }

  const [related, settingValue] = await Promise.all([
    prisma.product.findMany({
      where: { categoryId: product.categoryId, published: true, slug: { not: slug } },
      select: {
        id: true,
        slug: true,
        nameId: true,
        nameEn: true,
        category: { select: { name: true, slug: true } },
        images: { select: { url: true }, take: 1 },
      },
      take: 3,
    }),
    getGeneralSettings(),
  ]);
  const whatsapp = settingValue?.whatsappNumber || "6281120078910";
  const operatingHours =
    (locale === "en" ? settingValue?.operatingHoursEn : settingValue?.operatingHoursId) ||
    (locale === "en" ? "Usually replied within 1 hour, 09:00–21:00 WIB." : "Biasanya dibalas dalam 1 jam, pukul 09.00–21.00 WIB.");
  const waTemplate =
    (locale === "en" ? settingValue?.waProductTemplateEn : settingValue?.waProductTemplateId) ||
    (locale === "en"
      ? "Hello Kilau Cigar Indonesia, I'd like to order:\n\n*{product}* — {packaging}\nQty: {qty}\nTotal: {total}\n\nPlease provide availability and shipping cost. Thank you."
      : "Halo Kilau Cigar Indonesia, saya mau pesan:\n\n*{product}* — {packaging}\nJumlah: {qty}\nTotal: {total}\n\nMohon informasi ketersediaan dan ongkir. Terima kasih.");

  const productName = pickLocale(product.nameId, product.nameEn, locale);
  const productUrl = `${BASE_URL}/${locale}/produk/${product.slug}`;
  const minPrice = product.variants.length > 0 ? Math.min(...product.variants.map((v) => v.price)) : undefined;
  const productImageUrl = images[0]?.url ? `${BASE_URL}${images[0].url}` : undefined;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: pickLocale(product.shortDescId, product.shortDescEn, locale),
    sku: product.slug,
    image: productImageUrl ? [productImageUrl] : undefined,
    brand: { "@type": "Brand", name: "Kilau Cigar Indonesia" },
    category: product.category.name,
    offers:
      minPrice !== undefined
        ? {
            "@type": "Offer",
            url: productUrl,
            priceCurrency: "IDR",
            price: minPrice,
            availability: AVAILABILITY[product.stockStatus] ?? AVAILABILITY.READY,
          }
        : undefined,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "en" ? "Products" : "Produk", item: `${BASE_URL}/${locale}/produk` },
      {
        "@type": "ListItem",
        position: 2,
        name: product.category.name,
        item: `${BASE_URL}/${locale}/montenegro/${product.category.slug}`,
      },
      { "@type": "ListItem", position: 3, name: productName, item: productUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    <ProductDetailPageClient
      product={{
        slug: product.slug,
        name: pickLocale(product.nameId, product.nameEn, locale),
        category: product.category.name,
        description: pickLocale(product.descriptionId, product.descriptionEn, locale),
        images,
        stockStatus: product.stockStatus,
        specs: {
          length: product.length,
          ring: product.ring,
          shape: product.shape,
          strength: pickLocale(product.strengthId, product.strengthEn, locale),
          wrapper: product.wrapper,
          binder: product.binder,
          filler: product.filler,
        },
        variants: product.variants.map((v) => ({
          packagingType: v.packagingType,
          price: v.price,
          qtyPerBox: v.qtyPerBox,
          stockStatus: v.stockStatus,
        })),
      }}
      relatedProducts={related.map((p) => ({
        id: p.id,
        slug: p.slug,
        name: pickLocale(p.nameId, p.nameEn, locale),
        category: p.category.name,
        img: p.images[0]?.url ?? categoryFallbackIcon(p.category.slug),
      }))}
      whatsapp={whatsapp}
      operatingHours={operatingHours}
      waTemplate={waTemplate}
    />
    </>
  );
}
