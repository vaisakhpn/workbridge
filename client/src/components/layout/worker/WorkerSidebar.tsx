"use client";

import Logo from "@/components/layout/shared/Logo";
import { ScrollArea } from "@/components/ui/scroll-area";

import { workerNavigation } from "@/constants/navigation";

import { SidebarFooter } from "./SidebarFooter";
import { SidebarItem } from "./SidebarItem";

export function WorkerSidebar() {
  return (
    <aside className="border-border bg-background hidden h-screen w-72 shrink-0 flex-col border-r lg:flex">
      {/* Logo */}
      <div className="border-border border-b p-6">
        <Logo />
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {workerNavigation.map((item) => (
            <SidebarItem key={item.href} item={item} />
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <SidebarFooter />
    </aside>
  );
}
