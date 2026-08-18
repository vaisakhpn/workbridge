"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Bell, CheckCheck, CheckCircle2, Briefcase, Info } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/hooks/useNotifications";
import { useAuthStore } from "@/store/auth.store";

export function WorkerNotificationMenu() {
  const { user, isAuthenticated } = useAuthStore();
  const {
    notifications,
    unreadCount,
    isLoading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  useEffect(() => {
    if (isAuthenticated && user?.role === "worker") {
      fetchNotifications();
    }
  }, [isAuthenticated, user, fetchNotifications]);

  if (!isAuthenticated || user?.role !== "worker") {
    return null;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-full border border-orange-200/80 dark:border-orange-900/40 bg-orange-50/60 dark:bg-orange-950/20 hover:bg-orange-100/80 dark:hover:bg-orange-950/40 p-0 text-orange-600 cursor-pointer focus:outline-none transition-all"
          title="Notifications"
        >
          <Bell className="h-5 w-5 text-orange-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-orange-600 px-1 text-[10px] font-bold text-white shadow-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 sm:w-96 p-0 shadow-xl border-orange-200/80 dark:border-orange-900/40 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 border-b border-orange-100 dark:border-orange-900/30 bg-orange-50/80 dark:bg-orange-950/40">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-orange-600" />
            <span className="font-bold text-sm text-foreground">Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-orange-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {unreadCount} new
              </Badge>
            )}
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="text-xs text-orange-600 hover:text-orange-700 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="max-h-[340px] overflow-y-auto divide-y divide-border/40">
          {isLoading ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center space-y-1">
              <Bell className="h-8 w-8 text-orange-600/40 mx-auto mb-2" />
              <p className="font-semibold text-sm text-foreground">No notifications</p>
              <p className="text-xs text-muted-foreground">You are all caught up!</p>
            </div>
          ) : (
            notifications.slice(0, 10).map((item) => {
              const formattedTime = new Date(item.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={item._id}
                  onClick={() => !item.isRead && markAsRead(item._id)}
                  className={`p-3 transition-colors cursor-pointer flex items-start gap-3 text-xs ${
                    item.isRead
                      ? "bg-background opacity-80 hover:bg-muted/40"
                      : "bg-orange-500/5 dark:bg-orange-950/20 font-medium hover:bg-orange-500/10"
                  }`}
                >
                  <div className={`p-2 rounded-full shrink-0 mt-0.5 ${
                    item.type === "APPLICATION"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : item.type === "JOB"
                      ? "bg-orange-500/10 text-orange-600"
                      : "bg-blue-500/10 text-blue-600"
                  }`}>
                    {item.type === "APPLICATION" ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : item.type === "JOB" ? (
                      <Briefcase className="h-3.5 w-3.5" />
                    ) : (
                      <Info className="h-3.5 w-3.5" />
                    )}
                  </div>

                  <div className="flex-1 space-y-0.5 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-foreground truncate">{item.title}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{formattedTime}</span>
                    </div>
                    <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                  </div>

                  {!item.isRead && (
                    <span className="h-2 w-2 rounded-full bg-orange-600 shrink-0 mt-1" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Link */}
        <div className="p-2 border-t border-border/40 text-center bg-muted/20">
          <Link
            href="/worker/notifications"
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 inline-block py-1"
          >
            View All Notifications
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default WorkerNotificationMenu;
