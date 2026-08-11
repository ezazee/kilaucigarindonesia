import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { uploadMedia, deleteMedia, updateMediaAlt, deleteUnusedMedia } from "./actions";
import { PageHeader, EmptyState, inputClass, labelClass, Pagination } from "../_components/ui";
import { SubmitButton } from "../_components/SubmitButton";
import { IconUpload, IconTrash } from "../_components/icons";

const ADMIN_PATH = process.env.ADMIN_PATH;
const PAGE_SIZE = 24;

export default async function MediaPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const [totalCount, media, allProductless, pages] = await Promise.all([
    prisma.media.count(),
    prisma.media.findMany({
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { product: { select: { id: true, nameId: true } } },
    }),
    prisma.media.findMany({ where: { productId: null }, select: { id: true, url: true } }),
    prisma.page.findMany({ select: { slug: true, contentId: true } }),
  ]);

  // A media item can be "used" either via the Product relation, or referenced
  // by raw URL inside a Page's stored image fields (Home hero, Kontak, etc).
  const pageUsage = new Map<string, string>();
  for (const page of pages) {
    const images = (page.contentId as { images?: Record<string, string> } | null)?.images ?? {};
    for (const url of Object.values(images)) pageUsage.set(url, page.slug);
  }

  const trulyUnusedCount = allProductless.filter((m) => !pageUsage.has(m.url)).length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div>
      <PageHeader
        title="Media Library"
        description={`${totalCount} file${trulyUnusedCount > 0 ? ` — ${trulyUnusedCount} tidak terpakai sama sekali` : ""}`}
        action={
          trulyUnusedCount > 0 ? (
            <form action={deleteUnusedMedia}>
              <SubmitButton variant="danger" pendingText="Menghapus..." successMessage="Media tidak terpakai berhasil dihapus">
                <IconTrash />
                Hapus {trulyUnusedCount} yang Tidak Terpakai
              </SubmitButton>
            </form>
          ) : undefined
        }
      />

      <div className="rounded-lg border border-white/[0.06] bg-[#111113] p-5 mb-6">
        <form action={uploadMedia} className="flex flex-col sm:flex-row gap-3 sm:items-end">
          <div className="flex-1">
            <label className={labelClass}>File Gambar</label>
            <input
              type="file"
              name="file"
              accept="image/*"
              required
              className="w-full text-sm text-zinc-400 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-white/5 file:text-zinc-300 file:text-xs hover:file:bg-white/10 file:cursor-pointer"
            />
          </div>
          <div className="flex-1">
            <label className={labelClass}>Alt Text (opsional)</label>
            <input name="alt" placeholder="Deskripsi gambar" className={inputClass} />
          </div>
          <SubmitButton className="shrink-0" pendingText="Mengunggah..." successMessage="Gambar berhasil diupload">
            <IconUpload className="w-4 h-4" />
            Upload
          </SubmitButton>
        </form>
      </div>

      {media.length === 0 ? (
        <EmptyState title="Belum ada media" description="Upload gambar produk pertama di atas." />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((m) => {
            const usedByPageSlug = pageUsage.get(m.url);
            return (
              <div key={m.id} className="rounded-lg border border-white/[0.06] bg-[#111113] p-2.5">
                <div className="relative w-full aspect-square rounded-md overflow-hidden bg-[#0c0c0e]">
                  <Image src={m.url} alt={m.alt ?? ""} fill className="object-contain p-1" sizes="200px" />
                </div>
                <div className="mt-2 min-h-[32px]">
                  {m.product ? (
                    <Link
                      href={`/${ADMIN_PATH}/produk/${m.product.id}`}
                      className="text-[11px] text-[#C5A059] hover:underline line-clamp-2"
                    >
                      {m.product.nameId}
                    </Link>
                  ) : usedByPageSlug ? (
                    <Link
                      href={`/${ADMIN_PATH}/halaman/${usedByPageSlug}`}
                      className="text-[11px] text-[#C5A059] hover:underline line-clamp-2"
                    >
                      Halaman: {usedByPageSlug}
                    </Link>
                  ) : (
                    <span className="text-[11px] text-zinc-600">Tidak terpakai</span>
                  )}
                </div>
                <form action={updateMediaAlt} className="mt-2 flex gap-1">
                  <input type="hidden" name="id" value={m.id} />
                  <input
                    name="alt"
                    defaultValue={m.alt ?? ""}
                    placeholder="Alt text..."
                    className="w-full rounded-md border border-white/10 bg-[#0c0c0e] px-2 py-1 text-[11px] text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#C5A059]/60"
                  />
                  <SubmitButton variant="ghost" className="shrink-0 text-[10px] px-1" pendingText="..." successMessage="Alt text disimpan">
                    Simpan
                  </SubmitButton>
                </form>
                <form action={deleteMedia} className="mt-2">
                  <input type="hidden" name="id" value={m.id} />
                  <SubmitButton variant="danger" className="w-full justify-center" pendingText="Menghapus..." successMessage="Media berhasil dihapus">
                    <IconTrash />
                    Hapus
                  </SubmitButton>
                </form>
              </div>
            );
          })}
        </div>
      )}

      <Pagination basePath={`/${ADMIN_PATH}/media`} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
