import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ALL_PRODUCTS } from '@/lib/data/products';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const tSpecs = await getTranslations({ locale, namespace: 'ProductSpecs' });
  
  const product = ALL_PRODUCTS.find(p => p.slug === slug);
  if (!product) return {};

  const productName = product.name;
  // Get localized description from messages using ProductsData namespace
  const descriptionTranslationKey = `ProductsData.${slug}.description`;
  const description = t(descriptionTranslationKey as any);

  return {
    title: `Kilau Cigar Indonesia | ${productName} - ${product.category}`,
    description: (description !== descriptionTranslationKey ? description : `Premium Kilau Cigar Indonesia: ${productName}`).substring(0, 160),
    openGraph: {
      title: `${productName} - ${product.category} | Kilau Cigar Indonesia`,
      description: (description !== descriptionTranslationKey ? description : `Premium Kilau Cigar Indonesia: ${productName}`).substring(0, 160),
      images: [
        {
          url: product.img,
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
