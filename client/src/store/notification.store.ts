import { create } from "zustand";
import type {
  NotificationItem,
  NotificationFilterType,
} from "@/types/notification.types";

interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;
  filterType: NotificationFilterType;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;

  setNotifications: (
    notifications: NotificationItem[],
    unreadCount: number
  ) => void;
  setFilterType: (filterType: NotificationFilterType) => void;
  setLoading: (isLoading: boolean) => void;
  setUpdating: (isUpdating: boolean) => void;
  setError: (error: string | null) => void;
  markNotificationReadInStore: (id: string) => void;
  markAllNotificationsReadInStore: () => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  filterType: "ALL",
  isLoading: true,
  isUpdating: false,
  error: null,

  setNotifications: (notifications, unreadCount) =>
    set({
      notifications,
      unreadCount,
      isLoading: false,
      error: null,
    }),

  setFilterType: (filterType) =>
    set({
      filterType,
    }),

  setLoading: (isLoading) =>
    set({
      isLoading,
    }),

  setUpdating: (isUpdating) =>
    set({
      isUpdating,
    }),

  setError: (error) =>
    set({
      error,
      isLoading: false,
    }),

  markNotificationReadInStore: (id) =>
    set((state) => {
      const updated = state.notifications.map((item) =>
        item._id === id ? { ...item, isRead: true } : item
      );
      const newUnreadCount = Math.max(0, state.unreadCount - 1);

      return {
        notifications: updated,
        unreadCount: newUnreadCount,
      };
    }),

  markAllNotificationsReadInStore: () =>
    set((state) => ({
      notifications: state.notifications.map((item) => ({
        ...item,
        isRead: true,
      })),
      unreadCount: 0,
    })),

  clearNotifications: () =>
    set({
      notifications: [],
      unreadCount: 0,
      filterType: "ALL",
      isLoading: false,
      isUpdating: false,
      error: null,
    }),
}));
