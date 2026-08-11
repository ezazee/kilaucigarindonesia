import { Skeleton } from "../_components/ui";

export default function KategoriLoading() {
  return (
    <div>
      <div className="mb-8">
        <Skeleton className="h-7 w-32 mb-2" />
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-[#111113] p-5 mb-6">
        <Skeleton className="h-9 w-full max-w-sm" />
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-[#111113] overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-3 border-b border-white/[0.06] last:border-0">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-1.5 flex-1 max-w-[140px] rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
