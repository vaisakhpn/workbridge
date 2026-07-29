"use client";

import { Bell } from "lucide-react";

import Card from "@/components/ui/Card";

const notifications = [
  {
    id: 1,
    title: "Application Accepted",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "New Catering Job Available",
    time: "Yesterday",
  },
  {
    id: 3,
    title: "Profile Viewed by Event Team",
    time: "2 days ago",
  },
];

export function RecentNotifications() {
  return (
    <Card>
      <div className="mb-6 flex items-center gap-2">
        <Bell className="h-5 w-5 text-primary" />

        <h2 className="text-lg font-semibold">
          Recent Notifications
        </h2>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/40"
          >
            <h3 className="font-medium">
              {notification.title}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {notification.time}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}