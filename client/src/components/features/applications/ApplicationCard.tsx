"use client";

import { Calendar, Clock, MapPin, Building2, IndianRupee } from "lucide-react";

import Card from "@/components/ui/Card";
import type { WorkerApplication } from "@/types/application.types";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";

interface ApplicationCardProps {
  application: WorkerApplication;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const { job, status } = application;

  const isJobCompleted = job.status === "COMPLETED" || application.attendance;
  const displayStatus = isJobCompleted ? "COMPLETED" : status;

  // Format Date cleanly (e.g., "Jul 30, 2026")
  const formattedDate = job.date
    ? new Date(job.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Flexible";

  const organizerName =
    typeof job.createdBy === "object" && job.createdBy?.name
      ? job.createdBy.name
      : job.category || "Event Organizer";

  return (
    <Card className="flex flex-col justify-between p-6 transition-all duration-200 hover:shadow-md border-border/80">
      <div className="space-y-4">
        {/* Top Header Row: Job Title & Status Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
              {job.title}
            </h3>

            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Building2 className="text-primary h-3.5 w-3.5 shrink-0" />
              <span>{organizerName}</span>
            </div>
          </div>

          <ApplicationStatusBadge status={displayStatus} />
        </div>

        {/* Details Grid */}
        <div className="grid gap-2 pt-1 text-xs text-muted-foreground">
          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="text-primary h-4 w-4 shrink-0" />
            <span className="font-medium text-foreground">
              {job.location && job.district
                ? `${job.location}, ${job.district}`
                : job.location || job.district}
            </span>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Calendar className="text-primary h-3.5 w-3.5 shrink-0" />
              <span>{formattedDate}</span>
            </div>

            {job.startTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="text-primary h-3.5 w-3.5 shrink-0" />
                <span>
                  {job.startTime} {job.endTime ? `• ${job.endTime}` : ""}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer: Pay Rate */}
      <div className="border-border/60 mt-5 flex items-center justify-between border-t pt-4">
        <span className="text-xs font-medium text-muted-foreground">
          Daily Rate
        </span>

        <div className="flex items-center text-base font-bold text-emerald-600">
          <IndianRupee className="h-4 w-4" />
          <span>{job.salary}</span>
          <span className="ml-0.5 text-xs font-normal text-muted-foreground">
            /day
          </span>
        </div>
      </div>
    </Card>
  );
}
