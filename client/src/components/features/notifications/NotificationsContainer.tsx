"use client";

import { useEffect } from "react";
import { Loader2, AlertCircle, CheckCheck } from "lucide-react";

import { useWorkerNotifications } from "@/hooks/useWorkerNotifications";
import { Button } from "@/components/ui/Button";

import { NotificationFilter } from "./NotificationFilter";
import { NotificationGroup } from "./NotificationGroup";
import { EmptyNotifications } from "./EmptyNotifications";

export function NotificationsContainer() {
  const {
    groupedNotifications,
    filterType,
    totalCount,
    unreadCount,
    isLoading,
    isUpdating,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    setFilterType,
  } = useWorkerNotifications();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  if (isLoading) {
    return (
      <div className="text-muted-foreground flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <p className="text-sm font-medium">Loading your notifications...</p>
      </div>
    );
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
    <div className="mx-auto max-w-4xl space-y-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Notifications
          </h1>
          <p className="text-sm text-muted-foreground">
            Stay updated on your applications and bookings
          </p>
        </div>

        {/* Header Actions: Filter & Mark All Read */}
        <div className="flex flex-wrap items-center gap-3">
          <NotificationFilter
            currentFilter={filterType}
            totalCount={totalCount}
            unreadCount={unreadCount}
            onFilterChange={setFilterType}
          />

          {unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              disabled={isUpdating}
              loading={isUpdating}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      {/* Grouped Notifications List or Empty State */}
      {groupedNotifications.length === 0 ? (
        <EmptyNotifications filterType={filterType} />
      ) : (
        <div className="space-y-8">
          {groupedNotifications.map((group) => (
            <NotificationGroup
              key={group.id}
              id={group.id}
              title={group.title}
              badgeColor={group.badgeColor}
              items={group.items}
              onMarkAsRead={markAsRead}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationsContainer;
