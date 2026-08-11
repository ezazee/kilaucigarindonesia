import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIndo = locale !== "en";
  const title = isIndo ? "Pertanyaan Umum" : "Frequently Asked Questions";
  const description = isIndo
    ? "Jawaban atas pertanyaan umum seputar keaslian produk, cara memesan, metode pembayaran, estimasi pengiriman, dan cara menyimpan cerutu premium dari Kilau Cigar Indonesia."
    : "Answers to frequently asked questions about product authenticity, how to order, payment methods, shipping estimates, and how to store premium cigars from Kilau Cigar Indonesia.";

  return {
    title,
    description,
    alternates: buildAlternates("/faq", locale),
    openGraph: { title, description },
  };
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
