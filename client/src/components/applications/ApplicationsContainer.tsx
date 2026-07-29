"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Users,
  FileText,
  Loader2,
  AlertCircle,
} from "lucide-react";

import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useJobApplications } from "@/hooks/useJobApplications";

import { ApplicationFilters } from "./ApplicationFilters";
import { ApplicationCard } from "./ApplicationCard";
import { WorkerProfileModal } from "./WorkerProfileModal";
import { EmptyApplications } from "./EmptyApplications";

interface ApplicationsContainerProps {
  jobId: string;
}

export function ApplicationsContainer({ jobId }: ApplicationsContainerProps) {
  const {
    job,
    applications,
    totalCount,
    searchQuery,
    statusFilter,
    selectedWorkerModal,
    isLoading,
    error,
    fetchApplicationsData,
    updateStatus,
    setSearchQuery,
    setStatusFilter,
    setSelectedWorkerModal,
  } = useJobApplications(jobId);

  if (isLoading) {
    return (
      <div className="text-muted-foreground flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <p className="text-sm font-medium">Loading applicants...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center p-6 text-center">
        <div className="bg-destructive/10 text-destructive mb-4 rounded-full p-3">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold">Unable to load job applications</h2>
        <p className="text-muted-foreground mt-1 text-sm">{error}</p>
        <Button
          onClick={fetchApplicationsData}
          variant="primary"
          size="sm"
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  const formattedDate = new Date(job.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-16">
      {/* Back Link */}
      <div>
        <Link
          href="/event-team/jobs"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Manage Jobs
        </Link>
      </div>

      {/* Job Summary Banner Card */}
      <Card className="p-6 bg-card border-border/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                {job.category}
              </span>
            </div>

            <h1 className="text-xl font-bold text-foreground sm:text-2xl mt-1">
              {job.title}
            </h1>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={16} className="text-primary shrink-0" />
            <div>
              <p className="font-medium text-foreground">{formattedDate}</p>
              <p className="text-[11px]">Event Date</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Users size={16} className="text-primary shrink-0" />
            <div>
              <p className="font-medium text-foreground">
                {job.workersNeeded} Workers Needed
              </p>
              <p className="text-[11px]">Worker Quota</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground col-span-2 sm:col-span-1">
            <FileText size={16} className="text-primary shrink-0" />
            <div>
              <p className="font-medium text-foreground">
                {totalCount} Total Applicants
              </p>
              <p className="text-[11px]">Applications Submitted</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Filter Bar */}
      {totalCount > 0 && (
        <ApplicationFilters
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          onSearchChange={setSearchQuery}
          onStatusChange={setStatusFilter}
        />
      )}

      {/* Applicant Cards Grid or Empty State */}
      {applications.length === 0 ? (
        <EmptyApplications isFiltered={totalCount > 0} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <ApplicationCard
              key={app._id}
              application={app}
              onViewProfile={setSelectedWorkerModal}
              onAccept={(appId) => updateStatus(appId, "ACCEPTED")}
              onReject={(appId) => updateStatus(appId, "REJECTED")}
            />
          ))}
        </div>
      )}

      {/* Worker Detailed Profile Modal */}
      <WorkerProfileModal
        application={selectedWorkerModal}
        onClose={() => setSelectedWorkerModal(null)}
        onAccept={(appId) => updateStatus(appId, "ACCEPTED")}
        onReject={(appId) => updateStatus(appId, "REJECTED")}
      />
    </div>
  );
}

export default ApplicationsContainer;
