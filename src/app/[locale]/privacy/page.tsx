import { prisma } from "@/lib/prisma";
import { getPageField } from "@/lib/page-content";

const DEFAULTS: Record<string, Record<string, string>> = {
  id: {
    title: "Kebijakan Privasi",
    intro:
      'Kilau Cigar Indonesia ("kami") menghormati privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat menggunakan situs dan layanan kami.',
    dataCollection:
      "Kami dapat mengumpulkan informasi seperti nama, alamat email, nomor WhatsApp, alamat pengiriman, dan detail pesanan yang Anda berikan saat menghubungi kami atau melakukan pemesanan.",
    dataUse:
      "Informasi yang dikumpulkan digunakan untuk memproses pesanan, memberikan layanan pelanggan, mengirimkan informasi produk, dan meningkatkan kualitas layanan kami.",
    dataSharing:
      "Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga. Data hanya dibagikan kepada mitra logistik/pengiriman sejauh diperlukan untuk memproses pesanan Anda.",
    cookies:
      "Situs kami dapat menggunakan cookies untuk meningkatkan pengalaman menjelajah Anda. Anda dapat menonaktifkan cookies melalui pengaturan browser, meskipun beberapa fitur situs mungkin tidak berfungsi optimal.",
    contact:
      "Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan hubungi kami melalui WhatsApp atau email yang tercantum di halaman Kontak.",
  },
  en: {
    title: "Privacy Policy",
    intro:
      'Kilau Cigar Indonesia ("we") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our site and services.',
    dataCollection:
      "We may collect information such as your name, email address, WhatsApp number, shipping address, and order details that you provide when contacting us or placing an order.",
    dataUse:
      "Collected information is used to process orders, provide customer service, send product information, and improve the quality of our service.",
    dataSharing:
      "We do not sell or rent your personal data to third parties. Data is only shared with logistics/shipping partners to the extent necessary to process your order.",
    cookies:
      "Our site may use cookies to improve your browsing experience. You can disable cookies through your browser settings, though some site features may not work optimally.",
    contact:
      "If you have questions about this Privacy Policy, please contact us via WhatsApp or the email listed on the Contact page.",
  },
};

const SECTIONS = [
  { key: "intro", heading: null },
  { key: "dataCollection", heading: { id: "Data yang Dikumpulkan", en: "Data We Collect" } },
  { key: "dataUse", heading: { id: "Penggunaan Data", en: "How We Use Data" } },
  { key: "dataSharing", heading: { id: "Berbagi Data ke Pihak Ketiga", en: "Sharing Data with Third Parties" } },
  { key: "cookies", heading: { id: "Cookies & Tracking", en: "Cookies & Tracking" } },
  { key: "contact", heading: { id: "Kontak", en: "Contact" } },
];

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isIndo = locale !== "en";
  const d = DEFAULTS[isIndo ? "id" : "en"];
  const page = await prisma.page.findUnique({ where: { slug: "privacy" } });
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
