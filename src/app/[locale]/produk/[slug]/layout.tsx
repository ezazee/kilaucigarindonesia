import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { pickLocale, categoryFallbackIcon } from '@/lib/product-helpers';
import { buildAlternates, truncateAtWord } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true, images: true },
  });
  if (!product) return {};

  const productName = pickLocale(product.nameId, product.nameEn, locale);
  const description = truncateAtWord(pickLocale(product.shortDescId, product.shortDescEn, locale), 160);
  const img = product.images[0]?.url ?? categoryFallbackIcon(product.category.slug);
  const title = `${productName} - ${product.category.name}`;

  return {
    title,
    description,
    alternates: buildAlternates(`/produk/${slug}`, locale),
    openGraph: {
      title,
      description,
      images: [
        {
          url: img,
          width: 800,
          height: 800,
          alt: `Cerutu Premium ${productName}`,
        },
      ],
    }
  };
}

export default function ProductDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
