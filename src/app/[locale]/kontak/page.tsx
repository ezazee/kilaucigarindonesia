import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { pickLocale } from "@/lib/product-helpers";
import { getPageField, getPageImage } from "@/lib/page-content";
import { getGeneralSettings } from "@/lib/settings-cache";
import KontakForm from "./KontakForm";

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ produk?: string }>;
}) {
  const { locale } = await params;
  const { produk: preselectedSlug } = await searchParams;
  const t = await getTranslations({ locale, namespace: "Contact" });
  const tNavbar = await getTranslations({ locale, namespace: "Navbar" });

  // Product options come from the database so the form always mirrors the live
  // catalog (previously this was a hardcoded, out-of-date list).
  const dbProducts = await prisma.product.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: { slug: true, nameId: true, nameEn: true },
  });
  const products = dbProducts.map((p) => pickLocale(p.nameId, p.nameEn, locale));
  const preselectedProduct = dbProducts.find((p) => p.slug === preselectedSlug);
  const preselectedName = preselectedProduct ? pickLocale(preselectedProduct.nameId, preselectedProduct.nameEn, locale) : undefined;

  const page = await prisma.page.findUnique({ where: { slug: "kontak" } });
  const title = getPageField(page, "title", locale, t("title"));
  const subtitle = getPageField(page, "subtitle", locale, t("subtitle"));
  const whatsapp = getPageField(page, "whatsapp", locale, "6281120078910");
  const email = getPageField(page, "email", locale, "admin@kilaucigarindonesia.com");
  const officeLabel = getPageField(page, "officeLabel", locale, "Jakarta Selatan");
  const officeAddress = getPageField(
    page,
    "officeAddress",
    locale,
    "Jl. Dukuh Patra II No.75, RT.1/RW.13, Menteng Dalam, Kec. Tebet, Kota Jakarta Selatan"
  );
  const heroImage = getPageImage(page, "heroImage", "/images/contact/hero.webp");

  const settingValue = await getGeneralSettings();
  const operatingHours =
    (locale === "en" ? settingValue?.operatingHoursEn : settingValue?.operatingHoursId) ||
    (locale === "en" ? "Usually replied within 1 hour, 09:00–21:00 WIB." : "Biasanya dibalas dalam 1 jam, pukul 09.00–21.00 WIB.");
  const waTemplate =
    (locale === "en" ? settingValue?.waContactTemplateEn : settingValue?.waContactTemplateId) ||
    (locale === "en"
      ? "Hello Kilau Cigar Indonesia,\n\nCustomer Name: {name}\nEmail: {email}\nProducts:\n{products}\n\nOrder Details:\n{message}\n\nPlease provide availability and shipping cost. Thank you."
      : "Halo Kilau Cigar Indonesia,\n\nNama Pemesan: {name}\nEmail: {email}\nProduk:\n{products}\n\nDetail Pesanan:\n{message}\n\nMohon informasi ketersediaan dan ongkir. Terima kasih.");

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden pt-20">
      {/* Hero Section - Adaptive for Mobile */}
      <section className="py-16 md:py-20 relative overflow-hidden text-center bg-black/40 px-6 md:px-8">
        <h1 className="text-secondary text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] mb-4">{tNavbar("contact")}</h1>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold tracking-tighter">
          {title} <span className="italic text-secondary font-style-italic">{subtitle}</span>
        </h2>
      </section>

      {/* Horizontal Contact Info - Stacks on Mobile */}
      <section className="py-10 md:py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-10 md:gap-12 text-center md:text-left">
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-[#ff0000] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em]">WhatsApp</h4>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl sm:text-2xl md:text-3xl font-serif italic text-white leading-none hover:text-secondary transition-colors"
              >
                +{whatsapp.replace(/(\d{2})(\d{3})(\d{4})(\d+)/, "$1 $2 $3 $4")}
              </a>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-[#ff0000] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em]">Email</h4>
              <a
                href={`mailto:${email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl sm:text-2xl md:text-3xl font-serif italic text-white leading-none hover:text-secondary transition-colors block break-all"
              >
                {email}
              </a>
            </div>
            <div className="space-y-3 md:space-y-4 md:text-right">
              <h4 className="text-[#ff0000] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em]">Office</h4>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(officeAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg sm:text-xl md:text-2xl font-serif italic text-zinc-400 leading-none hover:text-secondary transition-colors"
              >
                {officeLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Order Section - SPLIT LAYOUT */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left: Brand Image */}
            <div className="relative aspect-[4/5] hidden lg:block overflow-hidden rounded-2xl group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
              <Image
                src={heroImage}
                alt="Kilau Cigar Heritage"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute bottom-10 left-10 z-20 space-y-2">
                <h4 className="text-secondary text-xs font-bold uppercase tracking-[0.4em]">{locale === "en" ? "Premium Selection" : "Seleksi Premium"}</h4>
                <p className="text-2xl font-serif italic text-white">{locale === "en" ? "Nicaragua's Finest Tobacco" : "Tembakau Terbaik Nicaragua"}</p>
              </div>
            </div>

            {/* Right: Compact Form */}
            <KontakForm
              products={products}
              whatsapp={whatsapp}
              preselected={preselectedName}
              operatingHours={operatingHours}
              waTemplate={waTemplate}
            />
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="w-full h-[400px] relative grayscale invert contrast-125 brightness-50 opacity-40 hover:opacity-100 hover:grayscale-0 hover:invert-0 transition-all duration-1000">
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(officeAddress)}&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>

      {/* Footer */}
      <section className="py-20 bg-black text-center relative">
        <div className="max-w-4xl mx-auto px-8 space-y-6">
          <h3 className="text-2xl font-serif italic text-white uppercase tracking-widest tracking-tighter">Kilau Cigar Indonesia</h3>
          <div className="w-20 h-px bg-secondary/20 mx-auto"></div>
        </div>
      </section>
    </div>
  );
}
