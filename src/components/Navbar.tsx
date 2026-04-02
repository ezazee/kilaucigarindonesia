"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/lib/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on path change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const isActive = (path: string) => pathname === path;

  const NavLinks = [
    { name: t("home"), href: "/" },
    { name: t("products"), href: "/produk" },
    { name: t("about"), href: "/tentang-kami" },
    { name: t("contact"), href: "/kontak" },
  ];

  const MontenegroSublinks = [
    { name: t("blackGold"), href: "/montenegro/black-gold" },
    { name: t("blueGold"), href: "/montenegro/blue-gold" },
    { name: t("redGold"), href: "/montenegro/red-gold" },
    { name: t("whiteGold"), href: "/montenegro/white-gold" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled || isMenuOpen ? "bg-[#050505] border-b border-white/5 py-3 xl:py-2" : "bg-transparent py-5 xl:py-8"
    }`}>
      <div className="max-w-7xl mx-auto px-6 xl:px-8 flex items-center justify-between">
        
        {/* Mobile Toggle - Visible up to XL */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="xl:hidden z-[110] relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>

        {/* Desktop Left Menu - Visible from XL */}
        <div className="hidden xl:flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase flex-1 justify-start">
          <Link href="/" className={`hover:text-secondary transition-all duration-300 relative group py-4 ${isActive('/') ? 'text-secondary' : 'text-white'}`}>
            {t("home")}
            <span className={`absolute bottom-3 left-0 h-[1px] bg-secondary transition-all duration-300 ${isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          
          <div className="relative group">
            <div className={`hover:text-secondary transition-all duration-300 relative flex items-center gap-2 cursor-pointer py-4 ${pathname.startsWith('/montenegro') ? 'text-secondary' : 'text-white'}`}>
              {t("montenegro")}
              <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
              <span className={`absolute bottom-3 left-0 h-[1px] bg-secondary transition-all duration-300 ${pathname.startsWith('/montenegro') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </div>
            
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
              <ul className="w-56 bg-[#050505] border border-white/10 shadow-2xl">
                {MontenegroSublinks.map((link) => (
                  <li key={link.href} className="border-b border-white/5 last:border-0">
                    <Link href={link.href} className="block px-6 py-4 text-[10px] text-zinc-400 hover:bg-white/5 hover:text-secondary transition-colors tracking-[0.1em] font-bold">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <Link href="/produk" className={`hover:text-secondary transition-all duration-300 relative group py-4 ${isActive('/produk') ? 'text-secondary' : 'text-white'}`}>
            {t("products")}
            <span className={`absolute bottom-3 left-0 h-[1px] bg-secondary transition-all duration-300 ${isActive('/produk') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
        </div>
        
        {/* Center Logo - Always Center & Visible */}
        <div className="flex flex-col items-center py-1 px-4 md:px-8 shrink-0">
          <Link href="/" className="w-[100px] md:w-[120px] xl:w-[140px] block relative">
            <Image 
              src="/logo/kci-logo-png-300x175.png"
              alt="Logo Kilau Cigar Indonesia - Navigasi Beranda"
              width={140}
              height={82}
              style={{ width: "100%", height: "auto" }}
              className="brightness-110 contrast-110 object-contain"
              priority
              sizes="(max-width: 768px) 100px, (max-width: 1200px) 120px, 140px"
            />
          </Link>
        </div>

        {/* Desktop Right Menu - Visible from XL */}
        <div className="hidden xl:flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase flex-1 justify-end">
          <Link href="/tentang-kami" className={`hover:text-secondary transition-all duration-300 relative group py-4 ${isActive('/tentang-kami') ? 'text-secondary' : 'text-white'}`}>
            {t("about")}
            <span className={`absolute bottom-3 left-0 h-[1px] bg-secondary transition-all duration-300 ${isActive('/tentang-kami') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          <Link href="/kontak" className={`hover:text-secondary transition-all duration-300 relative group py-4 ${isActive('/kontak') ? 'text-secondary' : 'text-white'}`}>
            {t("contact")}
            <span className={`absolute bottom-3 left-0 h-[1px] bg-secondary transition-all duration-300 ${isActive('/kontak') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>

          {/* Language Switcher - Desktop Dropdown */}
          <div className="relative group ml-4 pl-4 border-l border-white/10">
            <div className="flex items-center gap-2 cursor-pointer py-4 text-[9px] font-black tracking-widest uppercase text-white hover:text-secondary transition-all duration-300">
              <span className="text-sm leading-none">{locale === 'id' ? '🇮🇩' : '🇬🇧'}</span>
              <span>{locale === 'id' ? 'ID' : 'EN'}</span>
              <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
              <ul className="w-32 bg-[#050505] border border-white/10 shadow-2xl">
                <li className="border-b border-white/5">
                  <Link href={pathname} locale="id" className={`flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-widest font-bold transition-colors ${locale === 'id' ? 'text-secondary bg-white/5' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
                    <span className="text-sm leading-none pt-0.5">🇮🇩</span> ID
                  </Link>
                </li>
                <li>
                  <Link href={pathname} locale="en" className={`flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-widest font-bold transition-colors ${locale === 'en' ? 'text-secondary bg-white/5' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
                    <span className="text-sm leading-none pt-0.5">🇬🇧</span> EN
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Spacer (for logo centering) */}
        <div className="w-10 xl:hidden"></div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`xl:hidden fixed inset-0 bg-[#050505] z-[105] transition-all duration-700 ease-in-out ${
        isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-full"
      }`}>
        <div className="h-full flex flex-col pt-32 px-10 pb-20 justify-between overflow-y-auto">
          <div className="space-y-10">
            {NavLinks.map((link) => (
              <div key={link.href} className="group">
                <Link 
                  href={link.href}
                  className={`text-3xl font-serif font-bold ${isActive(link.href) ? "text-secondary" : "text-white"}`}
                >
                  {link.name}
                </Link>
              </div>
            ))}
            
            <div className="pt-8 space-y-6">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block">Collections</span>
              <div className="grid grid-cols-1 gap-6">
                {MontenegroSublinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href}
                    className="text-lg text-zinc-400 hover:text-secondary transition-colors"
                  >
                    {link.name.replace('Koleksi ', '')}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 space-y-8">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block">Language</span>
              <div className="flex flex-col gap-3">
                <Link 
                  href={pathname} 
                  locale="id" 
                  className={`flex items-center gap-3 text-sm font-bold uppercase tracking-widest ${locale === 'id' ? 'text-secondary' : 'text-zinc-500 hover:text-white'}`}
                >
                  <span className="text-lg leading-none">🇮🇩</span> Bahasa Indonesia
                </Link>
                <Link 
                  href={pathname} 
                  locale="en" 
                  className={`flex items-center gap-3 text-sm font-bold uppercase tracking-widest ${locale === 'en' ? 'text-secondary' : 'text-zinc-500 hover:text-white'}`}
                >
                  <span className="text-lg leading-none">🇬🇧</span> English
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[9px] text-zinc-600 uppercase tracking-widest">&copy; 2024 Kilau Cigar Indonesia</p>
              <div className="flex gap-6">
                <a href="https://instagram.com/kilaucigarindonesia" target="_blank" rel="noopener noreferrer" className="text-[10px] text-secondary font-bold uppercase tracking-widest">Instagram</a>
                <a href="https://wa.me/6281120078910" target="_blank" rel="noopener noreferrer" className="text-[10px] text-secondary font-bold uppercase tracking-widest">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
