"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { logActivity } from "@/lib/activity-log";

const ADMIN_PATH = process.env.ADMIN_PATH;

// Public product pages are ISR-cached (revalidate = 300s); bust them
// immediately on admin mutation so edits don't wait up to 5 minutes to show.
function revalidatePublicProductPaths(slug?: string) {
  for (const locale of ["id", "en"]) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/produk`);
    if (slug) revalidatePath(`/${locale}/produk/${slug}`);
  }
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const PACKAGING_TYPES = ["SATUAN", "CARD_BOX", "WOODEN_BOX"] as const;

function buildVariantsFromFormData(formData: FormData) {
  const variants: {
    packagingType: (typeof PACKAGING_TYPES)[number];
    price: number;
    qtyPerBox: number | null;
    stockStatus: "READY" | "SOLD_OUT" | "DISCONTINUED";
  }[] = [];

  for (const packagingType of PACKAGING_TYPES) {
    const priceRaw = formData.get(`price_${packagingType}`);
    const price = priceRaw ? Number(priceRaw) : 0;
    if (!price || price <= 0) continue;

    const qtyRaw = formData.get(`qty_${packagingType}`);
    const qtyPerBox = qtyRaw ? Number(qtyRaw) : null;
    const stockStatus = String(formData.get(`stock_${packagingType}`) ?? "READY") as
      | "READY"
      | "SOLD_OUT"
      | "DISCONTINUED";

    variants.push({ packagingType, price, qtyPerBox, stockStatus });
  }

  return variants;
}

function productDataFromFormData(formData: FormData) {
  return {
    nameId: String(formData.get("nameId") ?? "").trim(),
    nameEn: String(formData.get("nameEn") ?? "").trim(),
    shortDescId: String(formData.get("shortDescId") ?? "").trim(),
    shortDescEn: String(formData.get("shortDescEn") ?? "").trim(),
    descriptionId: String(formData.get("descriptionId") ?? "").trim(),
    descriptionEn: String(formData.get("descriptionEn") ?? "").trim(),
    length: String(formData.get("length") ?? "").trim() || null,
    ring: String(formData.get("ring") ?? "").trim() || null,
    shape: String(formData.get("shape") ?? "").trim() || null,
    strengthId: String(formData.get("strengthId") ?? "").trim() || null,
    strengthEn: String(formData.get("strengthEn") ?? "").trim() || null,
    wrapper: String(formData.get("wrapper") ?? "").trim() || null,
    binder: String(formData.get("binder") ?? "").trim() || null,
    filler: String(formData.get("filler") ?? "").trim() || null,
    categoryId: String(formData.get("categoryId") ?? ""),
    stockStatus: String(formData.get("stockStatus") ?? "READY") as "READY" | "SOLD_OUT" | "DISCONTINUED",
    published: formData.get("published") === "on",
  };
}

export async function createProduct(formData: FormData) {
  const session = await verifySession();

  const data = productDataFromFormData(formData);
  if (!data.nameId || !data.nameEn || !data.categoryId) {
    throw new Error("Nama (ID & EN) dan kategori wajib diisi.");
  }

  const variants = buildVariantsFromFormData(formData);
  const imageIds = formData.getAll("imageIds").map(String).filter(Boolean);

  const slug = slugify(data.nameEn || data.nameId);
  const order = await prisma.product.count();

  const product = await prisma.product.create({
    data: {
      ...data,
      slug,
      order,
      variants: { create: variants },
      images: { connect: imageIds.map((id) => ({ id })) },
    },
  });

  await logActivity(session.userId, "CREATE", "Product", product.id);

  revalidatePath(`/${ADMIN_PATH}/produk`);
  revalidatePublicProductPaths(product.slug);
  redirect(`/${ADMIN_PATH}/produk/${product.id}`);
}

export async function updateProduct(id: string, formData: FormData) {
  const session = await verifySession();

  const data = productDataFromFormData(formData);
  if (!data.nameId || !data.nameEn || !data.categoryId) {
    throw new Error("Nama (ID & EN) dan kategori wajib diisi.");
  }

  const variants = buildVariantsFromFormData(formData);
  const imageIds = formData.getAll("imageIds").map(String).filter(Boolean);

  const [, updated] = await prisma.$transaction([
    prisma.productVariant.deleteMany({ where: { productId: id } }),
    prisma.product.update({
      where: { id },
      data: {
        ...data,
        variants: { create: variants },
        images: { set: imageIds.map((imgId) => ({ id: imgId })) },
      },
    }),
  ]);

  await logActivity(session.userId, "UPDATE", "Product", id);

  revalidatePath(`/${ADMIN_PATH}/produk`);
  revalidatePath(`/${ADMIN_PATH}/produk/${id}`);
  revalidatePublicProductPaths(updated.slug);
}

export async function deleteProduct(formData: FormData) {
  const session = await verifySession();
  const id = String(formData.get("id"));
  const deleted = await prisma.product.delete({ where: { id } });
  await logActivity(session.userId, "DELETE", "Product", id);
  revalidatePath(`/${ADMIN_PATH}/produk`);
  revalidatePublicProductPaths(deleted.slug);
}

export async function moveProduct(formData: FormData) {
  const session = await verifySession();
  const id = String(formData.get("id"));
  const direction = String(formData.get("direction"));

  const products = await prisma.product.findMany({ orderBy: { order: "asc" }, select: { id: true, order: true } });
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= products.length) return;

  const current = products[index];
  const swapWith = products[swapIndex];

  await prisma.$transaction([
    prisma.product.update({ where: { id: current.id }, data: { order: swapWith.order } }),
    prisma.product.update({ where: { id: swapWith.id }, data: { order: current.order } }),
  ]);

  await logActivity(session.userId, "REORDER", "Product", id);
  revalidatePath(`/${ADMIN_PATH}/produk`);
  revalidatePublicProductPaths();
}
