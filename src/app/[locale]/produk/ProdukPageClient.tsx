"use client";

import Image from "next/image";
import { Link } from "@/lib/navigation";
import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { formatRupiah } from "@/lib/product-helpers";

export interface ProductListItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  img: string;
  boxImg: string | null;
  hasSatuan: boolean;
  hasCardBox: boolean;
  hasWoodenBox: boolean;
  minPrice: number | null;
  stockStatus: string;
}

const STOCK_LABEL: Record<string, { id: string; en: string }> = {
  SOLD_OUT: { id: "Stok Habis", en: "Sold Out" },
  DISCONTINUED: { id: "Tidak Diproduksi", en: "Discontinued" },
};

type PackagingFilter = "ALL" | "SATUAN" | "CARD_BOX" | "WOODEN_BOX";
type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

// Sentinel for the "all categories" tab. Must be a stable value independent of
// the translated label (tCommon("all") differs per locale) so the filter keeps
// working when the user switches language without a full page reload.
const ALL_CATEGORIES = "__all__";

export default function ProdukPageClient({
  products,
  heroTitle,
  heroSubtitle,
  heroDescription,
}: {
  products: ProductListItem[];
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
}) {
  const t = useTranslations("Products");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const isIndo = locale !== "en";
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES);
  const [packagingFilter, setPackagingFilter] = useState<PackagingFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const productsPerPage = 6;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const SORT_OPTIONS: { key: SortOption; label: string }[] = [
    { key: "default", label: isIndo ? "Urutan Default" : "Default Order" },
    { key: "price-asc", label: isIndo ? "Harga Terendah" : "Price: Low to High" },
    { key: "price-desc", label: isIndo ? "Harga Tertinggi" : "Price: High to Low" },
    { key: "name-asc", label: isIndo ? "Nama A-Z" : "Name A-Z" },
  ];

  const PACKAGING_OPTIONS: { key: PackagingFilter; label: string }[] = [
    { key: "ALL", label: isIndo ? "Semua" : "All" },
    { key: "SATUAN", label: isIndo ? "Bisa Satuan" : "Available per Stick" },
    { key: "CARD_BOX", label: isIndo ? "Card Box" : "Card Box" },
    { key: "WOODEN_BOX", label: isIndo ? "Wooden Box" : "Wooden Box" },
  ];

  const filteredProducts = products
    .filter((p) => activeCategory === ALL_CATEGORIES || p.category === activeCategory)
    .filter((p) => {
      if (packagingFilter === "SATUAN") return p.hasSatuan;
      if (packagingFilter === "CARD_BOX") return p.hasCardBox;
      if (packagingFilter === "WOODEN_BOX") return p.hasWoodenBox;
      return true;
    })
    .filter((p) => p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price-asc") return (a.minPrice ?? Infinity) - (b.minPrice ?? Infinity);
      if (sortBy === "price-desc") return (b.minPrice ?? -Infinity) - (a.minPrice ?? -Infinity);
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });

  const showBoxImage = packagingFilter === "CARD_BOX" || packagingFilter === "WOODEN_BOX";

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handlePackagingChange = (key: PackagingFilter) => {
    setPackagingFilter(key);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center space-y-8 md:space-y-12 mb-16 md:mb-20">
        <div className="flex flex-col items-center space-y-4 md:space-y-6">
          <div className="w-16 h-16 md:w-20 md:h-20 relative opacity-40">
             <Image
               src="/images/products/bomba.png"
               alt="Ikon Produk Cerutu Premium Kilau Cigar"
               fill
               className="object-contain grayscale contrast-200"
               sizes="80px"
             />
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold text-white uppercase tracking-tighter">
            {heroTitle} <span className="italic text-gradient-red">{heroSubtitle}</span>
          </h1>
          <div className="w-16 md:w-24 h-[1px] bg-secondary/50 mx-auto"></div>
        </div>
        <p className="max-w-2xl mx-auto text-zinc-500 font-light leading-relaxed tracking-wide text-sm md:text-lg px-4 md:px-0">
          {heroDescription}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-12 md:mb-16 overflow-x-auto no-scrollbar touch-pan-x">
        <div className="flex items-center justify-start md:justify-center gap-6 md:gap-10 border-y border-white/5 py-6 md:py-8 min-w-max md:min-w-0 mx-auto">
          {[ALL_CATEGORIES, ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`text-[9px] md:text-xs font-bold uppercase tracking-[0.3em] transition-all relative py-2 whitespace-nowrap ${
                activeCategory === cat ? "text-secondary" : "text-zinc-600 hover:text-white"
              }`}
            >
              {cat === ALL_CATEGORIES ? tCommon("all") : cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-secondary animate-in fade-in duration-500"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-8 md:mb-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
          <div className="relative w-full sm:flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
            </svg>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={isIndo ? "Cari produk..." : "Search products..."}
              aria-label={isIndo ? "Cari produk" : "Search products"}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-full pl-11 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-secondary/50 transition-colors"
            />
          </div>
          <div className="relative w-full sm:w-auto" ref={sortRef}>
            <button
              type="button"
              onClick={() => setIsSortOpen((v) => !v)}
              aria-label={isIndo ? "Urutkan produk" : "Sort products"}
              className="w-full sm:w-auto flex items-center justify-between gap-3 bg-[#0a0a0a] border border-white/10 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-widest text-zinc-300 hover:border-white/20 focus:outline-none focus:border-secondary/50 transition-colors cursor-pointer whitespace-nowrap"
            >
              {SORT_OPTIONS.find((o) => o.key === sortBy)?.label}
              <svg className={`w-3 h-3 shrink-0 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isSortOpen && (
              <div className="absolute z-50 mt-2 w-full sm:w-56 right-0 bg-[#0d0d0d] border border-white/10 rounded-lg shadow-2xl overflow-hidden divide-y divide-white/5">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => {
                      setSortBy(opt.key);
                      setCurrentPage(1);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                      sortBy === opt.key ? "text-secondary bg-white/5" : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-12 md:mb-16">
        <div className="flex items-center justify-center gap-3 md:gap-4">
          {PACKAGING_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => handlePackagingChange(opt.key)}
              className={`px-4 md:px-5 py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-full border transition-all whitespace-nowrap ${
                packagingFilter === opt.key
                  ? "bg-secondary border-secondary text-white"
                  : "border-white/10 text-zinc-500 hover:border-white/30 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-12 md:gap-y-20">
          {currentProducts.map((product) => {
            const isSoldOut = product.stockStatus !== "READY";
            const stockLabel = isIndo ? STOCK_LABEL[product.stockStatus]?.id : STOCK_LABEL[product.stockStatus]?.en;
            return (
              <Link
                key={product.id}
                href={`/produk/${product.slug}`}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square mb-8 overflow-hidden bg-[#0a0a0a] border border-white/5 group-hover:border-secondary/20 transition-all duration-700">
                  <Image
                    src={showBoxImage && product.boxImg ? product.boxImg : product.img}
                    alt={`Cerutu ${product.name} - ${product.category}${showBoxImage && product.boxImg ? " (Box)" : ""}`}
                    fill
                    className={`object-cover scale-[0.8] group-hover:scale-[0.9] transition-transform duration-1000 ${isSoldOut ? "grayscale opacity-50" : ""}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {isSoldOut && (
                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-red-600 border border-red-400/40 text-white text-[9px] font-bold uppercase tracking-widest">
                      {stockLabel}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="px-8 py-3 border border-white text-white font-bold uppercase tracking-widest text-[9px]">{tCommon("details")}</span>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <span className="text-[8px] font-bold text-secondary uppercase tracking-[0.4em]">{product.category}</span>
                  <h3 className="text-2xl font-serif font-bold text-white group-hover:text-secondary transition-colors duration-300">{product.name}</h3>
                  {isSoldOut ? (
                    <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{stockLabel}</p>
                  ) : (
                    product.minPrice !== null && (
                      <p className="text-zinc-400 text-sm font-light">
                        {isIndo ? "Mulai dari" : "Starting from"} <span className="text-secondary font-bold">{formatRupiah(product.minPrice)}</span>
                      </p>
                    )
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
          <p className="text-zinc-600 uppercase tracking-widest text-sm">{t("noProducts")}</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-32 flex justify-center items-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="w-12 h-12 border border-white/10 flex items-center justify-center text-white disabled:opacity-20 hover:border-secondary transition-all"
            >
               <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 border flex items-center justify-center text-[10px] font-bold transition-all ${
                    currentPage === i + 1
                      ? "bg-secondary border-secondary text-white shadow-[0_0_20px_rgba(106,56,33,0.3)]"
                      : "border-white/10 text-zinc-500 hover:border-white/30"
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="w-12 h-12 border border-white/10 flex items-center justify-center text-white disabled:opacity-20 hover:border-secondary transition-all"
            >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 right-0 w-[50vw] h-[50vw] bg-secondary/5 blur-[200px] pointer-events-none -z-10"></div>
    </div>
  );
}
