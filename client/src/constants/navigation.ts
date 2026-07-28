import {
  Bell,
  Briefcase,
  FileText,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";

export const workerNavigation = [
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
  },
  {
    title: "Settings",
    href: "/worker/settings",
    icon: Settings,
  },
] as const;
