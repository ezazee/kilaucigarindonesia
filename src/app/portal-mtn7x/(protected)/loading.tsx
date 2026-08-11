import { Skeleton, Panel } from "./_components/ui";

export default function OverviewLoading() {
  return (
    <div>
      <div className="mb-8">
        <Skeleton className="h-7 w-40 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-white/[0.06] bg-[#111113] p-5">
            <Skeleton className="h-3 w-20 mb-3" />
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-8">
        <Panel title="Produk per Kategori">
          <Skeleton className="h-64 w-full" />
        </Panel>
        <Panel title="Status Stock">
          <Skeleton className="h-64 w-full" />
        </Panel>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {Array.from({ length: 2 }).map((_, i) => (
          <Panel key={i}>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton key={j} className="h-8 w-full" />
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
