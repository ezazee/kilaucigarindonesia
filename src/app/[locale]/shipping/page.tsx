import { prisma } from "@/lib/prisma";
import { getPageField } from "@/lib/page-content";

const DEFAULTS: Record<string, Record<string, string>> = {
  id: {
    title: "Kebijakan Pengiriman",
    intro: "Kebijakan Pengiriman ini menjelaskan bagaimana Kilau Cigar Indonesia memproses dan mengirimkan pesanan Anda.",
    processingTime: "Pesanan yang telah dikonfirmasi akan diproses dalam 1-3 hari kerja sebelum dikirimkan.",
    shippingArea: "Kami melayani pengiriman ke seluruh wilayah Indonesia melalui jasa ekspedisi rekanan.",
    shippingCost:
      "Biaya dan estimasi waktu pengiriman akan diinformasikan saat konfirmasi pesanan via WhatsApp, mengikuti tarif ekspedisi yang berlaku dan lokasi tujuan.",
    packaging: "Setiap produk dikemas dengan material pelindung khusus untuk menjaga kualitas cerutu selama proses pengiriman.",
    damagedItems:
      "Apabila produk diterima dalam kondisi rusak akibat proses pengiriman, segera hubungi kami maksimal 2x24 jam setelah barang diterima disertai foto/video bukti untuk proses klaim.",
  },
  en: {
    title: "Shipping Policy",
    intro: "This Shipping Policy explains how Kilau Cigar Indonesia processes and delivers your orders.",
    processingTime: "Confirmed orders are processed within 1-3 business days before shipment.",
    shippingArea: "We ship to all regions across Indonesia through our partner courier services.",
    shippingCost:
      "Shipping cost and estimated delivery time will be informed during order confirmation via WhatsApp, based on the applicable courier rates and destination.",
    packaging: "Every product is packed with special protective material to preserve cigar quality during shipping.",
    damagedItems:
      "If a product arrives damaged due to shipping, please contact us within 2x24 hours of receipt with photo/video evidence for the claim process.",
  },
};

const SECTIONS = [
  { key: "intro", heading: null },
  { key: "processingTime", heading: { id: "Waktu Proses Pesanan", en: "Order Processing Time" } },
  { key: "shippingArea", heading: { id: "Area Pengiriman", en: "Shipping Area" } },
  { key: "shippingCost", heading: { id: "Biaya & Estimasi Pengiriman", en: "Shipping Cost & Estimate" } },
  { key: "packaging", heading: { id: "Pengemasan Produk", en: "Product Packaging" } },
  { key: "damagedItems", heading: { id: "Produk Rusak/Hilang", en: "Damaged or Lost Items" } },
];

export default async function ShippingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isIndo = locale !== "en";
  const d = DEFAULTS[isIndo ? "id" : "en"];
  const page = await prisma.page.findUnique({ where: { slug: "shipping" } });
  const field = (key: string) => getPageField(page, key, locale, d[key]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-12">{d.title}</h1>
        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.key}>
              {s.heading && (
                <h2 className="text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-3">
                  {isIndo ? s.heading.id : s.heading.en}
                </h2>
              )}
              <p className="text-zinc-400 font-light leading-relaxed">{field(s.key)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
