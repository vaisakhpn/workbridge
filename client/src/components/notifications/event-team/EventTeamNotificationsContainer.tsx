"use client";

import { useEffect, useMemo } from "react";
import { Loader2, AlertCircle, CheckCheck } from "lucide-react";

import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/Button";
import type { NotificationItem } from "@/types/notification.types";

import { NotificationGroup } from "../shared/NotificationGroup";
import { EmptyNotifications } from "../shared/EmptyNotifications";
import { NotificationsSkeleton } from "@/components/ui/skeletons";

export function EventTeamNotificationsContainer() {
  const {
    notifications,
    unreadCount,
    isLoading,
    error,
    fetchNotifications,
    markAllAsRead,
    markAsRead,
  } = useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const { todayNotifications, yesterdayNotifications, earlierNotifications } =
    useMemo(() => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const todayList: NotificationItem[] = [];
      const yesterdayList: NotificationItem[] = [];
      const earlierList: NotificationItem[] = [];

      notifications.forEach((item: NotificationItem) => {
        const itemDate = new Date(item.createdAt);
        if (itemDate >= today) {
          todayList.push(item);
        } else if (itemDate >= yesterday) {
          yesterdayList.push(item);
        } else {
          earlierList.push(item);
        }
      });

      return {
        todayNotifications: todayList,
        yesterdayNotifications: yesterdayList,
        earlierNotifications: earlierList,
      };
    }, [notifications]);

  if (isLoading || (!notifications && !error)) {
    return <NotificationsSkeleton />;
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center p-6 text-center">
        <div className="bg-destructive/10 text-destructive mb-4 rounded-full p-3">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold">Unable to load notifications</h2>
        <p className="text-muted-foreground mt-1 text-sm">{error}</p>
        <Button
          onClick={fetchNotifications}
          variant="primary"
          size="sm"
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-16">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Notifications
          </h1>
          <p className="text-sm text-muted-foreground">
            Stay updated on your job listings, applicants & event reminders.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="xs"
            onClick={markAllAsRead}
            className="gap-1.5 text-xs font-semibold"
          >
            <CheckCheck size={14} />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Notifications List or Empty State */}
      {notifications.length === 0 ? (
        <EmptyNotifications />
      ) : (
        <div className="space-y-6">
          <NotificationGroup
            title="Today"
            notifications={todayNotifications}
            onMarkAsRead={markAsRead}
          />

          <NotificationGroup
            title="Yesterday"
            notifications={yesterdayNotifications}
            onMarkAsRead={markAsRead}
          />

          <NotificationGroup
            title="Earlier"
            notifications={earlierNotifications}
            onMarkAsRead={markAsRead}
          />
        </div>
      )}
    </div>
  );
}

export default EventTeamNotificationsContainer;
