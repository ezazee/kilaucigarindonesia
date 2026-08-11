import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProduct } from "../actions";
import ProductForm from "../ProductForm";
import { PageHeader } from "../../_components/ui";

export default async function ProdukEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [product, categories, media] = await Promise.all([
    prisma.product.findUnique({ where: { id }, include: { variants: true, images: true } }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    prisma.media.findMany({ orderBy: { createdAt: "desc" }, include: { product: { select: { nameId: true } } } }),
  ]);

  if (!product) notFound();

  const updateWithId = async (formData: FormData) => {
    "use server";
    await updateProduct(id, formData);
  };

  return (
    <div>
      <PageHeader title={`Edit Produk: ${product.nameId}`} />
      <ProductForm
        action={updateWithId}
        categories={categories}
        media={media}
        defaults={{
          ...product,
          variants: product.variants,
          imageIds: product.images.map((i) => i.id),
        }}
      />
    </div>
  );
}
