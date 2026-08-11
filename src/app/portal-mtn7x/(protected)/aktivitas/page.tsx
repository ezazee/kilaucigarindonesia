import { prisma } from "@/lib/prisma";
import { PageHeader, Panel, Pagination } from "../_components/ui";

const ADMIN_PATH = process.env.ADMIN_PATH;
const PAGE_SIZE = 25;

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

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(d);
}

export default async function AktivitasPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const [totalCount, logs] = await Promise.all([
    prisma.activityLog.count(),
    prisma.activityLog.findMany({
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { user: { select: { name: true } } },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div>
      <PageHeader title="Aktivitas" description={`${totalCount} aksi tercatat di dashboard`} />

      <Panel>
        {logs.length === 0 ? (
          <p className="text-sm text-zinc-500 py-4">Belum ada aktivitas tercatat.</p>
        ) : (
          <ul className="divide-y divide-white/[0.06] -mx-5">
            {logs.map((log) => {
              const action = ACTION_LABEL[log.action] ?? { label: log.action, color: "#71717a" };
              return (
                <li key={log.id} className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 px-5 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold shrink-0"
                      style={{ backgroundColor: `${action.color}1a`, color: action.color }}
                    >
                      {action.label}
                    </span>
                    <span className="text-sm text-white truncate">
                      {ENTITY_LABEL[log.entity] ?? log.entity}
                      {log.entityId && <span className="text-zinc-500"> &middot; {log.entityId}</span>}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 text-xs text-zinc-500">
                    <span>{log.user?.name ?? "—"}</span>
                    <span>{formatDate(log.createdAt)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Panel>

      <Pagination basePath={`/${ADMIN_PATH}/aktivitas`} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
