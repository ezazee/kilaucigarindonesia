import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIndo = locale !== "en";
  const title = isIndo ? "Syarat & Ketentuan" : "Terms of Service";
  const description = isIndo
    ? "Syarat dan ketentuan resmi penggunaan situs, batasan usia produk tembakau, ketentuan pemesanan, harga, hak kekayaan intelektual, dan batasan tanggung jawab Kilau Cigar Indonesia."
    : "Official terms and conditions for using the site, tobacco product age restrictions, ordering terms, pricing, intellectual property, and Kilau Cigar Indonesia's limitation of liability.";

  return {
    title,
    description,
    alternates: buildAlternates("/terms", locale),
    openGraph: { title, description },
  };
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
