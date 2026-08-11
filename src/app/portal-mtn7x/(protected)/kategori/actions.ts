"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { logActivity } from "@/lib/activity-log";

const ADMIN_PATH = process.env.ADMIN_PATH;

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Public homepage/produk/montenegro pages are ISR-cached (revalidate = 300s);
// bust them immediately on admin mutation so edits don't wait 5 minutes.
function revalidatePublicCategoryPaths(slug?: string) {
  for (const locale of ["id", "en"]) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/produk`);
    if (slug) revalidatePath(`/${locale}/montenegro/${slug}`);
  }
}

export async function createCategory(formData: FormData) {
  const session = await verifySession();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Nama kategori wajib diisi.");

  const count = await prisma.category.count();

  const category = await prisma.category.create({
    data: { name, slug: slugify(name), order: count },
  });

  await logActivity(session.userId, "CREATE", "Category", category.id);
  revalidatePath(`/${ADMIN_PATH}/kategori`);
  revalidatePublicCategoryPaths(category.slug);
}

export async function updateCategory(formData: FormData) {
  const session = await verifySession();
  const id = String(formData.get("id"));
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Nama kategori wajib diisi.");

  const updated = await prisma.category.update({ where: { id }, data: { name } });

  await logActivity(session.userId, "UPDATE", "Category", id);
  revalidatePath(`/${ADMIN_PATH}/kategori`);
  revalidatePublicCategoryPaths(updated.slug);
}

export async function deleteCategory(formData: FormData) {
  const session = await verifySession();
  const id = String(formData.get("id"));
  const productCount = await prisma.product.count({ where: { categoryId: id } });
  if (productCount > 0) {
    throw new Error(`Kategori masih dipakai ${productCount} produk, tidak bisa dihapus.`);
  }
  const deleted = await prisma.category.delete({ where: { id } });
  await logActivity(session.userId, "DELETE", "Category", id);
  revalidatePath(`/${ADMIN_PATH}/kategori`);
  revalidatePublicCategoryPaths(deleted.slug);
}

export async function moveCategory(formData: FormData) {
  const session = await verifySession();
  const id = String(formData.get("id"));
  const direction = String(formData.get("direction"));

  const categories = await prisma.category.findMany({ orderBy: { order: "asc" }, select: { id: true, order: true } });
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= categories.length) return;

  const current = categories[index];
  const swapWith = categories[swapIndex];

  await prisma.$transaction([
    prisma.category.update({ where: { id: current.id }, data: { order: swapWith.order } }),
    prisma.category.update({ where: { id: swapWith.id }, data: { order: current.order } }),
  ]);

  await logActivity(session.userId, "REORDER", "Category", id);
  revalidatePath(`/${ADMIN_PATH}/kategori`);
  revalidatePublicCategoryPaths();
}
