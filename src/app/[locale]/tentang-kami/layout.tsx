import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });

  return {
    title: `Kilau Cigar Indonesia | ${t('badge')}`,
    description: t('tagline').substring(0, 160),
    openGraph: {
      title: `Kilau Cigar Indonesia | ${t('badge')}`,
      description: t('tagline').substring(0, 160),
    }
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
