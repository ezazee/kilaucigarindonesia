import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { getPageField, getPageImage } from "@/lib/page-content";
import AboutPageClient, { AboutContent, AboutImages } from "./AboutPageClient";

export const revalidate = 300;

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  const page = await prisma.page.findUnique({ where: { slug: "tentang-kami" } });

  const field = (key: string) => getPageField(page, key, locale, t(key));

  const content: AboutContent = {
    badge: field("badge"),
    tagline: field("tagline"),
    historyBadge: field("historyBadge"),
    historyTitle: field("historyTitle"),
    historySubtitle: field("historySubtitle"),
    historyDesc1: field("historyDesc1"),
    historyDesc2: field("historyDesc2"),
    experienceTitle: field("experienceTitle"),
    experienceDesc: field("experienceDesc"),
    nicaraguaTitle: field("nicaraguaTitle"),
    nicaraguaDesc: field("nicaraguaDesc"),
    innovationTitle: field("innovationTitle"),
    innovationSubtitle: field("innovationSubtitle"),
    innovationDesc: field("innovationDesc"),
    quote: field("quote"),
    heritage: field("heritage"),
    qualityTitle: field("qualityTitle"),
    qualitySubtitle: field("qualitySubtitle"),
    qualityDesc: field("qualityDesc"),
  };

  const images: AboutImages = {
    heroImage: getPageImage(page, "heroImage", "/images/about/lifestyle.webp"),
    portraitImage: getPageImage(page, "portraitImage", "/images/about/portrait.webp"),
    innovationImage: getPageImage(page, "innovationImage", "/images/about/montenegro_box.png"),
  };

  return <AboutPageClient content={content} images={images} />;
}
