"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Loader2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { useManageJobs } from "@/hooks/useManageJobs";

import { JobFilters } from "./JobFilters";
import { JobCard } from "./JobCard";
import { EmptyState } from "./EmptyState";

import { ManageJobsSkeleton } from "@/components/ui/skeletons";

export function ManageJobsContainer() {
  const {
    jobs,
    totalJobsCount,
    searchQuery,
    statusFilter,
    isLoading,
    error,
    fetchJobs,
    closeJob,
    setSearchQuery,
    setStatusFilter,
  } = useManageJobs();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (isLoading || (!jobs && !error)) {
    return <ManageJobsSkeleton />;
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center p-6 text-center">
        <div className="bg-destructive/10 text-destructive mb-4 rounded-full p-3">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold">Unable to load jobs</h2>
        <p className="text-muted-foreground mt-1 text-sm">{error}</p>
        <Button
          onClick={fetchJobs}
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
    <div className="mx-auto max-w-7xl space-y-6 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Manage Jobs
          </h1>
          <p className="text-sm text-muted-foreground">
            Create and manage all your event job postings.
          </p>
        </div>

        <Button variant="primary" size="md" className="gap-2 shadow-xs" asChild>
          <Link href="/event-team/jobs/create">
            <PlusCircle size={18} />
            Create Job
          </Link>
        </Button>
      </div>

      {/* Filter Bar */}
      {totalJobsCount > 0 && (
        <JobFilters
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          onSearchChange={setSearchQuery}
          onStatusChange={setStatusFilter}
        />
      )}

      {/* Jobs Grid or Empty State */}
      {jobs.length === 0 ? (
        <EmptyState isFiltered={totalJobsCount > 0} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} onCloseJob={closeJob} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageJobsContainer;
