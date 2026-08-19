"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  FileText,
  Loader2,
  AlertCircle,
  Layers,
} from "lucide-react";

import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useJobApplications } from "@/hooks/useJobApplications";
import { JobStatusBadge } from "@/components/jobs/manage/JobStatusBadge";

import { ApplicationFilters } from "./ApplicationFilters";
import { ApplicationCard } from "./ApplicationCard";
import { WorkerProfileModal } from "./WorkerProfileModal";
import { EmptyApplications } from "./EmptyApplications";

import { ApplicationsSkeleton } from "@/components/ui/skeletons";

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

  if (isLoading || (!job && !error)) {
    return <ApplicationsSkeleton />;
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

  const formattedDate = job?.date
    ? new Date(job.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

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

      {/* Header Info Banner */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Layers size={12} />
                {job.category}
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Applications for {job.title}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Review and manage worker applications for this job position.
            </p>
          </div>

          <JobStatusBadge status={job.status} />
        </div>

        {/* Quick Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={16} className="text-primary shrink-0" />
            <div>
              <p className="font-medium text-foreground">{job.location}</p>
              <p className="text-[11px]">{job.district}</p>
            </div>
          </div>

          {formattedDate && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar size={16} className="text-primary shrink-0" />
              <div>
                <p className="font-medium text-foreground">{formattedDate}</p>
                <p className="text-[11px]">Event Date</p>
              </div>
            </div>
          )}

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
