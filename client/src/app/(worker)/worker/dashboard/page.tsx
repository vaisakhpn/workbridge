import { DashboardGreeting } from "@/components/dashboard/DashboardGreeting";
import { StatsSection } from "@/components/dashboard/StatsSection";
import { QuickActions } from "@/components/dashboard/QuickActions";
import type { StatItem } from "@/components/dashboard/StatCard";
import { UpcomingJobs } from "@/components/dashboard/UpcomingJobs";
import { RecentNotifications } from "@/components/dashboard/RecentNotifications";

const stats: StatItem[] = [
  {
    title: "Applied Jobs",
    value: 12,
    description: "+2 this week",
    iconName: "briefcase",
  },
  {
    title: "Active Applications",
    value: 5,
    description: "In review process",
    iconName: "file",
  },
  {
    title: "Completed Jobs",
    value: 28,
    description: "Total finished tasks",
    iconName: "check",
  },
  {
    title: "Average Rating",
    value: "4.9",
    description: "Out of 5 stars",
    iconName: "star",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardGreeting />

      <StatsSection stats={stats} />

      <QuickActions />
      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingJobs />

        <RecentNotifications />
      </div>
    </div>
  );
}
