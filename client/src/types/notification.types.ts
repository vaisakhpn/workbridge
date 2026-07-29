export type NotificationType = "APPLICATION" | "JOB" | "SYSTEM";

export type NotificationFilterType = "ALL" | "UNREAD";

export interface NotificationItem {
  _id: string;
  user: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetNotificationsApiResponse {
  success: boolean;
  data: {
    unreadCount: number;
    notifications: NotificationItem[];
  };
}

export interface NotificationActionApiResponse {
  success: boolean;
  message: string;
}

export type NotificationTimeGroup = "TODAY" | "YESTERDAY" | "EARLIER";
