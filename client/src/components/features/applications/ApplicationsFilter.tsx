"use client";

import type { ApplicationFilterStatus } from "@/types/application.types";
import { Badge } from "@/components/ui/badge";

interface ApplicationsFilterProps {
  currentFilter: ApplicationFilterStatus;
  counts: Record<ApplicationFilterStatus, number>;
  onFilterChange: (status: ApplicationFilterStatus) => void;
}

const filterOptions: { id: ApplicationFilterStatus; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "PENDING", label: "Pending" },
  { id: "ACCEPTED", label: "Accepted" },
  { id: "REJECTED", label: "Rejected" },
  { id: "COMPLETED", label: "Completed" },
];

export function ApplicationsFilter({
  currentFilter,
  counts,
  onFilterChange,
}: ApplicationsFilterProps) {
  return (
    <div className="border-border bg-card flex w-full max-w-full items-center gap-1.5 overflow-x-auto rounded-2xl border p-1.5 shadow-xs whitespace-nowrap scrollbar-none">
      {filterOptions.map((option) => {
        const isActive = currentFilter === option.id;
        const count = counts[option.id] || 0;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onFilterChange(option.id)}
            className={`flex shrink-0 items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-orange-600 text-white shadow-xs font-bold"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <span>{option.label}</span>
            <Badge
              variant="secondary"
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {count}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}
