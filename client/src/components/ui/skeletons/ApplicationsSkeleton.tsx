import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

export function ApplicationsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-16">
      {/* Back Link Skeleton */}
      <Skeleton className="h-4 w-32 rounded-md" />

      {/* Job Summary Banner Card Skeleton */}
      <Card className="p-6 space-y-4">
        <div className="space-y-2 border-b border-border/60 pb-4">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-7 w-64 rounded-lg" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </Card>

      {/* Search & Filter Bar Skeleton */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80">
        <Skeleton className="h-10 w-full lg:max-w-md rounded-xl" />
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Applicant Cards Grid Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-28 rounded-md" />
                  <Skeleton className="h-3.5 w-16 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            <div className="space-y-2 pt-2 border-t border-border/40">
              <Skeleton className="h-4 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-border/60">
              <Skeleton className="h-8 flex-1 rounded-xl" />
              <Skeleton className="h-8 w-16 rounded-xl" />
              <Skeleton className="h-8 w-16 rounded-xl" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ApplicationsSkeleton;
