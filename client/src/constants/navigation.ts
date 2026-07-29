import {
  Bell,
  Briefcase,
  FileText,
  LayoutDashboard,
  Settings,
  User,
  type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export const workerNavigation: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/worker/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Profile",
    href: "/worker/profile",
    icon: User,
  },
  {
    title: "Find Jobs",
    href: "/worker/jobs",
    icon: Briefcase,
  },
  {
    title: "Applications",
    href: "/worker/applications",
    icon: FileText,
  },
  {
    title: "Notifications",
    href: "/worker/notifications",
    icon: Bell,
    badge: 2,
  },
  {
    title: "Settings",
    href: "/worker/settings",
    icon: Settings,
  },
];