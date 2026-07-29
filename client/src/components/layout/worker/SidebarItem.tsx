"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/constants/navigation";

interface SidebarItemProps {
  item: NavigationItem;
}

export function SidebarItem({ item }: SidebarItemProps) {
  const pathname = usePathname();

  const active = pathname === item.href;

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5" />

        <span>{item.title}</span>
      </div>

      {item.badge ? <Badge>{item.badge}</Badge> : null}
    </Link>
  );
}
