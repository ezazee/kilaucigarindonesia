import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

const COLLECTION_NAMES: Record<string, string> = {
  "black-gold": "Black Gold",
  "blue-gold": "Blue Gold",
  "red-gold": "Red Gold",
  "white-gold": "White Gold",
};

const COLLECTION_DESCRIPTIONS: Record<string, { id: string; en: string }> = {
  "black-gold": {
    id: "Koleksi Black Gold — cerutu ultra-premium lintingan tangan dengan pita hitam-emas ikonik, dibuat dari tembakau Nicaragua pilihan untuk profil rasa yang kuat dan kompleks.",
    en: "The Black Gold Collection — ultra-premium hand-rolled cigars with an iconic black-and-gold band, crafted from select Nicaraguan tobacco for a bold, complex flavor profile.",
  },
  "blue-gold": {
    id: "Koleksi Blue Gold — cerutu premium dengan karakter rasa seimbang, cocok untuk sesi santai maupun momen spesial, dibungkus pita biru khas Montenegro.",
    en: "The Blue Gold Collection — premium cigars with a balanced flavor character, perfect for relaxed sessions or special occasions, wrapped in Montenegro's signature blue band.",
  },
  "red-gold": {
    id: "Koleksi Red Gold — cerutu short smoke premium untuk momen singkat namun tetap berkarakter, dengan pita merah khas Montenegro.",
    en: "The Red Gold Collection — premium short-smoke cigars for brief yet flavorful moments, wrapped in Montenegro's signature red band.",
  },
  "white-gold": {
    id: "Koleksi White Gold — edisi limited dengan wrapper halus dan rasa ringan namun berkesan, dibungkus pita putih eksklusif Montenegro.",
    en: "The White Gold Collection — a limited edition with a smooth wrapper and a light yet memorable taste, wrapped in Montenegro's exclusive white band.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const collectionName = COLLECTION_NAMES[slug] ?? slug;
  const isIndo = locale !== "en";
  const description =
    (isIndo ? COLLECTION_DESCRIPTIONS[slug]?.id : COLLECTION_DESCRIPTIONS[slug]?.en) ||
    `Koleksi ${collectionName} Montenegro Cigar dari Kilau Cigar Indonesia.`;
  const title = `${collectionName} Collection`;

  return {
    title,
    description,
    alternates: buildAlternates(`/montenegro/${slug}`, locale),
    openGraph: { title, description },
  };
}

export default function MontenegroCollectionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
