import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });

  const description = t('tagline').substring(0, 160);

  return {
    title: t('badge'),
    description,
    alternates: buildAlternates('/tentang-kami', locale),
    openGraph: { title: t('badge'), description },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
