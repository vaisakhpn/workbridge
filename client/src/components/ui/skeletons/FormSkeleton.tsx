import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

export function FormSkeleton() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-16">
      {/* Header Skeleton */}
      <div className="space-y-1.5">
        <Skeleton className="h-8 w-44 rounded-lg" />
        <Skeleton className="h-4 w-64 rounded-md" />
      </div>

      {/* Form Cards Skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-6 space-y-4">
            <Skeleton className="h-5 w-36 rounded-md border-b border-border/40 pb-3" />
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-24 rounded-md" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-3.5 w-24 rounded-md" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3.5 w-24 rounded-md" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FormSkeleton;
