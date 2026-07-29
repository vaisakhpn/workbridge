"use client";

import { useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";

import { useWorkerDashboard } from "@/hooks/useWorkerDashboard";
import { Button } from "@/components/ui/Button";

import { DashboardGreeting } from "./DashboardGreeting";
import { StatsSection } from "./StatsSection";
import { QuickActions } from "./QuickActions";
import { UpcomingJobs } from "./UpcomingJobs";
import { RecentNotifications } from "./RecentNotifications";

export function DashboardContainer() {
  const { dashboardData, isLoading, error, fetchDashboard } =
    useWorkerDashboard();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (isLoading) {
    return (
      <div className="text-muted-foreground flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <p className="text-sm font-medium">Loading your dashboard...</p>
      </div>
    );
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

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      {/* Greeting Banner */}
      <DashboardGreeting name={profile.name} />

      {/* Real Stats Metrics */}
      <StatsSection profile={profile} stats={stats} />

      {/* Quick Navigation Actions */}
      <QuickActions />

      {/* Bottom Grid: Upcoming Jobs & Notifications */}
      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingJobs />

        <RecentNotifications />
      </div>
    </div>
  );
}

export default DashboardContainer;
