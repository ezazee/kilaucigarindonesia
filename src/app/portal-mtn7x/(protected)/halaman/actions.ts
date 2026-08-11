"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { logActivity } from "@/lib/activity-log";
import { PAGE_SCHEMAS } from "./schema";

const ADMIN_PATH = process.env.ADMIN_PATH;

// Page CMS slugs don't all map 1:1 onto their public route — "home" is the
// bare locale root and "montenegro-*" pages live under /montenegro/<slug>,
// not /<pageSlug>. Get this wrong and the revalidate below silently no-ops
// on a route that doesn't exist while the real page stays stale.
function publicRouteForPageSlug(slug: string): string {
  if (slug === "home") return "";
  if (slug.startsWith("montenegro-")) return `/montenegro/${slug.replace("montenegro-", "")}`;
  return `/${slug}`;
}

export async function upsertPage(slug: string, formData: FormData) {
  const session = await verifySession();

  const schema = PAGE_SCHEMAS[slug];
  if (!schema) throw new Error("Halaman tidak dikenal.");

  const titleId = String(formData.get("titleId") ?? "").trim();
  const titleEn = String(formData.get("titleEn") ?? "").trim();

  if (!titleId || !titleEn) {
    throw new Error("Judul (ID & EN) wajib diisi.");
  }

  const contentId: Record<string, unknown> = {};
  const contentEn: Record<string, unknown> = {};

  for (const field of schema.fields) {
    if (field.bilingual) {
      contentId[field.key] = String(formData.get(`${field.key}_id`) ?? "");
      contentEn[field.key] = String(formData.get(`${field.key}_en`) ?? "");
    } else {
      const value = String(formData.get(field.key) ?? "");
      contentId[field.key] = value;
      contentEn[field.key] = value;
    }
  }

  const images: Record<string, string> = {};
  for (const img of schema.images) {
    const value = String(formData.get(`img_${img.key}`) ?? "").trim();
    if (value) images[img.key] = value;
  }
  contentId.images = images;

  await prisma.page.upsert({
    where: { slug },
    update: {
      titleId,
      titleEn,
      contentId: contentId as Prisma.InputJsonValue,
      contentEn: contentEn as Prisma.InputJsonValue,
      status: "PUBLISHED",
    },
    create: {
      slug,
      titleId,
      titleEn,
      contentId: contentId as Prisma.InputJsonValue,
      contentEn: contentEn as Prisma.InputJsonValue,
      status: "PUBLISHED",
    },
  });

  await logActivity(session.userId, "UPDATE", "Page", slug);

  const publicRoute = publicRouteForPageSlug(slug);
  revalidatePath(`/${ADMIN_PATH}/halaman`);
  revalidatePath(`/${ADMIN_PATH}/halaman/${slug}`);
  revalidatePath(`/id${publicRoute}`);
  revalidatePath(`/en${publicRoute}`);
}
