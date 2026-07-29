import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

export function NotificationsSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-16">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-8 w-44 rounded-lg" />
          <Skeleton className="h-4 w-72 rounded-md" />
        </div>
        <Skeleton className="h-8 w-32 rounded-xl" />
      </div>

      {/* Group Sections Skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-4 w-20 rounded-md" />
            <div className="space-y-2.5">
              {Array.from({ length: 3 }).map((_, j) => (
                <Card key={j} className="p-4">
                  <div className="flex items-start gap-3.5">
                    <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-36 rounded-md" />
                        <Skeleton className="h-3 w-12 rounded-md" />
                      </div>
                      <Skeleton className="h-3.5 w-3/4 rounded-md" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsSkeleton;
