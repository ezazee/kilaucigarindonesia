"use client";

import Image from "next/image";
import { Link } from "@/lib/navigation";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { ALL_PRODUCTS } from "@/lib/data/products";

export default function ProductDetailPage() {
  const t = useTranslations("ProductsData");
  const tSpecs = useTranslations("ProductSpecs");
  const tCommon = useTranslations("Common");
  const tNavbar = useTranslations("Navbar");
  const isIndo = tNavbar("home") === "Beranda";
  const params = useParams();
  const slug = params?.slug as string;

  const product = useMemo(() => 
    ALL_PRODUCTS.find(p => p.slug === slug),
    [slug]
  );

  const relatedProducts = useMemo(() => 
    ALL_PRODUCTS
      .filter(p => p.category === product?.category && p.slug !== slug)
      .slice(0, 3),
    [product, slug]
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white space-y-8">
        <h1 className="text-4xl font-serif">Produk Tidak Ditemukan</h1>
        <Link href="/produk" className="text-secondary hover:underline uppercase tracking-widest text-xs font-bold">
          {tCommon("back")}
        </Link>
      </div>
    );
  }

  const handleWhatsAppOrder = () => {
    const greeting = isIndo ? "Halo Kilau Cigar Indonesia" : "Hello Kilau Cigar Indonesia";
    const interested = isIndo ? "saya tertarik untuk memesan produk" : "I am interested in ordering the product";
    const categoryLabel = isIndo ? "Kategori" : "Category";
    const infoLabel = isIndo ? "Mohon informasi ketersediaan dan harganya. Terima kasih." : "Please provide availability and price information. Thank you.";

    const message = `${greeting}, ${interested}:\n\n*${product.name}*\n${categoryLabel}: ${product.category}\n\n${infoLabel}`;
    const waUrl = `https://wa.me/6281120078910?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Product Hero Section - Responsive Layout */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: Product Image - Prominent on all screens */}
          <div className="relative aspect-square bg-[#0a0a0a] border border-white/5 rounded-xl md:rounded-2xl overflow-hidden group shadow-2xl order-1">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-transparent opacity-50"></div>
            <Image 
              src={product.img} 
              alt={`Premium Cigar ${product.name} - ${product.category} Kilau Cigar Indonesia`} 
              fill 
              className="object-contain p-12 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] scale-110 group-hover:scale-125 transition-transform duration-1000"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right: Product Info - Adaptive Spacing */}
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
              {t(`${product.slug}.description`)}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <button 
                onClick={handleWhatsAppOrder}
                className="w-full sm:w-auto px-12 py-5 bg-secondary text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-all duration-500 shadow-xl rounded-full flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {tNavbar("contact")} (WhatsApp)
              </button>
              <div className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.3em]">
                {isIndo ? "Tanya Harga & Stok" : "Ask Price & Stock"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section - Adaptive Grid */}
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
        
        {/* Decorative BG */}
        <div className="absolute top-0 right-0 w-[40vw] h-full bg-secondary/5 skew-x-12 translate-x-1/2 blur-2xl"></div>
      </section>

      {/* Related Products - Adaptive Spacing */}
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
      
      {/* Decorative Fixed Glow */}
      <div className="fixed top-1/2 left-0 -translate-y-1/2 w-[300px] h-[600px] bg-secondary/5 blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
    </div>
  );
}
