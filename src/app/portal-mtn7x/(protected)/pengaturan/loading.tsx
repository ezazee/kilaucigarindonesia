import { Skeleton, Panel } from "../_components/ui";

export default function PengaturanLoading() {
  return (
    <div>
      <div className="mb-8">
        <Skeleton className="h-7 w-32 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="max-w-2xl space-y-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <Panel key={i}>
            <div className="space-y-4">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
