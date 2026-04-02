"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

const ALL_PRODUCTS = [
  { id: 3, name: "Comandate Series E" },
  { id: 9, name: "Grend Torpedo Series E" },
  { id: 14, name: "Toro Especial Serie F" },
  { id: 18, name: "Toro Especial Serie S" },
  { id: 19, name: "Toro Special Aniv" },
  { id: 8, name: "Grand Robusto (Blue)" },
  { id: 12, name: "Toro (Blue)" },
  { id: 15, name: "Torpedo (Blue)" },
  { id: 2, name: "Cigarillos" },
  { id: 6, name: "Gorditto" },
  { id: 11, name: "Petit Corona" },
  { id: 1, name: "Bomba" },
  { id: 4, name: "Crucero" },
  { id: 5, name: "El Jefe" },
];

export default function ContactPage() {
  const t = useTranslations("Contact");
  const tNavbar = useTranslations("Navbar");
  const isIndo = tNavbar("home") === "Beranda";
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    selectedProducts: [] as string[],
    message: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleProduct = (productName: string) => {
    setFormState(prev => ({
      ...prev,
      selectedProducts: prev.selectedProducts.includes(productName)
        ? prev.selectedProducts.filter(p => p !== productName)
        : [...prev.selectedProducts, productName]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productList = formState.selectedProducts.map(p => `  - ${p}`).join("\n");
    
    // Localized message template
    const nameLabel = isIndo ? "nama pemesan" : "customer name";
    const emailLabel = isIndo ? "email" : "email";
    const productLabel = isIndo ? "produk" : "products";
    const detailLabel = isIndo ? "Detail Pesanan" : "Order Details";

    const waText = `${nameLabel}: ${formState.name}\n${emailLabel} : ${formState.email}\n${productLabel} :\n${productList}\n\n${detailLabel}:\n${formState.message}`;
    const waUrl = `https://wa.me/6281120078910?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, "_blank");

    setFormState({
      name: "",
      email: "",
      selectedProducts: [],
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden pt-20">
      {/* Hero Section - Adaptive for Mobile */}
      <section className="py-16 md:py-20 relative overflow-hidden text-center bg-black/40 px-6 md:px-8">
        <h1 className="text-secondary text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] mb-4">{tNavbar("contact")}</h1>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold tracking-tighter">
          {t("title")} <span className="italic text-secondary font-style-italic">{t("subtitle")}</span>
        </h2>
      </section>

      {/* Horizontal Contact Info - Stacks on Mobile */}
      <section className="py-10 md:py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-10 md:gap-12 text-center md:text-left">
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-[#ff0000] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em]">WhatsApp</h4>
              <a
                href="https://wa.me/6281120078910"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl sm:text-2xl md:text-3xl font-serif italic text-white leading-none hover:text-secondary transition-colors"
              >
                +62 811 2007 8910
              </a>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-[#ff0000] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em]">Email</h4>
              <a
                href="mailto:admin@kilaucigarindonesia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl sm:text-2xl md:text-3xl font-serif italic text-white leading-none hover:text-secondary transition-colors block break-all"
              >
                admin@kilaucigarindonesia.com
              </a>
            </div>
            <div className="space-y-3 md:space-y-4 md:text-right">
              <h4 className="text-[#ff0000] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em]">Office</h4>
              <a
                href="https://maps.google.com/?q=Jl. Dukuh Patra II No.75, RT.1/RW.13, Menteng Dalam, Kec. Tebet, Kota Jakarta Selatan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg sm:text-xl md:text-2xl font-serif italic text-zinc-400 leading-none hover:text-secondary transition-colors"
              >
                Jakarta Selatan
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
                src="/images/contact/hero.webp"
                alt="Kilau Cigar Heritage"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute bottom-10 left-10 z-20 space-y-2">
                <h4 className="text-secondary text-xs font-bold uppercase tracking-[0.4em]">{isIndo ? "Seleksi Premium" : "Premium Selection"}</h4>
                <p className="text-2xl font-serif italic text-white">{isIndo ? "Tembakau Terbaik Nicaragua" : "Nicaragua's Finest Tobacco"}</p>
              </div>
            </div>

            {/* Right: Compact Form */}
            <div className="space-y-12 max-w-lg">
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-white text-3xl md:text-4xl font-serif font-bold italic">{t("formTitle")}</h3>
                <p className="text-zinc-500 text-xs md:text-sm">{t("formDesc")}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Name */}
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-zinc-400 block uppercase tracking-[0.3em]">{t("name")}</label>
                  <div className="relative group">
                    <p className="text-zinc-600 text-[10px] mb-2 italic">{isIndo ? "Cth: Budi dari PT Sejahtera" : "Ex: John from Heritage Corp"}</p>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-secondary transition-colors font-light text-white text-lg"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-zinc-400 block uppercase tracking-[0.3em]">{t("email")}</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-secondary transition-colors font-light text-white text-lg"
                  />
                </div>

                {/* Dropdown Multi-Select */}
                <div className="space-y-4" ref={dropdownRef}>
                  <label className="text-[10px] font-bold text-zinc-400 block uppercase tracking-[0.3em]">{t("selectionLabel")}</label>
                  <div className="relative">
                    <div
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full bg-[#080808] border border-white/10 px-6 py-4 rounded-lg cursor-pointer flex justify-between items-center group hover:border-white/20 transition-all"
                    >
                      <span className={`text-sm ${formState.selectedProducts.length > 0 ? "text-white" : "text-zinc-700"}`}>
                        {formState.selectedProducts.length > 0
                          ? `${formState.selectedProducts.length} ${isIndo ? "Produk dipilih" : "Products selected"}`
                          : isIndo ? "Pilih produk..." : "Choose products..."}
                      </span>
                      <span className={`text-[10px] transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}>
                        ▼
                      </span>
                    </div>

                    {/* Dropdown Items */}
                    {isDropdownOpen && (
                      <div className="absolute z-50 mt-2 w-full bg-[#0d0d0d] border border-white/10 rounded-lg shadow-2xl max-h-[250px] overflow-y-auto divide-y divide-white/5 animate-fade-in shadow-red-900/10">
                        {ALL_PRODUCTS.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => toggleProduct(product.name)}
                            className="px-6 py-4 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors group"
                          >
                            <span className={`text-[13px] tracking-tight ${formState.selectedProducts.includes(product.name) ? "text-secondary font-bold" : "text-zinc-400"}`}>
                              {product.name}
                            </span>
                            {formState.selectedProducts.includes(product.name) && (
                              <span className="text-secondary text-sm">✓</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {formState.selectedProducts.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {formState.selectedProducts.map(p => (
                        <span key={p} className="px-2 py-0.5 bg-secondary/5 border border-secondary/20 text-secondary text-[9px] rounded-full uppercase font-bold tracking-tighter">
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-zinc-400 block uppercase tracking-[0.3em]">{isIndo ? "Jelaskan Kebutuhan Anda" : "Describe Your Needs"}</label>
                  <textarea
                    rows={4}
                    required
                    placeholder={isIndo ? "Ceritakan detail pesanan Anda..." : "Tell us your order details..."}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#080808] border border-white/10 rounded-xl p-6 focus:outline-none focus:border-secondary transition-colors font-light resize-none text-white placeholder:text-zinc-800 text-sm"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full py-5 bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-black font-bold text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 transition-all duration-500 shadow-xl rounded-full"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t("submit")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="w-full h-[400px] relative grayscale invert contrast-125 brightness-50 opacity-40 hover:opacity-100 hover:grayscale-0 hover:invert-0 transition-all duration-1000">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.275551322!2d106.8407421!3d-6.2273413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3fb71627e7d%3A0xf639a0397500057b!2sJl.%20Dukuh%20Patra%20II%20No.75%2C%20RT.1%2FRW.13%2C%20Menteng%20Dalam%2C%20Kec.%20Tebet%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012870!5e0!3m2!1sen!2sid!4v1711970256000!5m2!1sen!2sid"
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
