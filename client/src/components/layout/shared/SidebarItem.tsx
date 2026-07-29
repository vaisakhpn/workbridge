"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavigationItem } from "@/constants/navigation";

interface SidebarItemProps {
  item: NavigationItem;
  onSelect?: () => void;
}

export function SidebarItem({ item, onSelect }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.href);

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onSelect}
      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-primary/10 text-primary font-semibold shadow-2xs"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
        <span>{item.title}</span>
      </div>

      {item.badge && (
        <span
          className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
            isActive
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}
