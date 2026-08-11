"use client";

import NextImage from "next/image";
import { Link } from "@/lib/navigation";
import { useTranslations, useLocale } from "next-intl";
import { formatRupiah } from "@/lib/product-helpers";

type CollectionConfig =
  | {
      name: string;
      heroType: "dual";
      accentColor: string;
      glowColor: string;
      assets: { left: string; right: string };
    }
  | {
      name: string;
      heroType: "single";
      accentColor: string;
      glowColor: string;
      assets: { main: string };
    };

const COLLECTION_CONFIGS: Record<string, CollectionConfig> = {
  "black-gold": {
    name: "Black Gold",
    heroType: "dual",
    accentColor: "#C5A059",
    glowColor: "rgba(197, 160, 89, 0.05)",
    assets: { left: "/images/collections/black_left.png", right: "/images/collections/black_right.png" },
  },
  "blue-gold": {
    name: "Blue Gold",
    heroType: "single",
    accentColor: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.08)",
    assets: { main: "/images/collections/blue_box.png" },
  },
  "red-gold": {
    name: "Red Gold",
    heroType: "single",
    accentColor: "#ef4444",
    glowColor: "rgba(239, 68, 68, 0.08)",
    assets: { main: "/images/products/gorditto_cardboard.png" },
  },
  "white-gold": {
    name: "White Gold",
    heroType: "single",
    accentColor: "#ffffff",
    glowColor: "rgba(255, 255, 255, 0.1)",
    assets: { main: "/images/products/eljefe.png" },
  },
};

export interface CollectionProductView {
  id: string;
  slug: string;
  name: string;
  category: string;
  img: string;
  minPrice: number | null;
  stockStatus: string;
}

const STOCK_LABEL: Record<string, { id: string; en: string }> = {
  SOLD_OUT: { id: "Stok Habis", en: "Sold Out" },
  DISCONTINUED: { id: "Tidak Diproduksi", en: "Discontinued" },
};

export default function CollectionPageClient({
  slug,
  products,
  overrideTitle,
  overrideDesc,
  overrideAssets,
}: {
  slug: string;
  products: CollectionProductView[];
  overrideTitle?: string;
  overrideDesc?: string;
  overrideAssets?: { left: string; right: string; main: string };
}) {
  const t = useTranslations("Montenegro");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const isIndo = locale !== "en";
  const config = COLLECTION_CONFIGS[slug] || COLLECTION_CONFIGS["black-gold"];
  const title = overrideTitle || t(`${slug}.title`);
  const desc = overrideDesc || t(`${slug}.desc`);
  const leftAsset = overrideAssets?.left || (config.heroType === "dual" ? config.assets.left : "");
  const rightAsset = overrideAssets?.right || (config.heroType === "dual" ? config.assets.right : "");
  const mainAsset = overrideAssets?.main || (config.heroType === "single" ? config.assets.main : "");

  return (
    <div className="min-h-screen bg-[#050505] text-white transition-colors duration-500 overflow-x-hidden">
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] blur-[160px] pointer-events-none opacity-40 animate-pulse"
          style={{ background: config.glowColor }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {config.heroType === "dual" ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1 order-2 md:order-1 animate-slide-right">
                <NextImage
                  src={leftAsset}
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
                  {title}
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto italic font-light">
                  &ldquo;{desc}&rdquo;
                </p>
              </div>
              <div className="flex-1 order-3 animate-slide-left">
                <NextImage
                  src={rightAsset}
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
                  {title}
                </h1>
                <div className="w-16 h-[1px] bg-[#C5A059]"></div>
                <p className="text-lg text-gray-400 leading-relaxed italic font-light">
                  &ldquo;{desc}&rdquo;
                </p>
              </div>
              <div className="flex-1 animate-slide-left relative group">
                <div
                  className="absolute inset-0 blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity"
                  style={{ background: config.accentColor }}
                ></div>
                <NextImage
                  src={mainAsset}
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
            {products.map((product) => {
              const isSoldOut = product.stockStatus !== "READY";
              const stockLabel = isIndo ? STOCK_LABEL[product.stockStatus]?.id : STOCK_LABEL[product.stockStatus]?.en;
              return (
                <div key={product.id} className="group relative transition-all duration-500 overflow-hidden rounded-sm border border-white/5 bg-[#111] hover:border-[#C5A059]/20">
                  <div className="relative aspect-square overflow-hidden bg-white/5">
                    <NextImage
                      src={product.img}
                      alt={`Cerutu ${product.name} dalam Seri ${config.name}`}
                      fill
                      className={`object-contain p-12 transition-transform duration-700 group-hover:scale-110 ${isSoldOut ? "grayscale opacity-50" : ""}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {isSoldOut && (
                      <div className="absolute top-3 left-3 px-3 py-1.5 bg-red-600 border border-red-400/40 text-white text-[9px] font-bold uppercase tracking-widest">
                        {stockLabel}
                      </div>
                    )}
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
                    {isSoldOut ? (
                      <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{stockLabel}</p>
                    ) : (
                      product.minPrice !== null && (
                        <p className="text-zinc-400 text-sm font-light">
                          {isIndo ? "Mulai dari" : "Starting from"} <span className="text-[#C5A059] font-bold">{formatRupiah(product.minPrice)}</span>
                        </p>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {products.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-zinc-600 uppercase tracking-widest text-sm">{t("noProducts")}</p>
            </div>
          )}

          <div className="mt-40 text-center">
            <Link href="/produk" className="inline-flex flex-col items-center group">
              <span className="text-zinc-500 group-hover:text-[#C5A059] uppercase tracking-[0.4em] text-[10px] font-bold transition-all mb-4">{t("viewAll")}</span>
              <div className="w-12 h-px bg-white/10 group-hover:w-24 group-hover:bg-[#C5A059] transition-all duration-500"></div>
            </Link>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 w-[30vw] h-[30vw] bg-secondary/5 blur-[120px] pointer-events-none -z-10"></div>
    </div>
  );
}
