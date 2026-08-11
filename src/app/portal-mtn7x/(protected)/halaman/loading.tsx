import { Skeleton } from "../_components/ui";

export default function HalamanLoading() {
  return (
    <div>
      <div className="mb-8">
        <Skeleton className="h-7 w-44 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-[#111113] overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-3 border-b border-white/[0.06] last:border-0">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-28" />
          </div>
        ))}
      </div>
    </div>
  );
}
