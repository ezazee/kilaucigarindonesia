import { prisma } from "@/lib/prisma";
import { createProduct } from "../actions";
import ProductForm from "../ProductForm";
import { PageHeader } from "../../_components/ui";

export default async function ProdukBaruPage() {
  const [categories, media] = await Promise.all([
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    prisma.media.findMany({ orderBy: { createdAt: "desc" }, include: { product: { select: { nameId: true } } } }),
  ]);

  return (
    <div>
      <PageHeader title="Tambah Produk" description="Isi detail produk baru untuk katalog" />
      <ProductForm action={createProduct} categories={categories} media={media} />
    </div>
  );
}
