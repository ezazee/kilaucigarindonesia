import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });

  const title = `${t('title')} ${t('subtitle')}`;
  const description = t('companyInfo').substring(0, 160);

  return {
    title,
    description,
    alternates: buildAlternates('/kontak', locale),
    openGraph: { title, description },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
