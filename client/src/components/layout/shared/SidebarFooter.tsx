"use client";

import { LogOut } from "lucide-react";

import { useLogout } from "@/hooks/useLogout";
import { useAuthStore } from "@/store/auth.store";

export function SidebarFooter() {
  const { user } = useAuthStore();
  const { logout } = useLogout();

  return (
    <div className="border-border border-t p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5 overflow-hidden pr-2">
          <p className="text-foreground truncate text-sm font-medium">
            {user?.email || "Account"}
          </p>
          <p className="text-muted-foreground text-xs capitalize">
            {user?.role || "user"}
          </p>
        </div>

        <button
          type="button"
          onClick={logout}
          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive flex h-9 w-9 items-center justify-center rounded-xl transition-colors cursor-pointer"
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
