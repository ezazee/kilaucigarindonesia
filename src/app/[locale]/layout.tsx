import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { getGeneralSettings } from "@/lib/settings-cache";
import { getBaseUrl } from "@/lib/seo";
import "./../globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const baseDomain = getBaseUrl();

// Without this, the [locale] segment has no known param set, so every page
// under it renders fully dynamic (SSR per request) regardless of a child's
// `export const revalidate` — declaring both locales up front is what makes
// ISR actually kick in for produk/montenegro/etc.
export function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }];
}

const DEFAULT_TITLE = "Kilau Cigar Indonesia | Cerutu Premium & Eksklusif";
const DEFAULT_DESCRIPTION =
  "Kilau Cigar Indonesia menyajikan koleksi cerutu premium terbaik dengan tradisi lebih dari 100 tahun. Jelajahi Seri Montenegro, Black Gold, dan koleksi eksklusif lainnya.";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getGeneralSettings();
  const title = s.siteTitle || DEFAULT_TITLE;
  const description = s.siteDescription || DEFAULT_DESCRIPTION;

  return {
    metadataBase: new URL(baseDomain),
    title: {
      template: "%s | Kilau Cigar Indonesia",
      default: title,
    },
    description,
    keywords: "cigar indonesia, cerutu premium, montenegro cigar, black gold collection, cerutu lintingan tangan, tembakau nicaragua, premium cigars, exclusive tobacco",
    authors: [{ name: "Kilau Cigar Indonesia" }],
    creator: "Kilau Cigar Indonesia",
    publisher: "Kilau Cigar Indonesia",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title,
      description,
      url: baseDomain,
      siteName: "Kilau Cigar Indonesia",
      images: [
        {
          url: "/images/hero.png",
          width: 1200,
          height: 630,
          alt: "Kilau Cigar Indonesia Hero Image",
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero.png"],
    },
    icons: {
      icon: [
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon/favicon.ico" },
      ],
      apple: [
        { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      other: [
        { rel: "mask-icon", url: "/favicon/favicon-32x32.png", color: "#A80B22" },
      ],
    },
    manifest: "/favicon/site.webmanifest",
    // NOTE: `alternates` (hreflang/canonical) is intentionally NOT set here.
    // It must be per-page (each page maps to a different canonical path),
    // so every route sets it via generateMetadata + buildAlternates().
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "thBoHwPOTU8tNDZFGQUVxa3oZcj_UYJ4xkfMZzbyo1w",
    },
  };
}


import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!['id', 'en'].includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const s = await getGeneralSettings();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <Navbar instagramUrl={s.instagramUrl} whatsappNumber={s.whatsappNumber || "6281120078910"} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
