import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { upsertPage } from "../actions";
import PageForm from "../PageForm";
import { PageHeader } from "../../_components/ui";
import { PAGE_SCHEMAS } from "../schema";

export default async function HalamanEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const schema = PAGE_SCHEMAS[slug];
  if (!schema) notFound();

  const [page, media] = await Promise.all([
    prisma.page.findUnique({ where: { slug } }),
    prisma.media.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const contentId = (page?.contentId as Record<string, unknown> | null) ?? {};
  const contentEn = (page?.contentEn as Record<string, unknown> | null) ?? {};
  const images = (contentId.images as Record<string, string> | undefined) ?? {};

  const action = async (formData: FormData) => {
    "use server";
    await upsertPage(slug, formData);
  };

  return (
    <div>
      <PageHeader title={`Halaman: ${schema.label}`} description="Konten ditampilkan bilingual (Indonesia/English) di situs publik." />
      <PageForm
        action={action}
        schema={schema}
        media={media}
        defaults={{
          titleId: page?.titleId,
          titleEn: page?.titleEn,
          status: page?.status,
          contentId,
          contentEn,
          images,
        }}
      />
    </div>
  );
}
