import Link from "next/link";
import { headers } from "next/headers";
import "./globals.css";

/**
 * Root-level 404 for URLs that match no route (e.g. /id/privacy, stray paths,
 * and the `/__not_found__` rewrite used to hide the admin portal from
 * unauthenticated visitors). This app has no root `app/layout.tsx` — the
 * `[locale]` and `portal-mtn7x` segments each define their own layout — so a
 * standalone `<html>` wrapper is required here; otherwise Next renders its
 * bare, unstyled default error page.
 */
export default async function RootNotFound() {
  const acceptLanguage = (await headers()).get("accept-language") ?? "";
  const isEnglish = acceptLanguage.toLowerCase().startsWith("en");
  const locale = isEnglish ? "en" : "id";

  return (
    <html lang={locale}>
      <body className="bg-[#050505] text-white antialiased">
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center space-y-8 px-6">
            <p className="text-[#C8102E] font-bold uppercase tracking-[0.5em] text-xs">404</p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold">
              {isEnglish ? "Page Not Found" : "Halaman Tidak Ditemukan"}
            </h1>
            <p className="text-zinc-600 font-light text-sm tracking-[0.3em] uppercase">
              {isEnglish ? "Halaman Tidak Ditemukan" : "Page Not Found"}
            </p>
            <div className="w-16 h-px bg-[#C8102E]/40 mx-auto"></div>
            <p className="text-zinc-500 font-light max-w-md mx-auto leading-relaxed">
              {isEnglish
                ? "The page you're looking for doesn't exist or has been moved."
                : "Halaman yang Anda cari tidak ada atau telah dipindahkan."}
            </p>
            <Link
              href={`/${locale}`}
              className="inline-block px-10 py-4 border border-[#C8102E] text-[#C8102E] font-bold uppercase tracking-widest text-[10px] hover:bg-[#C8102E] hover:text-white transition-all duration-500"
            >
              {isEnglish ? "Back to Home" : "Kembali ke Beranda"}
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
