import { cn } from "@/lib/utils";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-muted/80 dark:bg-muted/40",
        className
      )}
      {...props}
    />
  );
}

export default Skeleton;
