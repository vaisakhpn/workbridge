"use client";

import { useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";

import { useWorkerApplications } from "@/hooks/useWorkerApplications";
import { Button } from "@/components/ui/Button";

import { ApplicationsFilter } from "./ApplicationsFilter";
import { ApplicationsGrid } from "./ApplicationsGrid";
import { ApplicationsSkeleton } from "@/components/ui/skeletons";

export function ApplicationsContainer() {
  const {
    filteredApplications,
    filterStatus,
    counts,
    isLoading,
    error,
    fetchApplications,
    handleFilterChange,
  } = useWorkerApplications();

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  if (isLoading || (!filteredApplications && !error)) {
    return <ApplicationsSkeleton />;
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center p-6 text-center">
        <div className="bg-destructive/10 text-destructive mb-4 rounded-full p-3">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold">Unable to load applications</h2>
        <p className="text-muted-foreground mt-1 text-sm">{error}</p>
        <Button
          onClick={fetchApplications}
          variant="primary"
          size="sm"
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      {/* Header Banner */}
      <section className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          My Applications
        </h1>
        <p className="text-sm text-muted-foreground">
          Track all your job applications and status updates
        </p>
      </section>

      {/* Filter Tabs Bar */}
      <ApplicationsFilter
        currentFilter={filterStatus}
        counts={counts}
        onFilterChange={handleFilterChange}
      />

      {/* Applications Grid */}
      <ApplicationsGrid
        applications={filteredApplications}
        filterStatus={filterStatus}
      />
    </div>
  );
}

export default ApplicationsContainer;
