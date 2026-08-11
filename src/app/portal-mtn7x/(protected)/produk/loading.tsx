import { Skeleton } from "../_components/ui";

export default function ProdukLoading() {
  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <Skeleton className="h-7 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-9 w-36 rounded-md" />
      </div>

      <div className="flex gap-2 mb-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full" />
        ))}
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-[#111113] overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-3 border-b border-white/[0.06] last:border-0">
            <Skeleton className="w-10 h-10 rounded-md shrink-0" />
            <Skeleton className="h-4 flex-1 max-w-[160px]" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
