import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader, StatCard, Panel, StockBadge } from "./_components/ui";
import { CategoryBarChart, StockDonutChart } from "./_components/OverviewCharts";
import { CATEGORY_COLORS } from "./_lib/theme";
import { PAGE_SCHEMAS } from "./halaman/schema";
import { formatRupiah } from "@/lib/product-helpers";
import { IconAlert, IconProduct, IconCategory, IconMedia, IconActivity, IconPage, IconTag } from "./_components/icons";

const ADMIN_PATH = process.env.ADMIN_PATH;

const ACTION_LABEL: Record<string, { label: string; color: string }> = {
  CREATE: { label: "Tambah", color: "#0ca30c" },
  UPDATE: { label: "Ubah", color: "#3987e5" },
  DELETE: { label: "Hapus", color: "#d03b3b" },
  REORDER: { label: "Urutkan", color: "#fab219" },
  BULK_DELETE: { label: "Hapus Massal", color: "#d03b3b" },
};

const ENTITY_LABEL: Record<string, string> = {
  Product: "Produk",
  Category: "Kategori",
  Media: "Media",
  Page: "Halaman",
  Setting: "Pengaturan",
  User: "Akun",
};

function timeAgo(d: Date) {
  const diffMs = Date.now() - d.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} hari lalu`;
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(d);
}

export default async function AdminOverviewPage() {
  const [products, categories, pageCount, mediaCount, cmsPages, recentLogs, priceAgg] = await Promise.all([
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        nameId: true,
        published: true,
        stockStatus: true,
        categoryId: true,
        category: { select: { name: true } },
        variants: { select: { id: true } },
      },
    }),
    prisma.category.findMany({ orderBy: { order: "asc" }, select: { id: true, name: true, slug: true } }),
    prisma.page.count(),
    prisma.media.count(),
    prisma.page.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.activityLog.findMany({ orderBy: { createdAt: "desc" }, take: 6, include: { user: { select: { name: true } } } }),
    prisma.productVariant.aggregate({ _min: { price: true }, _max: { price: true } }),
  ]);

  const readyCount = products.filter((p) => p.stockStatus === "READY").length;
  const soldOutCount = products.filter((p) => p.stockStatus === "SOLD_OUT").length;
  const discontinuedCount = products.filter((p) => p.stockStatus === "DISCONTINUED").length;
  const noVariantCount = products.filter((p) => p.variants.length === 0).length;
  const unpublishedCount = products.filter((p) => !p.published).length;

  const categoryData = categories.map((c) => ({
    name: c.name,
    count: products.filter((p) => p.categoryId === c.id).length,
    color: CATEGORY_COLORS[c.slug] ?? "#71717a",
  }));

  const statusData = [
    { status: "READY", count: readyCount },
    { status: "SOLD_OUT", count: soldOutCount },
    { status: "DISCONTINUED", count: discontinuedCount },
  ].filter((d) => d.count > 0);

  const recentProducts = products.slice(0, 5);

  // Union of both attention reasons, so the stat card total always matches this list.
  const attentionProducts = products
    .filter((p) => p.stockStatus === "SOLD_OUT" || p.variants.length === 0)
    .map((p) => ({
      ...p,
      reasons: [
        p.stockStatus === "SOLD_OUT" ? "Sold out" : null,
        p.variants.length === 0 ? "Belum ada harga" : null,
      ].filter(Boolean) as string[],
    }))
    .slice(0, 6);

  const cmsPageBySlug = new Map(cmsPages.map((p) => [p.slug, p.updatedAt]));
  const cmsPageList = Object.entries(PAGE_SCHEMAS).map(([slug, schema]) => ({
    slug,
    label: schema.label,
    updatedAt: cmsPageBySlug.get(slug) ?? null,
  }));
  const filledPageCount = cmsPageList.filter((p) => p.updatedAt).length;

  const minPrice = priceAgg._min.price;
  const maxPrice = priceAgg._max.price;

  return (
    <div>
      <PageHeader title="Overview" description="Ringkasan katalog Kilau Cigar Indonesia — data langsung dari database." />

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <StatCard label="Total Produk" value={products.length} sublabel={`${unpublishedCount} draft`} icon={<IconProduct />} />
        <StatCard label="Kategori" value={categories.length} icon={<IconCategory />} />
        <StatCard label="Media" value={mediaCount} sublabel={`${pageCount} halaman konten`} icon={<IconMedia />} />
        <StatCard
          label="Rentang Harga"
          value={minPrice != null ? formatRupiah(minPrice) : "—"}
          sublabel={maxPrice != null ? `s/d ${formatRupiah(maxPrice)}` : "Belum ada harga"}
          icon={<IconTag />}
        />
        <StatCard
          label="Perlu Perhatian"
          value={soldOutCount + noVariantCount}
          sublabel={`${soldOutCount} sold out, ${noVariantCount} tanpa harga`}
          tone={soldOutCount + noVariantCount > 0 ? "warning" : "good"}
          icon={<IconAlert />}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-8">
        <Panel title="Produk per Kategori">
          <CategoryBarChart data={categoryData} />
        </Panel>
        <Panel title="Status Stock">
          <StockDonutChart data={statusData} />
        </Panel>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-8">
        <Panel title="Produk Terbaru">
          {recentProducts.length === 0 ? (
            <p className="text-sm text-zinc-500 py-4">Belum ada produk.</p>
          ) : (
            <ul className="divide-y divide-white/[0.06] -mx-5">
              {recentProducts.map((p) => (
                <li key={p.id} className="flex items-center justify-between px-5 py-3">
                  <div className="min-w-0">
                    <Link href={`/${ADMIN_PATH}/produk/${p.id}`} className="text-sm text-white hover:text-[#C5A059] transition-colors truncate block">
                      {p.nameId}
                    </Link>
                    <p className="text-xs text-zinc-500">{p.category.name}</p>
                  </div>
                  <StockBadge status={p.stockStatus} />
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Produk Perlu Perhatian" action={<span className="text-xs text-zinc-500">{soldOutCount + noVariantCount} item</span>}>
          {attentionProducts.length === 0 ? (
            <p className="text-sm text-zinc-500 py-4">Semua produk aktif sudah lengkap.</p>
          ) : (
            <ul className="divide-y divide-white/[0.06] -mx-5">
              {attentionProducts.map((p) => (
                <li key={p.id} className="flex items-center justify-between px-5 py-3 gap-3">
                  <div className="min-w-0">
                    <Link href={`/${ADMIN_PATH}/produk/${p.id}`} className="text-sm text-white hover:text-[#C5A059] transition-colors truncate block">
                      {p.nameId}
                    </Link>
                    <p className="text-xs text-[#fab219]">{p.reasons.join(" · ")}</p>
                  </div>
                  <Link
                    href={`/${ADMIN_PATH}/produk/${p.id}`}
                    className="text-xs font-medium text-[#C5A059] hover:underline shrink-0"
                  >
                    Lengkapi →
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Panel
          title="Aktivitas Terbaru"
          action={
            <Link href={`/${ADMIN_PATH}/aktivitas`} className="text-xs font-medium text-[#C5A059] hover:underline">
              Lihat semua →
            </Link>
          }
        >
          {recentLogs.length === 0 ? (
            <p className="text-sm text-zinc-500 py-4">Belum ada aktivitas tercatat.</p>
          ) : (
            <ul className="divide-y divide-white/[0.06] -mx-5">
              {recentLogs.map((log) => {
                const action = ACTION_LABEL[log.action] ?? { label: log.action, color: "#71717a" };
                return (
                  <li key={log.id} className="flex items-center justify-between gap-3 px-5 py-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <IconActivity className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                      <span className="text-sm text-white truncate">
                        <span style={{ color: action.color }}>{action.label}</span> {ENTITY_LABEL[log.entity] ?? log.entity}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500 shrink-0">{timeAgo(log.createdAt)}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>

        <Panel title="Halaman CMS" action={<span className="text-xs text-zinc-500">{filledPageCount} dari {cmsPageList.length} diisi</span>}>
          <ul className="divide-y divide-white/[0.06] -mx-5">
            {cmsPageList.map((p) => (
              <li key={p.slug} className="flex items-center justify-between px-5 py-3 gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <IconPage className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                  <Link href={`/${ADMIN_PATH}/halaman/${p.slug}`} className="text-sm text-white hover:text-[#C5A059] transition-colors truncate">
                    {p.label}
                  </Link>
                </div>
                <span className={`text-xs shrink-0 ${p.updatedAt ? "text-zinc-500" : "text-[#fab219]"}`}>
                  {p.updatedAt ? timeAgo(p.updatedAt) : "Belum diisi"}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
