import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIndo = locale !== "en";
  const title = isIndo ? "Kebijakan Privasi" : "Privacy Policy";
  const description = isIndo
    ? "Kebijakan privasi Kilau Cigar Indonesia — penjelasan lengkap tentang bagaimana kami mengumpulkan, menggunakan, membagikan, dan melindungi data pribadi Anda saat berbelanja di situs kami."
    : "Kilau Cigar Indonesia's privacy policy — a complete explanation of how we collect, use, share, and protect your personal data when you shop on our website.";

  return {
    title,
    description,
    alternates: buildAlternates("/privacy", locale),
    openGraph: { title, description },
  };
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
