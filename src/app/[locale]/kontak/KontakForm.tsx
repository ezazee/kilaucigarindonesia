"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { renderWaTemplate } from "@/lib/wa-template";

export default function KontakForm({
  products,
  whatsapp,
  preselected,
  operatingHours,
  waTemplate,
}: {
  products: string[];
  whatsapp: string;
  preselected?: string;
  operatingHours?: string;
  waTemplate: string;
}) {
  const t = useTranslations("Contact");
  const tNavbar = useTranslations("Navbar");
  const isIndo = tNavbar("home") === "Beranda";
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    selectedProducts: preselected ? [preselected] : ([] as string[]),
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

    const waText = renderWaTemplate(waTemplate, {
      name: formState.name,
      email: formState.email,
      products: productList,
      message: formState.message,
    });
    const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, "_blank");

    setFormState({
      name: "",
      email: "",
      selectedProducts: [],
      message: "",
    });
  };

  return (
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
                {products.map((productName) => (
                  <div
                    key={productName}
                    onClick={() => toggleProduct(productName)}
                    className="px-6 py-4 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors group"
                  >
                    <span className={`text-[13px] tracking-tight ${formState.selectedProducts.includes(productName) ? "text-secondary font-bold" : "text-zinc-400"}`}>
                      {productName}
                    </span>
                    {formState.selectedProducts.includes(productName) && (
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
          {operatingHours && (
            <p className="text-zinc-600 text-xs font-light text-center mt-4">{operatingHours}</p>
          )}
        </div>
      </form>
    </div>
  );
}
