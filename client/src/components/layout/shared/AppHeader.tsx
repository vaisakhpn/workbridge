"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, Home } from "lucide-react";

import { getCurrentPageTitle, type NavigationItem } from "@/constants/navigation";
import { Button } from "@/components/ui/Button";

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

        {/* Header Actions: Home Button & User Menu */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-1.5 font-semibold text-muted-foreground hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/20"
          >
            <Link href="/">
              <Home className="h-4 w-4 text-orange-600" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </Button>

          <UserMenu />
        </div>
      </header>

      <MobileSidebar
        open={open}
        onOpenChange={setOpen}
        navigationItems={navigationItems}
      />
    </>
  );
}
