"use client";

import { BellOff } from "lucide-react";
import Card from "@/components/ui/Card";
import type { NotificationFilterType } from "@/types/notification.types";

interface EmptyNotificationsProps {
  filterType: NotificationFilterType;
}

export function EmptyNotifications({ filterType }: EmptyNotificationsProps) {
  const getMessage = () => {
    if (filterType === "UNREAD") {
      return "You have no unread notifications! You're all caught up.";
    }
    return "You have no notifications yet.";
  };

  return (
    <Card className="flex flex-col items-center justify-center border-dashed p-12 text-center">
      <div className="bg-primary/10 text-primary mb-4 rounded-full p-4">
        <BellOff className="h-10 w-10" />
      </div>

      <h3 className="text-foreground text-lg font-bold">No Notifications</h3>

      <p className="text-muted-foreground mt-1 max-w-sm text-xs sm:text-sm">
        {getMessage()}
      </p>
    </Card>
  );
}
