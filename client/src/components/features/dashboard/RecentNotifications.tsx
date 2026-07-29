"use client";

import { Bell } from "lucide-react";
import Card from "@/components/ui/Card";

interface NotificationItem {
  id: string | number;
  title: string;
  time: string;
}

interface RecentNotificationsProps {
  notifications?: NotificationItem[];
}

const defaultNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Application Accepted for Wedding Catering",
    time: "2 hours ago",
  },
  {
    id: "2",
    title: "New Event Catering Job available in Calicut",
    time: "Yesterday",
  },
  {
    id: "3",
    title: "Profile Viewed by Malabar Event Team",
    time: "2 days ago",
  },
];

export function RecentNotifications({
  notifications = defaultNotifications,
}: RecentNotificationsProps) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-2">
        <Bell className="text-primary h-5 w-5" />
        <h3 className="text-base font-semibold text-foreground">
          Recent Notifications
        </h3>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="border-border hover:bg-muted/40 rounded-lg border p-4 transition-colors"
          >
            <h4 className="font-medium text-foreground">
              {notification.title}
            </h4>

            <p className="mt-1 text-xs text-muted-foreground">
              {notification.time}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
