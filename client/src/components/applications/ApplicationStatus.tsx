"use client";

import { Badge } from "@/components/ui/badge";
import type { ApplicationStatusType } from "@/types/application.types";

interface ApplicationStatusProps {
  status: ApplicationStatusType;
}

export function ApplicationStatus({ status }: ApplicationStatusProps) {
  switch (status) {
    case "PENDING":
      return (
        <Badge
          variant="secondary"
          className="bg-amber-500/10 text-amber-600 border-amber-200/80 gap-1.5 px-2.5 py-0.5 text-xs font-semibold"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          Pending
        </Badge>
      );

    case "ACCEPTED":
      return (
        <Badge
          variant="secondary"
          className="bg-emerald-500/10 text-emerald-600 border-emerald-200/80 gap-1.5 px-2.5 py-0.5 text-xs font-semibold"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Accepted
        </Badge>
      );

    case "REJECTED":
    default:
      return (
        <Badge
          variant="secondary"
          className="bg-rose-500/10 text-rose-600 border-rose-200/80 gap-1.5 px-2.5 py-0.5 text-xs font-semibold"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Rejected
        </Badge>
      );
  }
}
