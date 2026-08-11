import { prisma } from "@/lib/prisma";
import { getPageField } from "@/lib/page-content";

const DEFAULTS: Record<string, Record<string, string>> = {
  id: {
    title: "Syarat & Ketentuan",
    intro: "Dengan mengakses dan menggunakan situs Kilau Cigar Indonesia, Anda menyetujui syarat dan ketentuan berikut.",
    ageRestriction:
      "Produk yang kami jual adalah produk tembakau dan hanya diperuntukkan bagi konsumen berusia 21 tahun ke atas. Dengan melakukan pemesanan, Anda menyatakan telah memenuhi batas usia yang berlaku sesuai peraturan perundang-undangan yang berlaku di Indonesia.",
    orderTerms:
      "Pemesanan dilakukan melalui WhatsApp berdasarkan ketersediaan stok. Konfirmasi pesanan dianggap sah setelah pembeli dan penjual menyepakati detail produk, harga, dan metode pengiriman.",
    pricingTerms: "Harga yang tercantum di situs dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Harga final akan dikonfirmasi saat proses pemesanan.",
    ipTerms:
      "Seluruh konten di situs ini, termasuk logo, gambar produk, dan teks, adalah milik Kilau Cigar Indonesia dan dilindungi oleh hukum hak cipta yang berlaku.",
    liabilityTerms:
      "Kilau Cigar Indonesia tidak bertanggung jawab atas kerugian yang timbul akibat penyalahgunaan produk atau penggunaan yang tidak sesuai dengan peruntukannya.",
    governingLaw: "Syarat dan Ketentuan ini tunduk pada hukum yang berlaku di Republik Indonesia.",
  },
  en: {
    title: "Terms of Service",
    intro: "By accessing and using the Kilau Cigar Indonesia website, you agree to the following terms and conditions.",
    ageRestriction:
      "The products we sell are tobacco products and are intended only for consumers aged 21 and above. By placing an order, you confirm that you meet the applicable age requirement under the laws of Indonesia.",
    orderTerms:
      "Orders are placed via WhatsApp based on stock availability. An order is considered confirmed once the buyer and seller agree on product details, price, and shipping method.",
    pricingTerms: "Prices listed on the site are subject to change without prior notice. The final price will be confirmed during the ordering process.",
    ipTerms:
      "All content on this site, including logos, product images, and text, is the property of Kilau Cigar Indonesia and is protected under applicable copyright law.",
    liabilityTerms:
      "Kilau Cigar Indonesia is not liable for any losses arising from misuse of the product or use inconsistent with its intended purpose.",
    governingLaw: "These Terms of Service are governed by the laws of the Republic of Indonesia.",
  },
};

const SECTIONS = [
  { key: "intro", heading: null },
  { key: "ageRestriction", heading: { id: "Batasan Usia", en: "Age Restriction" } },
  { key: "orderTerms", heading: { id: "Ketentuan Pemesanan", en: "Ordering Terms" } },
  { key: "pricingTerms", heading: { id: "Harga & Pembayaran", en: "Pricing & Payment" } },
  { key: "ipTerms", heading: { id: "Hak Kekayaan Intelektual", en: "Intellectual Property" } },
  { key: "liabilityTerms", heading: { id: "Batasan Tanggung Jawab", en: "Limitation of Liability" } },
  { key: "governingLaw", heading: { id: "Hukum yang Berlaku", en: "Governing Law" } },
];

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isIndo = locale !== "en";
  const d = DEFAULTS[isIndo ? "id" : "en"];
  const page = await prisma.page.findUnique({ where: { slug: "terms" } });
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
