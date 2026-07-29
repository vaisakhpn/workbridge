import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

export function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-16">
      {/* Greeting Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 rounded-lg" />
          <Skeleton className="h-4 w-48 rounded-md" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>

      {/* Stats Cards Grid Skeleton */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-xl" />
            </div>
            <Skeleton className="h-7 w-16 rounded-lg" />
            <Skeleton className="h-3 w-32 rounded-md" />
          </Card>
        ))}
      </div>

      {/* Quick Actions Skeleton */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-xl" />
        ))}
      </div>

      {/* Activity Grid Skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-36 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex items-center gap-3 p-3 border border-border/40 rounded-xl">
                  <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                    <Skeleton className="h-3 w-1/2 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DashboardSkeleton;
