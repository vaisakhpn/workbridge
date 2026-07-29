"use client";

import {
  CheckCircle2,
  Briefcase,
  Info,
  Check,
} from "lucide-react";

import Card from "@/components/ui/Card";
import type { NotificationItem } from "@/types/notification.types";

interface NotificationCardProps {
  notification: NotificationItem;
  onMarkAsRead: (id: string) => void;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60)
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function NotificationCard({
  notification,
  onMarkAsRead,
}: NotificationCardProps) {
  const { _id, title, message, type, isRead, createdAt } = notification;

  const getIconAndStyle = () => {
    switch (type) {
      case "APPLICATION":
        return {
          icon: CheckCircle2,
          bg: "bg-emerald-500/10 text-emerald-600",
          border: isRead ? "border-border/60" : "border-emerald-500/30 bg-emerald-500/5",
        };
      case "JOB":
        return {
          icon: Briefcase,
          bg: "bg-amber-500/10 text-amber-600",
          border: isRead ? "border-border/60" : "border-amber-500/30 bg-amber-500/5",
        };
      default:
        return {
          icon: Info,
          bg: "bg-blue-500/10 text-blue-600",
          border: isRead ? "border-border/60" : "border-blue-500/30 bg-blue-500/5",
        };
    }
  };

  const { icon: Icon, bg, border } = getIconAndStyle();
  const formattedTime = formatRelativeTime(createdAt);

  return (
    <Card
      className={`flex items-start justify-between gap-4 p-5 transition-all duration-200 ${border} ${
        !isRead ? "shadow-xs" : "opacity-90"
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Category Icon */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg}`}
        >
          <Icon className="h-5 w-5" />
        </div>

        {/* Text Content */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-foreground">{title}</h4>
            {!isRead && (
              <span className="bg-primary h-2 w-2 shrink-0 rounded-full" />
            )}
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {message}
          </p>

          <p className="text-[11px] text-muted-foreground/80 pt-1 font-medium">
            {formattedTime}
          </p>
        </div>
      </div>

      {/* Action Button: Mark as Read */}
      {!isRead && (
        <button
          type="button"
          onClick={() => onMarkAsRead(_id)}
          title="Mark as read"
          className="text-muted-foreground hover:text-primary hover:bg-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors cursor-pointer"
        >
          <Check className="h-4 w-4" />
        </button>
      )}
    </Card>
  );
}
