import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { notificationService } from "@/services/notification.service";
import { useNotificationStore } from "@/store/notification.store";
import type {
  NotificationItem,
  NotificationTimeGroup,
} from "@/types/notification.types";

interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useNotifications() {
  const {
    notifications,
    unreadCount,
    filterType,
    isLoading,
    isUpdating,
    error,
    setNotifications,
    setFilterType,
    setLoading,
    setUpdating,
    setError,
    markNotificationReadInStore,
    markAllNotificationsReadInStore,
  } = useNotificationStore();

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await notificationService.getNotifications();

      if (response.success && response.data) {
        setNotifications(
          response.data.notifications || [],
          response.data.unreadCount || 0
        );
      }
    } catch (err: unknown) {
      const apiErr = err as ApiErrorResponse;
      const message =
        apiErr?.response?.data?.message || "Failed to load notifications";

      setError(message);
      toast.error(message);
    }
  }, [setLoading, setError, setNotifications]);

  const markAsRead = useCallback(
    async (id: string) => {
      try {
        markNotificationReadInStore(id);
        await notificationService.markAsRead(id);
      } catch (err: unknown) {
        const apiErr = err as ApiErrorResponse;
        toast.error(
          apiErr?.response?.data?.message || "Failed to mark as read"
        );
      }
    },
    [markNotificationReadInStore]
  );

  const markAllAsRead = useCallback(async () => {
    try {
      setUpdating(true);
      markAllNotificationsReadInStore();
      const response = await notificationService.markAllAsRead();
      if (response.success) {
        toast.success("All notifications marked as read");
      }
    } catch (err: unknown) {
      const apiErr = err as ApiErrorResponse;
      toast.error(
        apiErr?.response?.data?.message || "Failed to mark all as read"
      );
    } finally {
      setUpdating(false);
    }
  }, [setUpdating, markAllNotificationsReadInStore]);

  const filteredNotifications = useMemo(() => {
    if (filterType === "UNREAD") return notifications.filter((n) => !n.isRead);
    return notifications;
  }, [notifications, filterType]);

  const groupedNotifications = useMemo(() => {
    const today: NotificationItem[] = [];
    const yesterday: NotificationItem[] = [];
    const earlier: NotificationItem[] = [];

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);

    filteredNotifications.forEach((item: NotificationItem) => {
      const date = new Date(item.createdAt);

      if (date >= todayStart) {
        today.push(item);
      } else if (date >= yesterdayStart) {
        yesterday.push(item);
      } else {
        earlier.push(item);
      }
    });

    return [
      { id: "TODAY" as NotificationTimeGroup, title: "Today", items: today, badgeColor: "blue" },
      { id: "YESTERDAY" as NotificationTimeGroup, title: "Yesterday", items: yesterday, badgeColor: "amber" },
      { id: "EARLIER" as NotificationTimeGroup, title: "Earlier", items: earlier, badgeColor: "slate" },
    ].filter((group) => group.items.length > 0);
  }, [filteredNotifications]);

  return {
    notifications,
    filteredNotifications,
    groupedNotifications,
    filterType,
    totalCount: notifications.length,
    unreadCount,
    isLoading,
    isUpdating,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    setFilterType,
  };
}

export const useWorkerNotifications = useNotifications;
