"use client";

import Image from "next/image";
import { Link } from "@/lib/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");
  const tCommon = useTranslations("Common");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 scale-110"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
           <Image
            src="/images/about/lifestyle.webp"
            alt="Gaya hidup menikmati cerutu premium Kilau Cigar Indonesia"
            fill
            className="object-cover opacity-30 brightness-50"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
        </div>

        <div className="relative z-10 text-center space-y-8 max-w-5xl px-6">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-secondary text-[11px] font-bold uppercase tracking-[0.6em] mb-4">{t("badge")}</h1>
            <div className="w-12 h-[1px] bg-secondary/50 mx-auto"></div>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter leading-none animate-slide-up">
            Kilau <span className="italic text-secondary">Cigar</span> Indonesia
          </h2>
          
          <div className="max-w-2xl mx-auto pt-8">
            <p className="text-zinc-300 font-light leading-relaxed text-lg italic animate-fade-in-delayed">
              {t("tagline")}
            </p>
          </div>
        </div>
      </section>

      {/* History & Story Section */}
      <section className="py-24 md:py-40 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            {/* Left: Image with artistic frame */}
            <div className="relative aspect-[4/5] animate-slide-left group order-2 lg:order-1">
              <div className="absolute -inset-6 border border-secondary/10 translate-x-12 translate-y-12 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-1000"></div>
              <div className="relative h-full overflow-hidden shadow-2xl">
                <Image
                  src="/images/about/portrait.webp"
                  alt="Potret penikmat cerutu berpengalaman - Tradisi Kilau Cigar"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-16 animate-slide-right order-1 lg:order-2">
              <div className="space-y-6">
                <h3 className="text-secondary text-xs font-bold uppercase tracking-[0.4em]">{t("historyBadge")}</h3>
                <h4 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                  {t("historyTitle")} <br />
                  <span className="italic">{t("historySubtitle")}</span>
                </h4>
              </div>
              
              <div className="space-y-10 text-zinc-400 font-light leading-[1.8] text-lg">
                <div className="space-y-4">
                  <p>
                    {t("historyDesc1")}
                  </p>
                  <p>
                    {t("historyDesc2")}
                  </p>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/5">
                  <h5 className="text-white font-serif italic text-2xl">{t("experienceTitle")}</h5>
                  <p>
                    {t("experienceDesc")}
                  </p>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/5">
                  <h5 className="text-white font-serif italic text-2xl">{t("nicaraguaTitle")}</h5>
                  <p>
                    {t("nicaraguaDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section - Split Layout */}
      <section className="py-32 bg-[#080808] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-10">
              <div className="space-y-6">
                <h3 className="text-4xl md:text-6xl font-serif font-bold leading-tight uppercase">
                  {t("innovationTitle")} <br />
                  <span className="text-secondary italic">{t("innovationSubtitle")}</span>
                </h3>
                <div className="w-20 h-[1px] bg-secondary"></div>
              </div>
              
              <p className="text-zinc-400 font-light text-xl leading-relaxed">
                {t("innovationDesc")}
              </p>

              <Link 
                href="/kontak" 
                className="inline-block px-14 py-5 border border-secondary text-secondary font-bold uppercase tracking-widest text-[11px] hover:bg-secondary hover:text-black transition-all duration-500"
              >
                {tCommon("submit")}
              </Link>
            </div>
            
            <div className="flex-1 relative w-full aspect-square md:aspect-video lg:aspect-square group">
               <div className="absolute inset-0 bg-secondary/5 blur-[120px] rounded-full group-hover:bg-secondary/10 transition-colors duration-1000"></div>
               <Image
                  src="/images/about/montenegro_box.png"
                  alt="Kotak Cerutu Montenegro Edicion Limitada - Koleksi Eksklusif"
                  fill
                  className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] p-12 transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Quote Section */}
      <section className="py-48 relative overflow-hidden text-center bg-[#050505]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-secondary/5 blur-[200px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-8 relative z-10 space-y-12">
          <div className="text-secondary text-6xl font-serif">“</div>
          <h3 className="text-4xl md:text-6xl font-serif font-bold italic leading-tight text-white/90">
            {t("quote")}
          </h3>
          <div className="w-24 h-[1px] bg-secondary/40 mx-auto"></div>
          <p className="text-zinc-500 uppercase tracking-[0.5em] text-[10px] font-bold">{t("heritage")}</p>
        </div>
      </section>

      {/* Bottom Quality Section */}
      <section className="py-32 relative text-center">
        <div className="max-w-4xl mx-auto px-8 space-y-12">
          <div className="flex flex-col items-center space-y-6">
             <div className="w-12 h-12 relative opacity-50 grayscale contrast-150">
               <Image 
                 src="/logo/kci-logo-png-300x175.png" 
                 alt="Logo Kilau Cigar Indonesia Kualitas Premium" 
                 fill 
                 className="object-contain" 
                 sizes="48px"
               />
             </div>
             <h3 className="text-4xl md:text-5xl font-serif font-bold">
                {t("qualityTitle")} <br />
                <span className="text-secondary">{t("qualitySubtitle")}</span>
             </h3>
          </div>
          
          <p className="text-zinc-400 font-light text-lg leading-relaxed">
            {t("qualityDesc")}
          </p>

          <div className="pt-12 flex flex-col md:flex-row items-center justify-center gap-10">
            <Link 
              href="/produk" 
              className="px-14 py-6 bg-secondary text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-700 shadow-xl"
            >
              {tCommon("explore")}
            </Link>
          </div>
        </div>
      </section>

      {/* Subtle Footer Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </div>
  );
}
