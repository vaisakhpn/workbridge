"use client";

import { StatCard, type StatItem } from "./StatCard";
import type {
  WorkerDashboardProfile,
  WorkerDashboardStats,
} from "@/types/workerDashboard.types";

interface StatsSectionProps {
  profile: WorkerDashboardProfile;
  stats: WorkerDashboardStats;
}

export function StatsSection({ profile, stats }: StatsSectionProps) {
  const statItems: StatItem[] = [
    {
      title: "Jobs Applied",
      value: stats.jobsApplied,
      description: "Total applications submitted",
      iconName: "applied",
    },
    {
      title: "Pending Applications",
      value: stats.pending,
      description: "Under review by organizers",
      iconName: "pending",
    },
    {
      title: "Accepted Applications",
      value: stats.accepted,
      description: "Confirmed bookings",
      iconName: "accepted",
    },
    {
      title: "Completed Jobs",
      value: profile.jobsCompleted,
      description: `Rating: ${profile.rating ? profile.rating.toFixed(1) : "0.0"} / 5.0`,
      iconName: "rating",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statItems.map((item) => (
        <StatCard key={item.title} {...item} />
      ))}
    </section>
  );
}
