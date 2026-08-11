import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export interface GeneralSettings {
  siteTitle?: string;
  siteDescription?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  whatsappNumber?: string;
  contactEmail?: string;
  officeLocation?: string;
  footerDescriptionId?: string;
  footerDescriptionEn?: string;
  operatingHoursId?: string;
  operatingHoursEn?: string;
  waProductTemplateId?: string;
  waProductTemplateEn?: string;
  waContactTemplateId?: string;
  waContactTemplateEn?: string;
}

// Wrapped in unstable_cache (tagged "settings") so the many pages that read
// site-wide settings don't each force a fresh DB round trip / force the
// whole route dynamic — admin saves call revalidateTag("settings") to bust it.
export const getGeneralSettings = unstable_cache(
  async (): Promise<GeneralSettings> => {
    const setting = await prisma.setting.findUnique({ where: { key: "general" } });
    return (setting?.value as GeneralSettings) ?? {};
  },
  ["general-settings"],
  { tags: ["settings"] }
);
