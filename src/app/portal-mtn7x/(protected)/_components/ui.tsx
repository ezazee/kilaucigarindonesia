import { ReactNode } from "react";
import Link from "next/link";
import { STATUS_COLORS, STATUS_LABEL_ID } from "../_lib/theme";

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white tracking-tight">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-zinc-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sublabel,
  tone = "default",
  icon,
}: {
  label: string;
  value: string | number;
  sublabel?: string;
  tone?: "default" | "critical" | "warning" | "good";
  icon?: ReactNode;
}) {
  const toneRing: Record<string, string> = {
    default: "border-white/[0.06]",
    critical: "border-[#d03b3b]/30",
    warning: "border-[#fab219]/30",
    good: "border-[#0ca30c]/30",
  };
  const toneText: Record<string, string> = {
    default: "text-white",
    critical: "text-[#e57373]",
    warning: "text-[#fab219]",
    good: "text-[#4ade80]",
  };
  return (
    <div className={`rounded-lg border ${toneRing[tone]} bg-[#111113] p-5`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">{label}</span>
        {icon && <span className="text-zinc-600">{icon}</span>}
      </div>
      <div className={`mt-2.5 text-3xl font-serif font-bold ${toneText[tone]}`}>{value}</div>
      {sublabel && <p className="mt-1 text-xs text-zinc-500">{sublabel}</p>}
    </div>
  );
}

export function StockBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status as keyof typeof STATUS_COLORS] ?? "#71717a";
  const label = STATUS_LABEL_ID[status] ?? status;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
      style={{ backgroundColor: `${color}1a`, color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

export function Panel({ title, action, children, className = "" }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-white/[0.06] bg-[#111113] ${className}`}>
      {title && (
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-sm font-medium text-zinc-400">{title}</p>
      {description && <p className="mt-1 text-xs text-zinc-600">{description}</p>}
    </div>
  );
}

export const inputClass =
  "w-full rounded-md border border-white/10 bg-[#0c0c0e] px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#C5A059]/60 focus:border-[#C5A059]/60 transition-colors";

export const labelClass = "block text-xs font-medium text-zinc-500 mb-1.5";

export function PrimaryButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 rounded-md bg-[#C5A059] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#d9b672] disabled:opacity-50 disabled:cursor-not-allowed ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

export function GhostDangerButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-1.5 rounded-md border border-[#d03b3b]/30 px-2.5 py-1.5 text-xs font-medium text-[#e57373] transition-colors hover:bg-[#d03b3b]/10 ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-white/[0.06] ${className}`} />;
}

export function Pagination({
  basePath,
  currentPage,
  totalPages,
  query = {},
}: {
  basePath: string;
  currentPage: number;
  totalPages: number;
  query?: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value) params.set(key, value);
    }
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const pages: number[] = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="flex items-center justify-center gap-1.5 mt-6">
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={`rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium transition-colors ${
          currentPage === 1 ? "pointer-events-none opacity-30 text-zinc-600" : "text-zinc-300 hover:text-[#C5A059] hover:border-[#C5A059]/40"
        }`}
      >
        Sebelumnya
      </Link>
      {start > 1 && <span className="px-1.5 text-xs text-zinc-600">…</span>}
      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(p)}
          className={`min-w-[32px] text-center rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
            p === currentPage
              ? "border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059]"
              : "border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
          }`}
        >
          {p}
        </Link>
      ))}
      {end < totalPages && <span className="px-1.5 text-xs text-zinc-600">…</span>}
      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={`rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium transition-colors ${
          currentPage === totalPages ? "pointer-events-none opacity-30 text-zinc-600" : "text-zinc-300 hover:text-[#C5A059] hover:border-[#C5A059]/40"
        }`}
      >
        Berikutnya
      </Link>
    </div>
  );
}
