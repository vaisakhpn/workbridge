"use client";

import type { NotificationFilterType } from "@/types/notification.types";
import { Badge } from "@/components/ui/badge";

interface NotificationFilterProps {
  currentFilter: NotificationFilterType;
  totalCount: number;
  unreadCount: number;
  onFilterChange: (type: NotificationFilterType) => void;
}

export function NotificationFilter({
  currentFilter,
  totalCount,
  unreadCount,
  onFilterChange,
}: NotificationFilterProps) {
  return (
    <div className="border-border bg-card inline-flex items-center gap-1 rounded-xl border p-1 shadow-xs">
      <button
        type="button"
        onClick={() => onFilterChange("ALL")}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
          currentFilter === "ALL"
            ? "bg-primary text-primary-foreground shadow-xs"
            : "text-muted-foreground hover:bg-accent hover:text-foreground"
        }`}
      >
        <span>All</span>
        <Badge
          variant="secondary"
          className={`rounded-full px-1.5 py-0 text-[10px] ${
            currentFilter === "ALL"
              ? "bg-primary-foreground/20 text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {totalCount}
        </Badge>
      </button>

      <button
        type="button"
        onClick={() => onFilterChange("UNREAD")}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
          currentFilter === "UNREAD"
            ? "bg-primary text-primary-foreground shadow-xs"
            : "text-muted-foreground hover:bg-accent hover:text-foreground"
        }`}
      >
        <span>Unread</span>
        {unreadCount > 0 && (
          <Badge
            variant="secondary"
            className={`rounded-full px-1.5 py-0 text-[10px] ${
              currentFilter === "UNREAD"
                ? "bg-primary-foreground/20 text-primary-foreground"
                : "bg-amber-500/20 text-amber-600 font-bold"
            }`}
          >
            {unreadCount}
          </Badge>
        )}
      </button>
    </div>
  );
}
