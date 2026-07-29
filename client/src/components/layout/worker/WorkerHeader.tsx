"use client";

import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/Button";

import { getCurrentPageTitle } from "@/constants/navigation";

import { UserMenu } from "@/components/layout/shared/UserMenu";
import { WorkerMobileSidebar } from "./WorkerMobileSidebar";

export function WorkerHeader() {
  const pathname = usePathname();

  return (
    <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/70 sticky top-0 z-40 flex h-16 items-center border-b px-4 backdrop-blur lg:px-8">
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <WorkerMobileSidebar />
      </div>

      {/* Page Title */}
      <div className="ml-3">
        <h1 className="text-xl font-semibold tracking-tight">
          {getCurrentPageTitle(pathname)}
        </h1>
      </div>

      {/* Right Section */}
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>

        <UserMenu />
      </div>
    </header>
  );
}
