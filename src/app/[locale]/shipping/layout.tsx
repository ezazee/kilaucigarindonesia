import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIndo = locale !== "en";
  const title = isIndo ? "Kebijakan Pengiriman" : "Shipping Policy";
  const description = isIndo
    ? "Kebijakan pengiriman Kilau Cigar Indonesia — waktu proses pesanan, area jangkauan, estimasi biaya, cara pengemasan produk, dan penanganan klaim jika barang rusak atau hilang."
    : "Kilau Cigar Indonesia's shipping policy — order processing time, coverage area, cost estimates, packaging method, and claims handling for damaged or lost items.";

  return {
    title,
    description,
    alternates: buildAlternates("/shipping", locale),
    openGraph: { title, description },
  };
}

export default function ShippingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
