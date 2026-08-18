"use client";

import { useEffect } from "react";
import {
  Loader2,
  AlertCircle,
  PlusCircle,
  BriefcaseBusiness,
  Users,
  Building2,
} from "lucide-react";

import { useEventTeamDashboard } from "@/hooks/useEventTeamDashboard";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/Button";

import { DashboardGreeting } from "../shared/DashboardGreeting";
import { StatsSection } from "../shared/StatsSection";

import type { StatItem } from "../shared/StatCard";

import { RecentApplications } from "./RecentApplications";
import { RecentJobs } from "./RecentJobs";

import { DashboardSkeleton } from "@/components/ui/skeletons";

export function EventTeamDashboardContainer() {
  const { user } = useAuthStore();
  const { dashboardData, isLoading, error, fetchDashboard } =
    useEventTeamDashboard();

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
          {error || "Employer dashboard data could not be retrieved."}
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

  const { stats } = dashboardData;

  const statItems: StatItem[] = [
    {
      title: "Total Jobs Posted",
      value: stats.jobsPosted,
      description: "All job listings created",
      iconName: "posted",
    },
    {
      title: "Open Listings",
      value: stats.openJobs,
      description: "Active & accepting workers",
      iconName: "open",
    },
    {
      title: "Filled Jobs",
      value: stats.filledJobs,
      description: "Required worker quota met",
      iconName: "filled",
    },
    {
      title: "Completed Jobs",
      value: stats.completedJobs,
      description: "Finished shifts & gigs",
      iconName: "completed",
    },
    {
      title: "Total Applicants",
      value: stats.totalApplicants,
      description: "Applications across all jobs",
      iconName: "applicants",
    },
    {
      title: "Pending Applications",
      value: stats.pendingApplications,
      description: "Awaiting your review",
      iconName: "pending",
    },
    {
      title: "Accepted Workers",
      value: stats.acceptedWorkers,
      description: "Confirmed worker hires",
      iconName: "accepted",
    },
    {
      title: "Rejected Applications",
      value: stats.rejectedWorkers,
      description: "Unsuccessful applicants",
      iconName: "rejected",
    },
  ];

  const displayName = user?.email ? user.email.split("@")[0] : "Organizer";

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      {/* Greeting Header */}
      <DashboardGreeting
        name={displayName}
        roleDescription="Welcome to your Employer command center. Manage your job listings & worker applications."
      />

      {/* Real Stats Metrics Grid */}
      <StatsSection items={statItems} columns={4} />

      {/* Bottom Grid: Recent Applications & Active Jobs */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentApplications />
        <RecentJobs />
      </div>
    </div>
  );
}

export default EventTeamDashboardContainer;
