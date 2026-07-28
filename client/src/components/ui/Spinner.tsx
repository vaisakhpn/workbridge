import { cn } from "@/utils/cn";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const spinnerSizes = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-6 w-6 border-[3px]",
};

export default function Spinner({
  className,
  size = "md",
}: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-current border-t-transparent",
        spinnerSizes[size],
        className
      )}
    />
  );
}