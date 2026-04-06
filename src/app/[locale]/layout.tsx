import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./../globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const baseDomain = process.env.NEXT_PUBLIC_SITE_URL || 
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(baseDomain),
  title: "Kilau Cigar Indonesia | Cerutu Premium & Eksklusif",
  description: "Kilau Cigar Indonesia menyajikan koleksi cerutu premium terbaik dengan tradisi lebih dari 100 tahun. Jelajahi Seri Montenegro, Black Gold, dan koleksi eksklusif lainnya.",
  keywords: "cigar indonesia, cerutu premium, montenegro cigar, black gold collection, cerutu lintingan tangan, tembakau nicaragua",
  openGraph: {
    title: "Kilau Cigar Indonesia | Cerutu Premium & Eksklusif",
    description: "Warisan Tradisi Cerutu Premium Selama 100 Tahun",
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
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

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

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
