"use client";

import { LogOut } from "lucide-react";

import { useLogout } from "@/hooks/useLogout";
import { useAuthStore } from "@/store/auth.store";

export function SidebarFooter() {
  const { user } = useAuthStore();
  const { logout } = useLogout();

  return (
    <div className="border-border border-t p-4 space-y-3">
      {/* User Account Info */}
      <div className="flex items-center gap-3 px-1">
        <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-xs uppercase">
          {user?.email ? user.email.charAt(0) : "U"}
        </div>

        <div className="space-y-0.5 overflow-hidden">
          <p className="text-foreground truncate text-xs font-semibold">
            {user?.email || "User Account"}
          </p>
          <p className="text-muted-foreground text-[11px] capitalize">
            {user?.role === "eventTeam"
              ? "Event Organizer"
              : user?.role || "User"}
          </p>
        </div>
      </div>

      {/* Logout Button with Smooth Soft Hover */}
      <button
        type="button"
        onClick={logout}
        className="w-full flex items-center justify-center gap-2 rounded-xl border border-rose-200/60 bg-rose-500/10 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-500/20 hover:border-rose-300 transition-colors duration-200 cursor-pointer"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </div>
  );
}
