"use client";

import type {
  WorkerApplication,
  ApplicationFilterStatus,
} from "@/types/application.types";
import { ApplicationCard } from "./ApplicationCard";
import { EmptyApplications } from "./EmptyApplications";

interface ApplicationsGridProps {
  applications: WorkerApplication[];
  filterStatus: ApplicationFilterStatus;
}

export function ApplicationsGrid({
  applications,
  filterStatus,
}: ApplicationsGridProps) {
  if (applications.length === 0) {
    return <EmptyApplications filterStatus={filterStatus} />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {applications.map((application) => (
        <ApplicationCard key={application._id} application={application} />
      ))}
    </div>
  );
}
