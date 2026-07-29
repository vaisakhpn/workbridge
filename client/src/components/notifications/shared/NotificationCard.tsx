"use client";

import {
  FileText,
  Briefcase,
  Settings,
  XCircle,
  Calendar,
  LucideIcon,
} from "lucide-react";

import Card from "@/components/ui/Card";
import type { NotificationItem, NotificationType } from "@/types/notification.types";

interface NotificationCardProps {
  notification: NotificationItem;
  onMarkAsRead?: (id: string) => void;
}

const iconMap: Record<
  NotificationType,
  { icon: LucideIcon; bg: string; iconColor: string }
> = {
  APPLICATION: {
    icon: FileText,
    bg: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  JOB: {
    icon: Briefcase,
    bg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  SYSTEM: {
    icon: Settings,
    bg: "bg-slate-500/10",
    iconColor: "text-slate-600",
  },
};

export function NotificationCard({
  notification,
  onMarkAsRead,
}: NotificationCardProps) {
  const { _id, title, message, type, isRead, createdAt } = notification;

  const isCancelled =
    title.toLowerCase().includes("cancel") ||
    message.toLowerCase().includes("cancel");

  const isUpcoming =
    title.toLowerCase().includes("upcoming") ||
    message.toLowerCase().includes("tomorrow") ||
    message.toLowerCase().includes("starts");

  const style = isCancelled
    ? { icon: XCircle, bg: "bg-rose-500/10", iconColor: "text-rose-600" }
    : isUpcoming
    ? { icon: Calendar, bg: "bg-emerald-500/10", iconColor: "text-emerald-600" }
    : iconMap[type] || iconMap.SYSTEM;

  const Icon = style.icon;

  const formattedTime = new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card
      onClick={() => !isRead && onMarkAsRead?.(_id)}
      className={`p-4 transition-all duration-200 border-border/80 ${
        !isRead ? "bg-card border-primary/30 shadow-2xs" : "bg-card/60 opacity-90"
      } ${!isRead && onMarkAsRead ? "cursor-pointer hover:border-primary/50" : ""}`}
    >
      <div className="flex items-start gap-3.5">
        {/* Type Icon Badge */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.bg}`}
        >
          <Icon className={`h-5 w-5 ${style.iconColor}`} />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span>{title}</span>

              {!isRead && (
                <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
              )}
            </h4>

            <span className="text-[11px] text-muted-foreground whitespace-nowrap">
              {formattedTime}
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </Card>
  );
}
