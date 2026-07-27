import { Notification } from "../../models/notification.model";
import User from "../../models/User";
import { AppError } from "../../utils/AppError";

class NotificationService {
  async createNotification(
    userId: string,
    title: string,
    message: string,
    type: "APPLICATION" | "JOB" | "SYSTEM",
  ) {
    await Notification.create({
      user: userId,
      title,
      message,
      type,
    });
  }
  async getNotifications(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const notifications = await Notification.find({
      user: userId,
    }).sort({ createdAt: -1 });

    const unreadCount = notifications.filter(
      (notification) => !notification.isRead,
    ).length;

    return {
      success: true,
      data: {
        unreadCount,
        notifications,
      },
    };
  }
  async markAsRead(notificationId: string, userId: string) {
    const notification = await Notification.findOne({
      _id: notificationId,
      user: userId,
    });

    if (!notification) {
      throw new AppError("Notification not found", 404);
    }

    notification.isRead = true;

    await notification.save();

    return {
      success: true,
      message: "Notification marked as read",
    };
  }

  async markAllAsRead(userId: string) {
    await Notification.updateMany(
      {
        user: userId,
        isRead: false,
      },
      {
        isRead: true,
      },
    );

    return {
      success: true,
      message: "All notifications marked as read",
    };
  }
}

export default new NotificationService();
