"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { getCurrentPageTitle, type NavigationItem } from "@/constants/navigation";

import { UserMenu } from "./UserMenu";
import { MobileSidebar } from "./MobileSidebar";

interface AppHeaderProps {
  navigationItems: NavigationItem[];
}

export function AppHeader({ navigationItems }: AppHeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const pageTitle = getCurrentPageTitle(pathname);

  return (
    <>
      <header className="border-border bg-background/80 flex h-16 shrink-0 items-center justify-between border-b px-4 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-xl border lg:hidden cursor-pointer"
            title="Open Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Page Title */}
          <h1 className="text-foreground text-lg font-semibold tracking-tight">
            {pageTitle}
          </h1>
        </div>

        {/* User Menu */}
        <UserMenu />
      </header>

      <MobileSidebar
        open={open}
        onOpenChange={setOpen}
        navigationItems={navigationItems}
      />
    </>
  );
}
