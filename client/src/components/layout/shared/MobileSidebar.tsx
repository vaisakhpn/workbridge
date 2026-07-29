"use client";

import Logo from "@/components/layout/shared/Logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import type { NavigationItem } from "@/constants/navigation";

import { SidebarFooter } from "./SidebarFooter";
import { SidebarItem } from "./SidebarItem";

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  navigationItems: NavigationItem[];
}

export function MobileSidebar({
  open,
  onOpenChange,
  navigationItems,
}: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="sr-only">
          <SheetTitle font-semibold>Navigation Menu</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-border border-b p-6">
            <Logo />
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  item={item}
                  onSelect={() => onOpenChange(false)}
                />
              ))}
            </nav>
          </div>

          {/* Footer */}
          <SidebarFooter />
        </div>
      </SheetContent>
    </Sheet>
  );
}
