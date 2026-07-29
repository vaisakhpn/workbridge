"use client";

import { LogOut } from "lucide-react";

import Button from "@/components/ui/Button";

interface SidebarFooterProps {
  onLogout?: () => void;
}

export function SidebarFooter({ onLogout }: SidebarFooterProps) {
  return (
    <div className="border-border border-t p-4">
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={onLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}
