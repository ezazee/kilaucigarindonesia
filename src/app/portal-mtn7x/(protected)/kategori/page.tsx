import { prisma } from "@/lib/prisma";
import { createCategory, deleteCategory, moveCategory } from "./actions";
import { PageHeader, EmptyState, inputClass } from "../_components/ui";
import { SubmitButton } from "../_components/SubmitButton";
import { IconTrash, IconChevronUp, IconChevronDown } from "../_components/icons";
import { CATEGORY_COLORS } from "../_lib/theme";
import CategoryNameEditor from "./CategoryNameEditor";

export default async function KategoriPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { products: true } } },
  });

  const maxCount = Math.max(1, ...categories.map((c) => c._count.products));

  return (
    <div>
      <PageHeader title="Kategori" description={`${categories.length} koleksi produk`} />

      <div className="rounded-lg border border-white/[0.06] bg-[#111113] p-5 mb-6">
        <form action={createCategory} className="flex gap-3">
          <input
            name="name"
            placeholder="Nama kategori baru (mis. Green Gold)"
            required
            className={`${inputClass} max-w-sm`}
          />
          <SubmitButton className="shrink-0" pendingText="Menambah..." successMessage="Kategori berhasil ditambahkan">Tambah</SubmitButton>
        </form>
      </div>

      {categories.length === 0 ? (
        <EmptyState title="Belum ada kategori" />
      ) : (
        <div className="rounded-lg border border-white/[0.06] bg-[#111113] overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="border-b border-white/[0.06] text-left text-[11px] uppercase tracking-wider text-zinc-500">
                <th className="px-5 py-3 font-medium w-10"></th>
                <th className="px-5 py-3 font-medium">Nama</th>
                <th className="px-5 py-3 font-medium">Slug</th>
                <th className="px-5 py-3 font-medium w-64">Jumlah Produk</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {categories.map((c, i) => {
                const color = CATEGORY_COLORS[c.slug] ?? "#71717a";
                const pct = Math.round((c._count.products / maxCount) * 100);
                return (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex flex-col gap-0.5">
                        <form action={moveCategory}>
                          <input type="hidden" name="id" value={c.id} />
                          <input type="hidden" name="direction" value="up" />
                          <button
                            type="submit"
                            disabled={i === 0}
                            className="text-zinc-500 hover:text-[#C5A059] disabled:opacity-20 disabled:hover:text-zinc-500 transition-colors"
                          >
                            <IconChevronUp className="w-3.5 h-3.5" />
                          </button>
                        </form>
                        <form action={moveCategory}>
                          <input type="hidden" name="id" value={c.id} />
                          <input type="hidden" name="direction" value="down" />
                          <button
                            type="submit"
                            disabled={i === categories.length - 1}
                            className="text-zinc-500 hover:text-[#C5A059] disabled:opacity-20 disabled:hover:text-zinc-500 transition-colors"
                          >
                            <IconChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <CategoryNameEditor id={c.id} name={c.name} color={color} />
                    </td>
                    <td className="px-5 py-3 text-zinc-500 font-mono text-xs">{c.slug}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden max-w-[140px]">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                        </div>
                        <span className="text-zinc-300 text-xs w-6 text-right">{c._count.products}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <form action={deleteCategory}>
                        <input type="hidden" name="id" value={c.id} />
                        <SubmitButton variant="danger" pendingText="Menghapus..." successMessage="Kategori berhasil dihapus">
                          <IconTrash />
                          Hapus
                        </SubmitButton>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
}
