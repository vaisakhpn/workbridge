"use client";

import Logo from "@/components/layout/shared/Logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { NavigationItem } from "@/constants/navigation";

import { SidebarFooter } from "./SidebarFooter";
import { SidebarItem } from "./SidebarItem";

interface AppSidebarProps {
  navigationItems: NavigationItem[];
}

export function AppSidebar({ navigationItems }: AppSidebarProps) {
  return (
    <aside className="border-border bg-background hidden h-screen w-72 shrink-0 flex-col border-r lg:flex">
      {/* Logo */}
      <div className="border-border border-b p-6">
        <Logo />
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <SidebarItem key={item.href} item={item} />
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <SidebarFooter />
    </aside>
  );
}
