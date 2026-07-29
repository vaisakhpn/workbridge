"use client";

import { Menu } from "lucide-react";

import Button from "@/components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Logo from "@/components/layout/shared/Logo";
import { workerNavigation } from "@/constants/navigation";

import { SidebarFooter } from "./SidebarFooter";
import { SidebarItem } from "./SidebarItem";

export function WorkerMobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex w-72 flex-col p-0">
        <div className="border-border border-b p-6">
          <Logo />
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {workerNavigation.map((item) => (
            <SidebarItem key={item.href} item={item} />
          ))}
        </nav>

        <SidebarFooter />
      </SheetContent>
    </Sheet>
  );
}
