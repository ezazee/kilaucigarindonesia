"use server";

import { revalidatePath } from "next/cache";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { logActivity } from "@/lib/activity-log";

const ADMIN_PATH = process.env.ADMIN_PATH;
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Raster formats only. SVG is excluded because it can embed scripts and would
// be served from /uploads with a content type browsers execute on direct visit.
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function uploadMedia(formData: FormData) {
  const session = await verifySession();

  const file = formData.get("file") as File | null;
  const alt = String(formData.get("alt") ?? "");

  if (!file || file.size === 0) {
    throw new Error("Pilih file gambar terlebih dahulu.");
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error("File harus berupa gambar (JPG, PNG, WebP, GIF, atau AVIF).");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Ukuran file maksimal 10 MB.");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const ext = path.extname(file.name).toLowerCase() || ".png";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const filePath = path.join(UPLOAD_DIR, safeName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  const media = await prisma.media.create({
    data: { url: `/uploads/${safeName}`, alt: alt || null },
  });

  await logActivity(session.userId, "CREATE", "Media", media.id);
  revalidatePath(`/${ADMIN_PATH}/media`);
}

export async function updateMediaAlt(formData: FormData) {
  const session = await verifySession();
  const id = String(formData.get("id"));
  const alt = String(formData.get("alt") ?? "").trim();

  await prisma.media.update({ where: { id }, data: { alt: alt || null } });

  await logActivity(session.userId, "UPDATE", "Media", id);
  revalidatePath(`/${ADMIN_PATH}/media`);
}

export async function deleteMedia(formData: FormData) {
  const session = await verifySession();
  const id = String(formData.get("id"));

  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return;

  await prisma.media.delete({ where: { id } });
  await logActivity(session.userId, "DELETE", "Media", id);

  // Remove the physical file so deleted media doesn't leak on disk.
  // Only touch files under /uploads, and swallow missing-file errors.
  if (media.url.startsWith("/uploads/")) {
    const filePath = path.join(UPLOAD_DIR, path.basename(media.url));
    try {
      await unlink(filePath);
    } catch {
      // File already gone (e.g. redeployed without /public/uploads) — ignore.
    }
  }

  revalidatePath(`/${ADMIN_PATH}/media`);
}

// A media item not linked to a Product can still be referenced by the Page
// CMS (home/kontak/tentang-kami/montenegro hero images etc), which store raw
// URLs rather than a relation. "Unused" must check both before bulk-deleting.
export async function deleteUnusedMedia() {
  const session = await verifySession();

  const [candidates, pages] = await Promise.all([
    prisma.media.findMany({ where: { productId: null } }),
    prisma.page.findMany({ select: { contentId: true } }),
  ]);

  const usedUrls = new Set<string>();
  for (const page of pages) {
    const images = (page.contentId as { images?: Record<string, string> } | null)?.images ?? {};
    for (const url of Object.values(images)) usedUrls.add(url);
  }

  const toDelete = candidates.filter((m) => !usedUrls.has(m.url));

  for (const media of toDelete) {
    await prisma.media.delete({ where: { id: media.id } });
    if (media.url.startsWith("/uploads/")) {
      try {
        await unlink(path.join(UPLOAD_DIR, path.basename(media.url)));
      } catch {
        // ignore
      }
    }
  }

  await logActivity(session.userId, "BULK_DELETE", "Media", `${toDelete.length} item`);
  revalidatePath(`/${ADMIN_PATH}/media`);
}
