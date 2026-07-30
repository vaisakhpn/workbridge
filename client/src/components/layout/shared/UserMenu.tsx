"use client";

import { LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth/auth.service";

export function UserMenu() {
  const router = useRouter();
  const { user, logout: logoutStore } = useAuthStore();

  if (!user) {
    return null;
  }

  const displayName =
    user.companyName || user.name || (user.email ? user.email.split("@")[0] : "User");

  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const roleLabel =
    user.role === "eventTeam"
      ? "Event Organizer"
      : user.role === "admin"
      ? "Admin"
      : "Worker";

  const dashboardPath =
    user.role === "eventTeam"
      ? "/event-team/dashboard"
      : user.role === "admin"
      ? "/admin/dashboard"
      : "/worker/dashboard";

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout API error:", err);
    } finally {
      logoutStore();
      toast.success("Logged out successfully");
      router.push("/");
    }
  };

  const handleDashboardClick = () => {
    router.push(dashboardPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-full border-2 border-orange-500/40 p-0.5 hover:border-orange-500 transition-all cursor-pointer focus:outline-none"
        >
          <Avatar className="h-full w-full rounded-full">
            {user.avatar && (
              <AvatarImage
                src={user.avatar}
                alt={displayName}
                className="object-cover rounded-full"
              />
            )}
            <AvatarFallback className="bg-orange-500/10 text-orange-600 font-bold flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-orange-600" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 p-2 shadow-xl border-border/80">
        <DropdownMenuLabel className="p-2">
          <div className="flex flex-col space-y-1">
            <span className="font-semibold text-sm text-foreground line-clamp-1">
              {displayName}
            </span>
            <span className="text-muted-foreground text-xs truncate">
              {user.email}
            </span>
            <span className="mt-1 inline-flex w-fit items-center rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-orange-600 border border-orange-200">
              {roleLabel}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          onClick={handleDashboardClick}
          className="cursor-pointer py-2 px-2 text-sm font-medium hover:bg-orange-50 dark:hover:bg-orange-950/20"
        >
          <LayoutDashboard className="mr-2 h-4 w-4 text-orange-600" />
          <span>Dashboard</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer py-2 px-2 text-sm font-medium text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
