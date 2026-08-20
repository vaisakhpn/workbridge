"use client";

import Link from "next/link";
import { Briefcase, MapPin, Users } from "lucide-react";

import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";

interface JobItem {
  id: string | number;
  title: string;
  location: string;
  district?: string;
  workersNeeded: number;
  applicantsCount: number;
  status: "OPEN" | "FILLED" | "COMPLETED";
}

interface RecentJobsProps {
  jobs?: JobItem[];
}

const defaultJobs: JobItem[] = [];

export function RecentJobs({ jobs = defaultJobs }: RecentJobsProps) {
  return (
    <Card className="border-orange-200/80 bg-orange-50/60 p-6 dark:border-orange-900/40 dark:bg-orange-950/20">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-orange-500/10 p-1.5 text-orange-600">
            <Briefcase className="h-4 w-4" />
          </div>
          <h3 className="text-foreground text-base font-semibold">
            Active Job Listings
          </h3>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-orange-100/60 hover:text-orange-600"
          asChild
        >
          <Link href="/event-team/jobs">Manage All</Link>
        </Button>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-orange-200 bg-white/60 py-8 text-center dark:bg-black/20">
          <p className="text-muted-foreground text-sm font-medium">
            No active job listings
          </p>
          <Button
            variant="outline"
            size="xs"
            className="mt-3 border-orange-200 hover:border-orange-400 hover:bg-orange-50"
            asChild
          >
            <Link href="/event-team/jobs/create">Post a Job</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border border-orange-200/60 bg-white/80 p-4 transition-colors hover:border-orange-300 hover:bg-orange-100/50 dark:bg-neutral-900/80"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-foreground text-sm font-semibold">
                  {job.title}
                </h4>

                <Badge
                  variant="secondary"
                  className={
                    job.status === "OPEN"
                      ? "border-orange-200 bg-orange-500/10 text-[10px] text-orange-600"
                      : "border-amber-200 bg-amber-500/10 text-[10px] text-amber-700"
                  }
                >
                  {job.status}
                </Badge>
              </div>

              <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-orange-600" />
                  <span>
                    {job.location && job.district
                      ? `${job.location}, ${job.district}`
                      : job.location || job.district}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-orange-600" />
                  <span>
                    {job.applicantsCount} / {job.workersNeeded} Applicants
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
