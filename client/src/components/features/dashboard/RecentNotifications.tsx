"use client";

import { Bell } from "lucide-react";
import Card from "@/components/ui/Card";

interface NotificationItem {
  id: string | number;
  title: string;
  time: string;
  isUnread?: boolean;
}

interface RecentNotificationsProps {
  notifications?: NotificationItem[];
}

const defaultNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Application Accepted for Wedding Catering",
    time: "2 hours ago",
    isUnread: true,
  },
  {
    id: "2",
    title: "New Event Catering Job available in Calicut",
    time: "Yesterday",
    isUnread: false,
  },
  {
    id: "3",
    title: "Profile Viewed by Malabar Event Team",
    time: "2 days ago",
    isUnread: false,
  },
];

export function RecentNotifications({
  notifications = defaultNotifications,
}: RecentNotificationsProps) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 rounded-lg p-1.5 text-primary">
            <Bell className="h-4 w-4" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            Recent Notifications
          </h3>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-border rounded-xl">
          <p className="text-sm font-medium text-muted-foreground">
            No new notifications
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="border-border hover:bg-muted/40 flex items-start gap-3 rounded-xl border p-4 transition-colors"
            >
              {notification.isUnread ? (
                <span className="bg-primary mt-1.5 h-2 w-2 shrink-0 rounded-full" />
              ) : (
                <span className="bg-muted-foreground/30 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
              )}

              <div className="space-y-1">
                <h4 className="font-medium text-foreground text-sm">
                  {notification.title}
                </h4>

                <p className="text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
