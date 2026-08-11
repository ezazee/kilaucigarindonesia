import { Skeleton, Panel } from "../_components/ui";

export default function AktivitasLoading() {
  return (
    <div>
      <div className="mb-8">
        <Skeleton className="h-7 w-28 mb-2" />
        <Skeleton className="h-4 w-56" />
      </div>

      <Panel>
        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-4 w-40" />
              </div>
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
