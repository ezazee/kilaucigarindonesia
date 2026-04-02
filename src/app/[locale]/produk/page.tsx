"use client";

import Image from "next/image";
import { Link } from "@/lib/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ALL_PRODUCTS } from "@/lib/data/products";

// Products now imported from @/lib/data/products


export default function ProdukPage() {
  const t = useTranslations("Products");
  const tCommon = useTranslations("Common");
  const [activeCategory, setActiveCategory] = useState(tCommon("all"));
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const filteredProducts = activeCategory === tCommon("all") 
    ? ALL_PRODUCTS 
    : ALL_PRODUCTS.filter(p => p.category === activeCategory);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24">
      {/* Header Section - Adaptive for Mobile */}
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
            {t("title")} <span className="italic text-gradient-red">{t("subtitle")}</span>
          </h1>
          <div className="w-16 md:w-24 h-[1px] bg-secondary/50 mx-auto"></div>
        </div>
        <p className="max-w-2xl mx-auto text-zinc-500 font-light leading-relaxed tracking-wide text-sm md:text-lg px-4 md:px-0">
          {t("description")}
        </p>
      </div>

      {/* Category Filter - Scrollable on Mobile */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-12 md:mb-16 overflow-x-auto no-scrollbar touch-pan-x">
        <div className="flex items-center justify-start md:justify-center gap-6 md:gap-10 border-y border-white/5 py-6 md:py-8 min-w-max md:min-w-0 mx-auto">
          {[tCommon("all"), "Black Gold", "Blue Gold", "Red Gold", "White Gold"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`text-[9px] md:text-xs font-bold uppercase tracking-[0.3em] transition-all relative py-2 whitespace-nowrap ${
                activeCategory === cat ? "text-secondary" : "text-zinc-600 hover:text-white"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-secondary animate-in fade-in duration-500"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid - Responsive Columns */}
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-12 md:gap-y-20">
          {currentProducts.map((product) => (
            <Link 
              key={product.id} 
              href={`/produk/${product.slug}`}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square mb-8 overflow-hidden bg-[#0a0a0a] border border-white/5 group-hover:border-secondary/20 transition-all duration-700">
                <Image 
                  src={product.img} 
                  alt={`Cerutu ${product.name} - ${product.category}`} 
                  fill 
                  className="object-cover scale-[0.8] group-hover:scale-[0.9] transition-transform duration-1000"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="px-8 py-3 border border-white text-white font-bold uppercase tracking-widest text-[9px]">{tCommon("details")}</span>
                </div>
              </div>
              <div className="text-center space-y-2">
                <span className="text-[8px] font-bold text-secondary uppercase tracking-[0.4em]">{product.category}</span>
                <h3 className="text-2xl font-serif font-bold text-white group-hover:text-secondary transition-colors duration-300">{product.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
          <p className="text-zinc-600 uppercase tracking-widest text-sm">{t("noProducts")}</p>
          </div>
        )}

        {/* Pagination Section */}
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

      {/* Decorative background element */}
      <div className="fixed bottom-0 right-0 w-[50vw] h-[50vw] bg-secondary/5 blur-[200px] pointer-events-none -z-10"></div>
    </div>
  );
}
