import mongoose, { Schema, HydratedDocument, Model } from "mongoose";

export interface INotification {
  user: mongoose.Types.ObjectId;

  title: string;

  message: string;

  type: "APPLICATION" | "JOB" | "SYSTEM";

  isRead: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export type NotificationDocument = HydratedDocument<INotification>;

type NotificationModel = Model<INotification>;

const notificationSchema = new Schema<INotification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["APPLICATION", "JOB", "SYSTEM"],
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

export const Notification = mongoose.model<INotification, NotificationModel>(
  "Notification",
  notificationSchema,
);
