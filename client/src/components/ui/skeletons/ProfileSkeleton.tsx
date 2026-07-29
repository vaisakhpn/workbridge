import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

export function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-16">
      {/* Profile Header Banner Skeleton */}
      <Card className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <Skeleton className="h-24 w-24 rounded-2xl shrink-0" />
          <div className="flex-1 text-center sm:text-left space-y-2.5 w-full">
            <Skeleton className="h-6 w-48 mx-auto sm:mx-0 rounded-md" />
            <Skeleton className="h-4 w-64 mx-auto sm:mx-0 rounded-md" />
            <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
          </div>
        </div>
      </Card>

      {/* Profile Details Sections Skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <Skeleton className="h-5 w-36 rounded-md" />
              <Skeleton className="h-8 w-20 rounded-lg" />
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
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProfileSkeleton;
