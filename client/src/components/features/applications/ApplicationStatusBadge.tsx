"use client";

import { Badge } from "@/components/ui/badge";
import type { ApplicationStatus } from "@/types/application.types";

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus | "COMPLETED";
}

export function ApplicationStatusBadge({
  status,
}: ApplicationStatusBadgeProps) {
  if (status === "ACCEPTED") {
    return (
      <Badge
        variant="secondary"
        className="bg-emerald-500/10 text-emerald-600 border-emerald-200/80 px-2.5 py-1 text-xs font-semibold"
      >
        Accepted
      </Badge>
    );
  }

  if (status === "REJECTED") {
    return (
      <Badge
        variant="secondary"
        className="bg-rose-500/10 text-rose-600 border-rose-200/80 px-2.5 py-1 text-xs font-semibold"
      >
        Rejected
      </Badge>
    );
  }

  if (status === "COMPLETED") {
    return (
      <Badge
        variant="secondary"
        className="bg-purple-500/10 text-purple-600 border-purple-200/80 px-2.5 py-1 text-xs font-semibold"
      >
        Completed
      </Badge>
    );
  }

  // Default PENDING
  return (
    <Badge
      variant="secondary"
      className="bg-amber-500/10 text-amber-600 border-amber-200/80 px-2.5 py-1 text-xs font-semibold"
    >
      Pending
    </Badge>
  );
}
