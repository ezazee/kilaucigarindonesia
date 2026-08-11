import { prisma } from "@/lib/prisma";
import { getPageField } from "@/lib/page-content";

const DEFAULTS: Record<string, { title: string; items: { q: string; a: string }[] }> = {
  id: {
    title: "Pertanyaan Umum",
    items: [
      {
        q: "Apakah cerutu Kilau Cigar Indonesia asli dan legal?",
        a: "Ya, seluruh produk kami adalah cerutu premium asli yang dipasarkan sesuai dengan ketentuan yang berlaku di Indonesia.",
      },
      {
        q: "Bagaimana cara memesan produk?",
        a: "Anda dapat memesan melalui tombol WhatsApp di situs kami atau mengisi formulir di halaman Kontak. Tim kami akan membantu proses pemesanan dan pembayaran.",
      },
      {
        q: "Metode pembayaran apa saja yang tersedia?",
        a: "Pembayaran dapat dilakukan melalui transfer bank yang akan diinformasikan oleh tim kami saat proses konfirmasi pesanan via WhatsApp.",
      },
      {
        q: "Berapa lama waktu pengiriman?",
        a: "Estimasi waktu pengiriman bervariasi tergantung lokasi tujuan dan jasa ekspedisi yang dipilih, umumnya 2-7 hari kerja setelah pesanan diproses.",
      },
      {
        q: "Bagaimana cara menyimpan cerutu agar tetap awet?",
        a: "Simpan cerutu di tempat sejuk dengan kelembapan terjaga (idealnya menggunakan humidor) dan hindari paparan sinar matahari langsung.",
      },
      {
        q: "Apakah bisa custom jumlah pesanan (satuan/box)?",
        a: "Bisa. Sebagian besar produk kami tersedia dalam pilihan satuan, card box, maupun wooden box sesuai ketersediaan stok.",
      },
    ],
  },
  en: {
    title: "Frequently Asked Questions",
    items: [
      {
        q: "Are Kilau Cigar Indonesia cigars authentic and legal?",
        a: "Yes, all our products are authentic premium cigars marketed in accordance with applicable regulations in Indonesia.",
      },
      {
        q: "How do I place an order?",
        a: "You can order via the WhatsApp button on our site or fill out the form on the Contact page. Our team will assist with the ordering and payment process.",
      },
      {
        q: "What payment methods are available?",
        a: "Payment can be made via bank transfer, which will be provided by our team during order confirmation via WhatsApp.",
      },
      {
        q: "How long does shipping take?",
        a: "Estimated delivery time varies depending on destination and chosen courier, generally 2-7 business days after the order is processed.",
      },
      {
        q: "How should I store cigars to keep them fresh?",
        a: "Store cigars in a cool place with controlled humidity (ideally in a humidor) and avoid direct sunlight exposure.",
      },
      {
        q: "Can I customize the order quantity (single/box)?",
        a: "Yes. Most of our products are available as single sticks, card boxes, or wooden boxes depending on stock availability.",
      },
    ],
  },
};

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isIndo = locale !== "en";
  const d = DEFAULTS[isIndo ? "id" : "en"];
  const page = await prisma.page.findUnique({ where: { slug: "faq" } });

  const items = d.items.map((item, i) => ({
    q: getPageField(page, `q${i + 1}`, locale, item.q),
    a: getPageField(page, `a${i + 1}`, locale, item.a),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-12">{d.title}</h1>
        <div className="divide-y divide-white/5">
          {items.map((item, i) => (
            <div key={i} className="py-8">
              <h2 className="text-lg md:text-xl font-serif font-bold text-secondary mb-3">{item.q}</h2>
              <p className="text-zinc-400 font-light leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
