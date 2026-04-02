import Image from "next/image";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <>
      <footer className="py-24 bg-black border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-16">
          <div className="space-y-8 col-span-1 md:col-span-2">
            <div className="flex flex-col gap-4">
              <Image 
                src="/logo/kci-logo-png-300x175.png" 
                alt="Logo Kilau Cigar Indonesia - Pilihan Cerutu Premium" 
                width={120} 
                height={70} 
                className="brightness-125 object-contain" 
                sizes="120px"
              />
              <p className="text-zinc-500 font-light max-w-sm leading-relaxed text-sm">
                {t("description")}
              </p>
            </div>
            <div className="flex gap-6">
              {["IG", "FB", "YT", "WA"].map((social) => (
                <a key={social} href="#" className="w-10 h-10 border border-white/10 rounded-none flex items-center justify-center text-[10px] font-bold text-zinc-500 hover:border-secondary hover:text-white transition-all">{social}</a>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <h4 className="text-white uppercase tracking-widest text-xs font-bold">{t("contactInfo")}</h4>
            <ul className="space-y-4 text-sm text-zinc-500 font-light">
              <li className="flex items-center gap-3">
                <span className="text-secondary tracking-tight">WhatsApp:</span> 
                <a href="https://wa.me/6281120078910" className="hover:text-white transition-colors">+62 811-2007-8910</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-secondary tracking-tight">Email:</span> 
                <a href="mailto:info@kilaucigarindonesia.com" className="hover:text-white transition-colors">info@kilaucigarindonesia.com</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary tracking-tight">{t("office")}:</span> 
                <span className="leading-relaxed">{t("officeLocation")}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-white uppercase tracking-widest text-xs font-bold">{t("quickLinks")}</h4>
            <ul className="space-y-4 text-sm text-zinc-500 font-light flex flex-col uppercase tracking-widest text-[10px]">
              <Link href="/privacy" className="hover:text-secondary transition-colors">{t("privacy")}</Link>
              <Link href="/shipping" className="hover:text-secondary transition-colors">{t("shipping")}</Link>
              <Link href="/terms" className="hover:text-secondary transition-colors">{t("terms")}</Link>
              <Link href="/faq" className="hover:text-secondary transition-colors">{t("faq")}</Link>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-8 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-[10px] uppercase tracking-widest">
          <p>{t("copyright")}</p>
          <p>{t("madeBy")}</p>
        </div>
      </footer>

      {/* Floating WhatsApp Widget */}
      <a 
        href="https://wa.me/6281120078910" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-[100] group flex items-center gap-4"
      >
        <div className="bg-white/10 backdrop-blur-md px-6 py-3 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 invisible group-hover:visible shadow-2xl">
          <p className="text-[10px] text-white font-bold uppercase tracking-widest">{t("whatsappWidget")}</p>
        </div>
        <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-transform duration-300 group-hover:scale-110">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </div>
      </a>
    </>
  );
}
