import axiosInstance from "@/lib/axios";
import type {
  GetNotificationsApiResponse,
  NotificationActionApiResponse,
} from "@/types/notification.types";

export const notificationService = {
  getNotifications: async (): Promise<GetNotificationsApiResponse> => {
    const response = await axiosInstance.get<GetNotificationsApiResponse>(
      "/notifications"
    );
    return response.data;
  },

  markAsRead: async (
    notificationId: string
  ): Promise<NotificationActionApiResponse> => {
    const response = await axiosInstance.patch<NotificationActionApiResponse>(
      `/notifications/${notificationId}/read`
    );
    return response.data;
  },

  markAllAsRead: async (): Promise<NotificationActionApiResponse> => {
    const response = await axiosInstance.patch<NotificationActionApiResponse>(
      "/notifications/read-all"
    );
    return response.data;
  },
};
