"use client";

import { Badge } from "@/components/ui/badge";
import type { JobStatus } from "@/types/job.types";

interface JobStatusBadgeProps {
  status: JobStatus;
}

export function JobStatusBadge({ status }: JobStatusBadgeProps) {
  switch (status) {
    case "OPEN":
      return (
        <Badge
          variant="secondary"
          className="bg-emerald-500/10 text-emerald-600 border-emerald-200/80 gap-1.5 px-2.5 py-0.5 text-xs font-semibold"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          OPEN
        </Badge>
      );

    case "FILLED":
      return (
        <Badge
          variant="secondary"
          className="bg-amber-500/10 text-amber-600 border-amber-200/80 gap-1.5 px-2.5 py-0.5 text-xs font-semibold"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          IN PROGRESS
        </Badge>
      );

    case "COMPLETED":
      return (
        <Badge
          variant="secondary"
          className="bg-sky-500/10 text-sky-600 border-sky-200/80 gap-1.5 px-2.5 py-0.5 text-xs font-semibold"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
          COMPLETED
        </Badge>
      );

    case "CANCELLED":
    default:
      return (
        <Badge
          variant="secondary"
          className="bg-rose-500/10 text-rose-600 border-rose-200/80 gap-1.5 px-2.5 py-0.5 text-xs font-semibold"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          CLOSED
        </Badge>
      );
  }
}
