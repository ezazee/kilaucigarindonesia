import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteProduct, moveProduct } from "./actions";
import { PageHeader, StockBadge, EmptyState, PrimaryButton, Pagination } from "../_components/ui";
import { SubmitButton } from "../_components/SubmitButton";
import { PACKAGING_LABEL } from "../_lib/theme";
import { IconPlus, IconTrash, IconEdit, IconChevronUp, IconChevronDown } from "../_components/icons";
import { orderProductGallery, categoryFallbackIcon, formatRupiah } from "@/lib/product-helpers";

const ADMIN_PATH = process.env.ADMIN_PATH;
const PAGE_SIZE = 10;

const PACKAGING_FILTERS = [
  { key: "ALL", label: "Semua" },
  { key: "SATUAN", label: PACKAGING_LABEL.SATUAN },
  { key: "CARD_BOX", label: PACKAGING_LABEL.CARD_BOX },
  { key: "WOODEN_BOX", label: PACKAGING_LABEL.WOODEN_BOX },
] as const;

type PackagingFilterKey = (typeof PACKAGING_FILTERS)[number]["key"];

export default async function ProdukListPage({
  searchParams,
}: {
  searchParams: Promise<{ pkg?: string; page?: string }>;
}) {
  const { pkg, page: pageParam } = await searchParams;
  const activeFilter: PackagingFilterKey = PACKAGING_FILTERS.some((f) => f.key === pkg) ? (pkg as PackagingFilterKey) : "ALL";
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const where =
    activeFilter === "ALL" ? {} : { variants: { some: { packagingType: activeFilter } } };

  const [totalCount, allCounts, products, firstProduct, lastProduct] = await Promise.all([
    prisma.product.count({ where }),
    Promise.all(
      PACKAGING_FILTERS.map((f) =>
        prisma.product.count({ where: f.key === "ALL" ? {} : { variants: { some: { packagingType: f.key } } } })
      )
    ),
    prisma.product.findMany({
      where,
      orderBy: { order: "asc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        nameId: true,
        published: true,
        stockStatus: true,
        category: { select: { name: true, slug: true } },
        variants: { select: { packagingType: true, price: true } },
        images: { select: { url: true, alt: true } },
      },
    }),
    activeFilter === "ALL" ? prisma.product.findFirst({ orderBy: { order: "asc" }, select: { id: true } }) : null,
    activeFilter === "ALL" ? prisma.product.findFirst({ orderBy: { order: "desc" }, select: { id: true } }) : null,
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div>
      <PageHeader
        title="Produk"
        description={`${totalCount} produk terdaftar di katalog`}
        action={
          <Link href={`/${ADMIN_PATH}/produk/baru`}>
            <PrimaryButton>
              <IconPlus className="w-4 h-4" />
              Tambah Produk
            </PrimaryButton>
          </Link>
        }
      />

      <div className="flex items-center gap-2 mb-5">
        {PACKAGING_FILTERS.map((f, i) => {
          const active = activeFilter === f.key;
          return (
            <Link
              key={f.key}
              href={f.key === "ALL" ? `/${ADMIN_PATH}/produk` : `/${ADMIN_PATH}/produk?pkg=${f.key}`}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? "border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059]"
                  : "border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
              }`}
            >
              {f.label}
              <span className={active ? "text-[#C5A059]/70" : "text-zinc-600"}>{allCounts[i]}</span>
            </Link>
          );
        })}
      </div>

      {products.length === 0 ? (
        <EmptyState title="Belum ada produk" description="Tambahkan produk pertama untuk mulai mengisi katalog." />
      ) : (
        <div className="rounded-lg border border-white/[0.06] bg-[#111113] overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="border-b border-white/[0.06] text-left text-[11px] uppercase tracking-wider text-zinc-500">
                {activeFilter === "ALL" && <th className="px-5 py-3 font-medium w-10"></th>}
                <th className="px-5 py-3 font-medium">Produk</th>
                <th className="px-5 py-3 font-medium">Kategori</th>
                <th className="px-5 py-3 font-medium">Varian & Harga</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {products.map((p) => {
                const thumb = orderProductGallery(p.images)[0]?.url ?? categoryFallbackIcon(p.category.slug);
                const minPrice = p.variants.length > 0 ? Math.min(...p.variants.map((v) => v.price)) : null;
                const isFirst = firstProduct?.id === p.id;
                const isLast = lastProduct?.id === p.id;
                return (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    {activeFilter === "ALL" && (
                      <td className="px-5 py-3">
                        <div className="flex flex-col gap-0.5">
                          <form action={moveProduct}>
                            <input type="hidden" name="id" value={p.id} />
                            <input type="hidden" name="direction" value="up" />
                            <button
                              type="submit"
                              disabled={isFirst}
                              className="text-zinc-500 hover:text-[#C5A059] disabled:opacity-20 disabled:hover:text-zinc-500 transition-colors"
                            >
                              <IconChevronUp className="w-3.5 h-3.5" />
                            </button>
                          </form>
                          <form action={moveProduct}>
                            <input type="hidden" name="id" value={p.id} />
                            <input type="hidden" name="direction" value="down" />
                            <button
                              type="submit"
                              disabled={isLast}
                              className="text-zinc-500 hover:text-[#C5A059] disabled:opacity-20 disabled:hover:text-zinc-500 transition-colors"
                            >
                              <IconChevronDown className="w-3.5 h-3.5" />
                            </button>
                          </form>
                        </div>
                      </td>
                    )}
                    <td className="px-5 py-3">
                      <Link href={`/${ADMIN_PATH}/produk/${p.id}`} className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 rounded-md overflow-hidden bg-[#0c0c0e] border border-white/5 shrink-0">
                          <Image src={thumb} alt={p.nameId} fill className="object-cover" sizes="40px" />
                        </div>
                        <span className="text-white group-hover:text-[#C5A059] transition-colors font-medium">{p.nameId}</span>
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-zinc-400">{p.category.name}</td>
                    <td className="px-5 py-3">
                      {p.variants.length > 0 ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-zinc-300 text-xs">
                            {p.variants.map((v) => PACKAGING_LABEL[v.packagingType]).join(" · ")}
                          </span>
                          <span className="text-zinc-500 text-xs">mulai {formatRupiah(minPrice!)}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-[#fab219]">Belum ada harga</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <StockBadge status={p.stockStatus} />
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium ${p.published ? "text-zinc-300" : "text-zinc-600"}`}>
                        {p.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/${ADMIN_PATH}/produk/${p.id}`}
                          className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:text-[#C5A059] hover:border-[#C5A059]/40"
                        >
                          <IconEdit className="w-3.5 h-3.5" />
                          Edit
                        </Link>
                        <form action={deleteProduct} className="inline">
                          <input type="hidden" name="id" value={p.id} />
                          <SubmitButton variant="danger" pendingText="Menghapus..." successMessage="Produk berhasil dihapus">
                            <IconTrash />
                            Hapus
                          </SubmitButton>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      )}

      <Pagination
        basePath={`/${ADMIN_PATH}/produk`}
        currentPage={currentPage}
        totalPages={totalPages}
        query={{ pkg: activeFilter === "ALL" ? undefined : activeFilter }}
      />
    </div>
  );
}
