import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "../_components/ui";
import { IconPage } from "../_components/icons";
import { PAGE_SCHEMAS } from "./schema";

const ADMIN_PATH = process.env.ADMIN_PATH;

const KNOWN_PAGES = Object.entries(PAGE_SCHEMAS).map(([slug, schema]) => ({ slug, label: schema.label }));

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(d);
}

export default async function HalamanListPage() {
  const pages = await prisma.page.findMany();
  const pageBySlug = Object.fromEntries(pages.map((p) => [p.slug, p]));
  const filledCount = KNOWN_PAGES.filter((kp) => pageBySlug[kp.slug]).length;

  return (
    <div>
      <PageHeader title="Halaman/Konten" description={`${filledCount} dari ${KNOWN_PAGES.length} halaman sudah diisi`} />

      <div className="rounded-lg border border-white/[0.06] bg-[#111113] overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[520px]">
          <thead>
            <tr className="border-b border-white/[0.06] text-left text-[11px] uppercase tracking-wider text-zinc-500">
              <th className="px-5 py-3 font-medium">Halaman</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Terakhir Diubah</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {KNOWN_PAGES.map((kp) => {
              const existing = pageBySlug[kp.slug];
              return (
                <tr key={kp.slug} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <IconPage className="w-4 h-4 text-zinc-600" />
                      <span className="text-white font-medium">{kp.label}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    {existing ? (
                      <span className="text-xs font-medium text-[#4ade80]">Live</span>
                    ) : (
                      <span className="text-xs text-[#fab219]">Belum diisi</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-zinc-500 text-xs">{existing ? formatDate(existing.updatedAt) : "—"}</td>
                  <td className="px-5 py-3 text-right">
                    <Link href={`/${ADMIN_PATH}/halaman/${kp.slug}`} className="text-xs font-medium text-[#C5A059] hover:underline">
                      {existing ? "Edit" : "Isi sekarang"} →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
