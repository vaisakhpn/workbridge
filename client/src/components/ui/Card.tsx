import { HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export default function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-orange-200/80 bg-orange-50/60 p-6 shadow-sm dark:border-orange-900/40 dark:bg-orange-950/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
