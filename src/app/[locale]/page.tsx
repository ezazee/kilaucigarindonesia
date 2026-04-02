import NextImage from "next/image";
import { Link } from "@/lib/navigation";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });

  return {
    title: `Kilau Cigar Indonesia - ${t('heroTitle')}`,
    description: t('heroDesc').substring(0, 160),
    openGraph: {
      title: `Kilau Cigar Indonesia - ${t('heroTitle')}`,
      description: t('heroDesc').substring(0, 160),
    }
  };
}

export default function Home() {
  const t = useTranslations('Home');
  return (
    <div className="selection:bg-secondary/30 bg-[#050505]">
      {/* Hero Section - Redesigned with Balanced Spacing */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <NextImage
            src="/images/hero.png"
            alt="Latar belakang mewah Kilau Cigar Indonesia"
            fill
            className="object-cover opacity-60 contrast-125 brightness-75 scale-110"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]/60"></div>
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#050505] to-transparent"></div>
        </div>

        <div className="relative z-20 container mx-auto px-8 flex flex-col items-center text-center">
          <div className="animate-fade-in-up max-w-5xl">
            {/* Top Badge */}
            <span className="text-[#C8102E] tracking-[0.5em] uppercase text-[10px] md:text-xs font-black block mb-4">
              {t('heroBadge')}
            </span>

            {/* Main Heading Group - Adaptive for Mobile */}
            <div className="flex flex-col items-center leading-none">
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif font-bold text-white tracking-tight">
                {t('heroTitle')}
              </h1>
              <span className="text-[#C8102E] text-4xl sm:text-6xl md:text-8xl font-serif italic -mt-2 md:-mt-8">
                {t('heroEdition')}
              </span>
            </div>

            {/* Description - Balanced for Mobile */}
            <p className="text-white/80 font-light tracking-wide max-w-2xl mx-auto leading-relaxed text-xs md:text-base pt-8 md:pt-12 px-4 md:px-0">
              {t('heroDesc')}
            </p>

            {/* Button Actions - Adaptive Layout */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-10 md:pt-16 uppercase text-[9px] md:text-[10px] font-bold tracking-[0.3em]">
              <Link
                href="/produk"
                className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-[#C8102E] text-white hover:bg-white hover:text-black transition-all duration-500 shadow-xl text-center"
              >
                {t('explore')}
              </Link>
              <Link
                href="/tentang-kami"
                className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 border border-white/20 bg-black/40 text-white hover:border-white hover:bg-white/10 transition-all duration-500 text-center"
              >
                {t('about')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 100 Years of Tradition - Centered Branding */}
      <section className="py-32 bg-[#050505] relative">
        <div className="max-w-4xl mx-auto px-8 text-center space-y-10 relative z-10">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#C5A059] leading-tight whitespace-pre-line">
              {t('traditionTitle')}
            </h2>
            <div className="flex justify-center">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>
            </div>
          </div>
          <p className="text-zinc-500 font-light leading-relaxed text-lg max-w-2xl mx-auto">
            {t('traditionDesc')}
          </p>
        </div>
      </section>

      {/* Montenegro Cigar Section */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-8 space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-5xl font-serif font-bold text-[#C5A059]">Montenegro Cigar</h2>
            <div className="flex justify-center">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { name: "Black Gold Collection", slug: "black-gold", img: "/images/icons/black.png", subtitle: "Ultra-Premium" },
              { name: "Blue Gold Collection", slug: "blue-gold", img: "/images/icons/blue.png", subtitle: "Premium" },
              { name: "Red Gold Collection", slug: "red-gold", img: "/images/icons/red.png", subtitle: "Premium Short Smokes" },
              { name: "White Gold Collection", slug: "white-gold", img: "/images/icons/white.png", subtitle: "Limited Edition" }
            ].map((item, i) => (
              <Link key={i} href={`/montenegro/${item.slug}`} className="group text-center space-y-6 md:space-y-8">
                <div className="relative aspect-square bg-[#0a0a0a] border border-white/5 group-hover:border-secondary/30 transition-all duration-700 overflow-hidden rounded-sm">
                  <NextImage
                    src={item.img}
                    alt={`${item.name} - ${item.subtitle}`}
                    fill
                    className="object-contain p-6 md:p-8 group-hover:scale-110 transition-transform duration-1000"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-white font-serif font-bold text-base md:text-lg group-hover:text-secondary transition-colors duration-300">{item.name}</h3>
                  <p className="text-zinc-600 text-[9px] md:text-[10px] uppercase tracking-widest font-bold">{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Original Cigar - Man Smoking Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-black mt-[-1px]">
        <div className="absolute inset-0 z-0">
          <NextImage
            src="/images/gentleman_legacy.png"
            alt="Pria menikmati cerutu - Warisan Tembakau Asli"
            fill
            className="object-cover opacity-60 grayscale brightness-75 scale-110"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-8">
          <div className="max-w-xl space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h3 className="text-secondary font-bold uppercase tracking-[0.4em] text-xs">{t('legacyTitle')}</h3>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-white leading-tight uppercase">
                {t('legacyTitle')} <br /> <span className="italic text-secondary">{t('legacySubtitle')}</span>
              </h2>
            </div>

            <p className="text-zinc-400 text-lg font-light leading-loose">
              {t('legacyDesc')}
            </p>

            <div>
              <Link href="/produk" className="inline-flex items-center gap-4 bg-white text-black px-8 md:px-10 py-4 md:py-5 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-secondary hover:text-white transition-all duration-500">
                {t('ctaFind')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Experience the Difference Section */}
      <section className="bg-[#050505] py-20 md:py-32 overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            {/* Image Left */}
            <div className="relative aspect-square md:aspect-[4/3] rounded-sm overflow-hidden group shadow-2xl border border-white/5">
              <NextImage
                src="/images/feature_box.png"
                alt="Kotak Cerutu Montenegro Seleksi Premium"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent"></div>
            </div>

            {/* Text Right */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-serif text-[#C5A059] leading-tight whitespace-pre-line">
                  {t('differenceTitle')}
                </h2>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>
              </div>
              <p className="text-zinc-400 font-light leading-loose text-lg">
                {t('differenceDesc')}
              </p>
              <div>
                <Link href="/produk" className="inline-flex items-center gap-3 px-8 py-4 bg-secondary/10 border border-secondary text-secondary font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-secondary hover:text-white transition-all duration-500 rounded-sm group">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Koleksi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultimate Smoking Experience Section */}
      <section className="bg-black py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            {/* Text Left (Reversed order on desktop) */}
            <div className="space-y-8 order-2 md:order-1">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-serif text-[#C5A059] leading-tight whitespace-pre-line">
                  {t('smokingExp')}
                </h2>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>
              </div>
              <p className="text-zinc-400 font-light leading-loose text-lg">
                {t('smokingDesc')}
              </p>
              <div>
                <Link href="/produk" className="inline-flex items-center gap-3 px-8 py-4 bg-secondary/10 border border-secondary text-secondary font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-secondary hover:text-white transition-all duration-300 rounded-sm group">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Koleksi
                </Link>
              </div>
            </div>

            {/* Image Right */}
            <div className="relative aspect-square md:aspect-[4/3] rounded-sm overflow-hidden order-1 md:order-2 group shadow-2xl border border-white/5">
              <NextImage
                src="/images/collection_black.png"
                alt="Koleksi Black Gold Montenegro - Pengalaman Merokok Terbaik"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Recommended Products Section */}
      <section className="bg-[#0a0a0a] py-24 md:py-32">
        <div className="container mx-auto px-8">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-[#C5A059] leading-tight whitespace-pre-line">
              {t('recommended')}
            </h2>
            <div className="flex justify-center">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {[
              { name: "Bomba", img: "/images/products/bomba.png", slug: "bomba-white" },
              { name: "Cigarillos", img: "/images/products/cigarillos.png", slug: "cigarillos-red" },
              { name: "Comandante Serie E", img: "/images/icons/black.png", slug: "comandate-series-e" },
              { name: "Crucero", img: "/images/products/crucero.png", slug: "crucero-white" },
              { name: "El Jefe", img: "/images/products/eljefe.png", slug: "el-jefe-white" },
              { name: "Gorditto", img: "/images/products/gorditto.png", slug: "gorditto-red" },
            ].map((product, idx) => (
              <Link key={idx} href={`/produk/${product.slug}`} className="group flex flex-col items-center space-y-6">
                <div className="relative w-full aspect-square bg-[#111] border border-white/5 rounded-sm flex items-center justify-center p-12 transition-all duration-700 group-hover:border-secondary/30 group-hover:scale-105">
                  <div className="relative w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <NextImage
                      src={product.img}
                      alt={`Produk Cerutu ${product.name}`}
                      fill
                      className="object-contain filter brightness-110 contrast-110 group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <h3 className="text-zinc-400 font-medium tracking-[0.15em] text-sm md:text-base uppercase group-hover:text-[#C5A059] transition-colors duration-300 text-center">
                  {product.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Trust Features Section */}
      <section className="bg-[#080808] py-20 border-t border-white/5">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              { name: "Pengiriman Segera", icon: "/images/icons/shipping.svg", key: "shipping" },
              { name: "Tembakau Kualitas Terbaik", icon: "/images/icons/quality.svg", key: "quality" },
              { name: "11 tahun di pasar", icon: "/images/icons/years.svg", key: "years" }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-6 group">
                <div className="relative w-16 h-16 transition-transform duration-500 group-hover:scale-110">
                  <NextImage
                    src={feature.icon}
                    alt={`Ikon Fitur: ${feature.name}`}
                    fill
                    className="object-contain filter brightness-100 contrast-125"
                    style={{ filter: "invert(64%) sepia(43%) saturate(468%) hue-rotate(3deg) brightness(91%) contrast(89%)" }} // Approximate #C5A059
                    sizes="64px"
                  />
                </div>
                <div className="w-4 h-px bg-[#C5A059]/40"></div>
                <p className="text-zinc-400 font-light tracking-[0.1em] text-sm md:text-base group-hover:text-white transition-colors duration-300">
                  {t(feature.key)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
