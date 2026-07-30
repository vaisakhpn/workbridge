"use client";

import { User, Users } from "lucide-react";
import { cn } from "@/utils/cn";

export type SignupRole = "worker" | "eventTeam";

interface RoleToggleProps {
  activeRole: SignupRole;
  onChangeRole: (role: SignupRole) => void;
}

export default function RoleToggle({
  activeRole,
  onChangeRole,
}: RoleToggleProps) {
  return (
    <div className="flex items-center justify-center p-1.5 rounded-full bg-slate-100/90 dark:bg-neutral-800/90 border border-slate-200/80 dark:border-neutral-700/80 w-full max-w-xs sm:max-w-sm mx-auto mb-6">
      <button
        type="button"
        onClick={() => onChangeRole("worker")}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-2 px-3 sm:px-4 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200",
          activeRole === "worker"
            ? "bg-orange-600 text-white shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <User className="h-4 w-4 shrink-0" />
        <span>I want to Work</span>
      </button>

      <button
        type="button"
        onClick={() => onChangeRole("eventTeam")}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-2 px-3 sm:px-4 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200",
          activeRole === "eventTeam"
            ? "bg-orange-600 text-white shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Users className="h-4 w-4 shrink-0" />
        <span>I want to Hire</span>
      </button>
    </div>
  );
}
