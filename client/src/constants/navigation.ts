import {
  Bell,
  BriefcaseBusiness,
  Building2,
  FileText,
  LayoutDashboard,
  PlusCircle,
  User,
  Users,
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
];

export const eventTeamNavigation: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/event-team/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Company Profile",
    href: "/event-team/profile",
    icon: Building2,
  },
  {
    title: "Create Job",
    href: "/event-team/jobs/create",
    icon: PlusCircle,
  },
  {
    title: "Manage Jobs",
    href: "/event-team/jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "Applications",
    href: "/event-team/applications",
    icon: Users,
  },
  {
    title: "Notifications",
    href: "/event-team/notifications",
    icon: Bell,
  },
];

export function getCurrentPageTitle(pathname: string): string {
  const allNavigation = [...workerNavigation, ...eventTeamNavigation];
  const sortedNav = [...allNavigation].sort(
    (a, b) => b.href.length - a.href.length
  );
  const page = sortedNav.find((item) => pathname.startsWith(item.href));

  return page?.title ?? "Bincoz";
}
