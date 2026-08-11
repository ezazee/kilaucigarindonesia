"use client";

import Image from "next/image";
import { Link } from "@/lib/navigation";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { formatRupiah } from "@/lib/product-helpers";
import { renderWaTemplate } from "@/lib/wa-template";

export interface VariantView {
  packagingType: string;
  price: number;
  qtyPerBox: number | null;
  stockStatus: string;
}

export interface ProductImageView {
  url: string;
  alt: string | null;
}

export interface ProductDetailView {
  slug: string;
  name: string;
  category: string;
  description: string;
  images: ProductImageView[];
  stockStatus: string;
  specs: {
    length?: string | null;
    ring?: string | null;
    shape?: string | null;
    strength?: string | null;
    wrapper?: string | null;
    binder?: string | null;
    filler?: string | null;
  };
  variants: VariantView[];
}

export interface RelatedProductView {
  id: string;
  slug: string;
  name: string;
  category: string;
  img: string;
}

const PACKAGING_LABEL: Record<string, string> = {
  SATUAN: "Satuan",
  CARD_BOX: "Card Box",
  WOODEN_BOX: "Wooden Box",
};

const STOCK_LABEL: Record<string, { id: string; en: string }> = {
  READY: { id: "Ready Stock", en: "In Stock" },
  SOLD_OUT: { id: "Stok Habis", en: "Sold Out" },
  DISCONTINUED: { id: "Tidak Diproduksi Lagi", en: "Discontinued" },
};

export default function ProductDetailPageClient({
  product,
  relatedProducts,
  whatsapp,
  operatingHours,
  waTemplate,
}: {
  product: ProductDetailView;
  relatedProducts: RelatedProductView[];
  whatsapp: string;
  operatingHours?: string;
  waTemplate: string;
}) {
  const tCommon = useTranslations("Common");
  const tSpecs = useTranslations("ProductSpecs");
  const tNavbar = useTranslations("Navbar");
  const isIndo = tNavbar("home") === "Beranda";

  const isAvailable = product.stockStatus === "READY";
  const stockLabel = isIndo ? STOCK_LABEL[product.stockStatus]?.id : STOCK_LABEL[product.stockStatus]?.en;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = product.images[activeImageIndex] ?? product.images[0];
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const goToImage = (index: number) => {
    const total = product.images.length;
    setActiveImageIndex(((index % total) + total) % total);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (product.images.length > 1 && Math.abs(touchDeltaX.current) > 50) {
      goToImage(activeImageIndex + (touchDeltaX.current < 0 ? 1 : -1));
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const defaultVariantIndex = product.variants.findIndex((v) => v.stockStatus === "READY");
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(defaultVariantIndex >= 0 ? defaultVariantIndex : 0);
  const [qty, setQty] = useState(1);

  const selectedVariant = product.variants[selectedVariantIndex] as VariantView | undefined;
  const variantAvailable = selectedVariant ? selectedVariant.stockStatus === "READY" : true;
  const canOrder = isAvailable && (product.variants.length === 0 || variantAvailable);
  const totalPrice = selectedVariant ? selectedVariant.price * qty : null;

  const handleWhatsAppOrder = () => {
    const message = renderWaTemplate(waTemplate, {
      product: product.name,
      packaging: selectedVariant ? PACKAGING_LABEL[selectedVariant.packagingType] : product.category,
      qty: String(qty),
      total: selectedVariant ? formatRupiah(selectedVariant.price * qty) : "-",
    });
    const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 md:pt-32 pb-16 md:pb-24">
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-1 space-y-4">
            <div
              className="relative aspect-square bg-[#0a0a0a] border border-white/5 rounded-xl md:rounded-2xl overflow-hidden group shadow-2xl touch-pan-y select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              {activeImage && (
                <Image
                  src={activeImage.url}
                  alt={activeImage.alt ?? `Premium Cigar ${product.name} - ${product.category} Kilau Cigar Indonesia`}
                  fill
                  className="object-contain p-12 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] scale-110 group-hover:scale-125 transition-transform duration-1000 pointer-events-none"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              {!isAvailable && (
                <div className="absolute top-4 right-4 px-4 py-2 bg-red-600 border border-red-400/40 text-white text-[10px] font-bold uppercase tracking-widest">
                  {stockLabel}
                </div>
              )}

              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goToImage(activeImageIndex - 1)}
                    aria-label={isIndo ? "Gambar sebelumnya" : "Previous image"}
                    className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => goToImage(activeImageIndex + 1)}
                    aria-label={isIndo ? "Gambar berikutnya" : "Next image"}
                    className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </button>
                  <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    {product.images.map((img, i) => (
                      <span
                        key={img.url}
                        className={`h-1.5 rounded-full transition-all ${i === activeImageIndex ? "w-5 bg-secondary" : "w-1.5 bg-white/30"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img.url}
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border transition-all flex-shrink-0 ${
                      i === activeImageIndex ? "border-secondary" : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt ?? `${product.name} thumbnail ${i + 1}`}
                      fill
                      className="object-contain p-1.5 bg-[#0a0a0a]"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6 md:space-y-10 order-2">
            <div className="space-y-3 md:space-y-4">
              <nav className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4 md:mb-6">
                <Link href="/produk" className="hover:text-white transition-colors">{tNavbar("products")}</Link>
                <span>/</span>
                <span className="text-secondary">{product.category}</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1]">
                {product.name}
              </h1>
              <div className="w-16 md:w-20 h-px bg-secondary/50"></div>
            </div>

            <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed max-w-xl">
              {product.description}
            </p>

            {product.variants.length > 0 && (
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] block">
                  {isIndo ? "Pilih Kemasan" : "Choose Packaging"}
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v, i) => {
                    const active = i === selectedVariantIndex;
                    const soldOut = v.stockStatus !== "READY";
                    return (
                      <button
                        key={v.packagingType}
                        type="button"
                        onClick={() => setSelectedVariantIndex(i)}
                        disabled={soldOut}
                        className={`px-5 py-3 rounded-lg border text-left transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                          active ? "border-secondary bg-secondary/10" : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div className={`text-xs font-bold uppercase tracking-widest ${active ? "text-secondary" : "text-white"}`}>
                          {PACKAGING_LABEL[v.packagingType]}
                          {v.qtyPerBox ? <span className="text-zinc-500 font-normal normal-case"> ({v.qtyPerBox}pcs)</span> : null}
                        </div>
                        <div className="text-zinc-400 text-sm mt-0.5">
                          {soldOut ? (isIndo ? "Stok Habis" : "Sold Out") : formatRupiah(v.price)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {canOrder && selectedVariant && (
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">{isIndo ? "Jumlah" : "Qty"}</span>
                <div className="flex items-center border border-white/10 rounded-full">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center text-white hover:text-secondary transition-colors"
                    aria-label={isIndo ? "Kurangi jumlah" : "Decrease quantity"}
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-white font-bold text-sm">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="w-9 h-9 flex items-center justify-center text-white hover:text-secondary transition-colors"
                    aria-label={isIndo ? "Tambah jumlah" : "Increase quantity"}
                  >
                    +
                  </button>
                </div>
                {totalPrice != null && (
                  <span className="text-secondary font-bold text-lg">{formatRupiah(totalPrice)}</span>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <button
                onClick={handleWhatsAppOrder}
                disabled={!canOrder}
                className={`w-full sm:w-auto px-12 py-5 text-white font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 shadow-xl rounded-full flex items-center justify-center gap-3 ${
                  canOrder
                    ? "bg-secondary hover:bg-white hover:text-black"
                    : "bg-red-600 opacity-70 cursor-not-allowed"
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {canOrder ? `${tNavbar("contact")} (WhatsApp)` : stockLabel}
              </button>
              <Link
                href={`/kontak?produk=${product.slug}`}
                className="text-zinc-500 hover:text-secondary text-[10px] uppercase font-bold tracking-[0.3em] transition-colors"
              >
                {isIndo ? "Atau tanya via form kontak →" : "Or ask via contact form →"}
              </Link>
            </div>

            {operatingHours && (
              <p className="text-zinc-600 text-xs font-light">{operatingHours}</p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#080808] py-20 md:py-32 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="mb-12 md:mb-20 space-y-3 md:space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white uppercase">{tCommon("details")}</h2>
            <div className="w-12 md:w-16 h-px bg-secondary/30"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {[
              { label: tSpecs("length"), value: product.specs.length },
              { label: tSpecs("ring"), value: product.specs.ring },
              { label: tSpecs("shape"), value: product.specs.shape },
              { label: tSpecs("strength"), value: product.specs.strength },
              { label: tSpecs("wrapper"), value: product.specs.wrapper },
              { label: tSpecs("binder"), value: product.specs.binder },
              { label: tSpecs("filler"), value: product.specs.filler },
              { label: isIndo ? "Kategori" : "Category", value: product.category },
            ].map((spec, i) => (
              <div key={i} className="bg-[#050505] p-6 sm:p-10 space-y-2 hover:bg-white/5 transition-colors group">
                <span className="text-[9px] md:text-[10px] font-bold text-zinc-600 uppercase tracking-widest group-hover:text-secondary transition-colors">{spec.label}</span>
                <p className="text-white font-serif text-base md:text-lg">{spec.value || "Premium Blend"}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-0 right-0 w-[40vw] h-full bg-secondary/5 skew-x-12 translate-x-1/2 blur-2xl"></div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-32">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 md:mb-16">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">{isIndo ? "Koleksi Terkait" : "Related Collection"}</h2>
              <p className="text-zinc-500 text-[10px] md:text-sm uppercase tracking-widest">{isIndo ? "Lainnya dari" : "Others from"} {product.category}</p>
            </div>
            <Link href="/produk" className="text-secondary text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors border-b border-secondary/20 pb-1">
              {isIndo ? "Lihat Semua" : "View All"}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/produk/${p.slug}`} className="group space-y-6">
                <div className="relative aspect-square bg-[#0a0a0a] border border-white/5 overflow-hidden group-hover:border-secondary/20 transition-all duration-700 rounded-sm">
                  <Image
                    src={p.img}
                    alt={`Cerutu Terkait: ${p.name}`}
                    fill
                    className="object-contain p-8 md:p-12 group-hover:scale-110 transition-transform duration-1000"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-serif font-bold text-white group-hover:text-secondary transition-colors">{p.name}</h3>
                  <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-zinc-600 font-bold">{p.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="fixed top-1/2 left-0 -translate-y-1/2 w-[300px] h-[600px] bg-secondary/5 blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
    </div>
  );
}
