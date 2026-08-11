import { Skeleton } from "../_components/ui";

export default function MediaLoading() {
  return (
    <div>
      <div className="mb-8">
        <Skeleton className="h-7 w-40 mb-2" />
        <Skeleton className="h-4 w-56" />
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-[#111113] p-5 mb-6">
        <Skeleton className="h-16 w-full" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-white/[0.06] bg-[#111113] p-2.5">
            <Skeleton className="w-full aspect-square rounded-md" />
            <Skeleton className="h-3 w-3/4 mt-2" />
            <Skeleton className="h-6 w-full mt-2" />
            <Skeleton className="h-6 w-full mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
