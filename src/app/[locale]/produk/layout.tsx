import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildAlternates, truncateAtWord } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products' });
  const title = `${t('title')} ${t('subtitle')}`;
  const description = truncateAtWord(t('description'), 160);

  return {
    title,
    description,
    alternates: buildAlternates('/produk', locale),
    openGraph: { title, description },
  };
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
