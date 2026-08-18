"use client";

import { Calendar, Clock, MapPin, Building2, IndianRupee, Phone, ShieldCheck } from "lucide-react";

import Card from "@/components/ui/Card";
import type { WorkerApplication } from "@/types/application.types";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";

interface ApplicationCardProps {
  application: WorkerApplication;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const { job, status, employerContact } = application;

  const isJobCompleted = job.status === "COMPLETED" || application.attendance;
  const isAccepted = status === "ACCEPTED" || isJobCompleted;
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
    (isAccepted && (employerContact?.companyName || employerContact?.ownerName)) ||
    (typeof job.createdBy === "object" && job.createdBy?.name
      ? job.createdBy.name
      : job.category || "Event Organizer");

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

        {/* Employer Contact Details Box - ONLY displayed if application is accepted/selected */}
        {isAccepted && employerContact && (
          <div className="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Employer Contact Details</span>
            </div>

            <div className="grid gap-1 pl-5.5 text-foreground/90">
              {employerContact.ownerName && (
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-muted-foreground">Name:</span>
                  <span className="font-semibold text-foreground">{employerContact.ownerName}</span>
                </div>
              )}

              {employerContact.companyName && (
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-muted-foreground">Company:</span>
                  <span className="font-medium">{employerContact.companyName}</span>
                </div>
              )}

              {employerContact.phone && (
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="font-medium text-muted-foreground">Phone:</span>
                  <a
                    href={`tel:${employerContact.phone}`}
                    className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    <Phone className="h-3 w-3" />
                    <span>{employerContact.phone}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
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
