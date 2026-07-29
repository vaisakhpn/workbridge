"use client";

import { Calendar, MapPin, Users, IndianRupee, Layers, FileText } from "lucide-react";

import Card from "@/components/ui/Card";
import type { Job } from "@/types/job.types";

import { JobStatusBadge } from "./JobStatusBadge";
import { JobActions } from "./JobActions";

interface JobCardProps {
  job: Job;
  onCloseJob: (jobId: string) => Promise<void>;
}

export function JobCard({ job, onCloseJob }: JobCardProps) {
  const formattedDate = new Date(job.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const createdDate = new Date(job.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-all duration-200 border-border/80">
      <div className="space-y-3">
        {/* Header: Title, Category & Status Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">
              <Layers size={12} />
              {job.category}
            </span>

            <h3 className="text-base font-bold text-foreground line-clamp-1">
              {job.title}
            </h3>
          </div>

          <JobStatusBadge status={job.status} />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-muted-foreground pt-1">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-primary shrink-0" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <MapPin size={14} className="text-primary shrink-0" />
            <span className="truncate">{job.location}, {job.district}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-primary shrink-0" />
            <span>{job.workersNeeded} Workers Needed</span>
          </div>

          <div className="flex items-center gap-1.5 font-semibold text-foreground">
            <IndianRupee size={14} className="text-emerald-600 shrink-0" />
            <span>₹{job.salary} per worker</span>
          </div>
        </div>

        {/* Applications Count & Created Date */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/40">
          <div className="flex items-center gap-1 font-medium text-foreground">
            <FileText size={13} className="text-primary" />
            <span>Applications: {job.applicationsCount || 0}</span>
          </div>

          <span>Created {createdDate}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <JobActions
        jobId={job._id}
        status={job.status}
        onCloseJob={onCloseJob}
      />
    </Card>
  );
}
