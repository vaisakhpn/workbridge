import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

export function ManageJobsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-16">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1.5">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded-md" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="flex flex-col sm:flex-row gap-3 bg-card p-4 rounded-xl border border-border/80">
        <Skeleton className="h-10 flex-1 rounded-xl" />
        <Skeleton className="h-10 w-full sm:w-52 rounded-xl" />
      </div>

      {/* Job Cards Grid Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <Skeleton className="h-3.5 w-1/2 rounded-md" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            <div className="space-y-2 pt-2 border-t border-border/50">
              <Skeleton className="h-4 w-2/3 rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-border/60">
              <Skeleton className="h-9 flex-1 rounded-xl" />
              <Skeleton className="h-9 w-20 rounded-xl" />
              <Skeleton className="h-9 w-20 rounded-xl" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ManageJobsSkeleton;
