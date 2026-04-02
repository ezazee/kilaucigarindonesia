"use client";

import NextImage from "next/image";
import { Link } from "@/lib/navigation";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { ALL_PRODUCTS } from "@/lib/data/products";

// Products now imported from @/lib/data/products

const COLLECTION_CONFIGS: Record<string, any> = {
  "black-gold": {
    name: "Black Gold",
    title: "Pilihan Montenegro\nBlack Gold Collection",
    desc: "Penting bagi kami untuk menekankan bahwa setiap langkah dalam pembuatan Cigar kami dilakukan dengan penuh dedikasi, dari pemilihan tembakau hingga tangan terampil yang membalutnya. Montenegro adalah simbol kebanggaan kami, sebuah mahakarya yang lahir dari tradisi panjang.",
    heroType: "dual",
    theme: "dark",
    accentColor: "#C5A059", // Gold
    glowColor: "rgba(197, 160, 89, 0.05)",
    assets: { left: "/images/collections/black_left.png", right: "/images/collections/black_right.png" },
    featuredIds: [3, 9, 14, 18, 19]
  },
  "blue-gold": {
    name: "Blue Gold",
    title: "Pilihan Montenegro\nBlue Gold Collection",
    desc: "Koleksi Blue Gold menghadirkan perpaduan sempurna antara kekuatan dan kelembutan. Setiap batang dirancang untuk memberikan pengalaman merokok yang tenang namun mendalam bagi para penikmat sejati yang menghargai dedikasi dalam setiap helai daun tembakau.",
    heroType: "single",
    theme: "dark",
    accentColor: "#3b82f6", // Blue accent for Dark Theme
    glowColor: "rgba(59, 130, 246, 0.08)",
    assets: { main: "/images/collections/blue_box.png" },
    featuredIds: [8, 12, 15]
  },
  "red-gold": {
    name: "Red Gold",
    title: "Pilihan Montenegro\nRed Gold Collection",
    desc: "Red Gold adalah perayaan tradisi dan semangat. Kami percaya bahwa keahlian tangan manusia memberikan sentuhan unik dalam setiap helai tembakau yang dirangkai dengan penuh dedikasi untuk menciptakan aroma yang kaya dan karakter yang berani.",
    heroType: "single",
    theme: "dark",
    accentColor: "#ef4444", // Red
    glowColor: "rgba(239, 68, 68, 0.08)",
    assets: { main: "/images/products/gorditto_cardboard.png" },
    featuredIds: [2, 6, 11] // Cigarillos, Gorditto, Petit Corona
  },
  "white-gold": {
    name: "White Gold",
    title: "Pilihan Montenegro\nWhite Gold Collection",
    desc: "Kemurnian dan keanggunan terpancar dari setiap helai tembakau dalam koleksi White Gold. Kami yakin bahwa dedikasi tangan manusia memberikan kompleksitas rasa yang ringan namun berkesan, merangkai mahakarya dalam setiap batang Cigar.",
    heroType: "single",
    theme: "dark",
    accentColor: "#ffffff", // White
    glowColor: "rgba(255, 255, 255, 0.1)",
    assets: { main: "/images/products/eljefe.png" },
    featuredIds: [1, 4, 5] // Bomba, Crucero, El Jefe
  }
};

export default function CollectionPage() {
  const t = useTranslations("Montenegro");
  const tCommon = useTranslations("Common");
  const params = useParams();
  const slug = params?.slug as string;
  const config = COLLECTION_CONFIGS[slug] || COLLECTION_CONFIGS["black-gold"];

  const filteredProducts = useMemo(() =>
    ALL_PRODUCTS.filter(p => config.featuredIds.includes(p.id)),
    [config.featuredIds]
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white transition-colors duration-500 overflow-x-hidden">
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Dynamic Background Accents */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] blur-[160px] pointer-events-none opacity-40 animate-pulse"
          style={{ background: config.glowColor }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {config.heroType === "dual" ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1 order-2 md:order-1 animate-slide-right">
                <NextImage 
                  src={config.assets.left} 
                  alt={`Tampilan kiri produk ${config.name}`} 
                  width={450} 
                  height={450} 
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" 
                  priority
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex-1 text-center order-1 md:order-2 animate-fade-in">
                <span className="text-[#C5A059] tracking-[0.6em] uppercase text-[10px] md:text-xs font-bold block mb-4">{t("series")}</span>
                <h1 className="text-4xl md:text-7xl font-serif text-[#C5A059] mb-8 whitespace-pre-line leading-tight drop-shadow-lg">
                  {t(`${slug}.title`)}
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto italic font-light">
                  "{t(`${slug}.desc`)}"
                </p>
              </div>
              <div className="flex-1 order-3 animate-slide-left">
                <NextImage 
                  src={config.assets.right} 
                  alt={`Tampilan kanan produk ${config.name}`} 
                  width={450} 
                  height={450} 
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" 
                  priority
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 animate-fade-in space-y-8">
                <span className="text-[#C5A059] tracking-[0.6em] uppercase text-[10px] md:text-xs font-bold block">{t("series")}</span>
                <h1 className="text-5xl md:text-8xl font-serif text-[#C5A059] leading-tight whitespace-pre-line drop-shadow-lg">
                  {t(`${slug}.title`)}
                </h1>
                <div className="w-16 h-[1px] bg-[#C5A059]"></div>
                <p className="text-lg text-gray-400 leading-relaxed italic font-light">
                  "{t(`${slug}.desc`)}"
                </p>
              </div>
              <div className="flex-1 animate-slide-left relative group">
                {/* Subtle blue/red glow behind the product for light reference but on dark bg */}
                <div
                  className="absolute inset-0 blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity"
                  style={{ background: config.accentColor }}
                ></div>
                <NextImage
                  src={config.assets.main}
                  alt={`Koleksi Utama ${config.name} Montenegro`}
                  width={800}
                  height={800}
                  className="object-contain filter drop-shadow-[0_40px_80px_rgba(0,0,0,1)] relative z-10 p-4"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="py-32 bg-[#080808] relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-24 space-y-4">
            <h2 className="text-3xl font-serif font-bold text-white uppercase tracking-widest text-center">
              {t("available")} <span className="text-[#C5A059]">{t("seri")}</span>
            </h2>
            <div className="w-12 h-px bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group relative transition-all duration-500 overflow-hidden rounded-sm border border-white/5 bg-[#111] hover:border-[#C5A059]/20">
                <div className="relative aspect-square overflow-hidden bg-white/5">
                  <NextImage 
                    src={product.img} 
                    alt={`Cerutu ${product.name} dalam Seri ${config.name}`} 
                    fill 
                    className="object-contain p-12 transition-transform duration-700 group-hover:scale-110" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <Link 
                      href={`/produk/${product.slug}`}
                      className="px-6 py-2 border border-[#C5A059]/40 text-white text-[10px] uppercase font-bold tracking-widest bg-black/40 transform translate-y-4 group-hover:translate-y-0 transition-transform hover:bg-[#C5A059] hover:border-none duration-300"
                    >
                      {tCommon("details")}
                    </Link>
                  </div>
                </div>
                <div className="p-10 text-center space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-bold block">
                    {product.category}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white tracking-tight group-hover:text-[#C5A059] transition-colors">{product.name}</h3>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-zinc-600 uppercase tracking-widest text-sm">{t("noProducts")}</p>
            </div>
          )}

          {/* Back Action */}
          <div className="mt-40 text-center">
            <Link href="/produk" className="inline-flex flex-col items-center group">
              <span className="text-zinc-500 group-hover:text-[#C5A059] uppercase tracking-[0.4em] text-[10px] font-bold transition-all mb-4">{t("viewAll")}</span>
              <div className="w-12 h-px bg-white/10 group-hover:w-24 group-hover:bg-[#C5A059] transition-all duration-500"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative Corner Asset */}
      <div className="fixed bottom-0 left-0 w-[30vw] h-[30vw] bg-secondary/5 blur-[120px] pointer-events-none -z-10"></div>
    </div>
  );
}
