"use client";

import { useEffect } from "react";
import {
  Loader2,
  AlertCircle,
  BriefcaseBusiness,
  FileText,
  User,
} from "lucide-react";

import { useWorkerDashboard } from "@/hooks/useWorkerDashboard";
import { Button } from "@/components/ui/Button";

import { DashboardGreeting } from "../shared/DashboardGreeting";
import { StatsSection } from "../shared/StatsSection";

import type { StatItem } from "../shared/StatCard";

import { UpcomingJobs } from "./UpcomingJobs";
import { RecentNotifications } from "./RecentNotifications";

import { DashboardSkeleton } from "@/components/ui/skeletons";

export function WorkerDashboardContainer() {
  const { dashboardData, isLoading, error, fetchDashboard } =
    useWorkerDashboard();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error || !dashboardData) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center p-6 text-center">
        <div className="bg-destructive/10 text-destructive mb-4 rounded-full p-3">
          <AlertCircle className="h-8 w-8" />
        </div>

        <h2 className="text-xl font-bold">Unable to load dashboard</h2>

        <p className="text-muted-foreground mt-1 text-sm">
          {error || "Dashboard data could not be retrieved."}
        </p>

        <Button
          onClick={fetchDashboard}
          variant="primary"
          size="sm"
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  const { profile, stats } = dashboardData;

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
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      {/* Greeting Banner */}
      <DashboardGreeting name={profile.name} />

      {/* Real Stats Metrics */}
      <StatsSection items={statItems} columns={4} />

      {/* Bottom Grid: Upcoming Jobs & Notifications */}
      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingJobs />
        <RecentNotifications />
      </div>
    </div>
  );
}

export default WorkerDashboardContainer;
