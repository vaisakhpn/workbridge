"use client";

import type { NotificationItem, NotificationTimeGroup } from "@/types/notification.types";
import { NotificationCard } from "./NotificationCard";

interface NotificationGroupProps {
  id: NotificationTimeGroup;
  title: string;
  badgeColor: string;
  items: NotificationItem[];
  onMarkAsRead: (id: string) => void;
}

export function NotificationGroup({
  title,
  badgeColor,
  items,
  onMarkAsRead,
}: NotificationGroupProps) {
  if (items.length === 0) return null;

  const getDotColor = () => {
    switch (badgeColor) {
      case "blue":
        return "bg-blue-500";
      case "amber":
        return "bg-amber-500";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <div className="space-y-4">
      {/* Group Header */}
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${getDotColor()}`} />
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <span className="text-xs text-muted-foreground font-medium">
          ({items.length})
        </span>
      </div>

      {/* Cards List */}
      <div className="space-y-3">
        {items.map((notification) => (
          <NotificationCard
            key={notification._id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
          />
        ))}
      </div>
    </div>
  );
}
