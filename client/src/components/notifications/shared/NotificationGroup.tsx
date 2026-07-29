"use client";

import type { NotificationItem } from "@/types/notification.types";
import { NotificationCard } from "./NotificationCard";

interface NotificationGroupProps {
  title: string;
  notifications: NotificationItem[];
  onMarkAsRead?: (id: string) => void;
}

export function NotificationGroup({
  title,
  notifications,
  onMarkAsRead,
}: NotificationGroupProps) {
  if (notifications.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 border-b border-border/60 pb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
        <span className="text-[11px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {notifications.length}
        </span>
      </div>

      <div className="space-y-2.5">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification._id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
          />
        ))}
      </div>
    </section>
  );
}
