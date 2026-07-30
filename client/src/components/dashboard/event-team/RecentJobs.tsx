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
  workersNeeded: number;
  applicantsCount: number;
  status: "OPEN" | "FILLED" | "COMPLETED";
}

interface RecentJobsProps {
  jobs?: JobItem[];
}

const defaultJobs: JobItem[] = [
  {
    id: "1",
    title: "Grand Wedding Catering Setup",
    location: "Kozhikode",
    workersNeeded: 8,
    applicantsCount: 12,
    status: "OPEN",
  },
  {
    id: "2",
    title: "Corporate Expo Hospitality",
    location: "Kochi",
    workersNeeded: 5,
    applicantsCount: 5,
    status: "FILLED",
  },
];

export function RecentJobs({ jobs = defaultJobs }: RecentJobsProps) {
  return (
    <Card className="p-6 bg-orange-50/60 dark:bg-orange-950/20 border-orange-200/80 dark:border-orange-900/40">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-orange-500/10 rounded-lg p-1.5 text-orange-600">
            <Briefcase className="h-4 w-4" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            Active Job Listings
          </h3>
        </div>

        <Button variant="ghost" size="sm" className="hover:bg-orange-100/60 hover:text-orange-600" asChild>
          <Link href="/event-team/jobs">Manage All</Link>
        </Button>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-orange-200 rounded-xl bg-white/60 dark:bg-black/20">
          <p className="text-sm font-medium text-muted-foreground">
            No active job listings
          </p>
          <Button variant="outline" size="xs" className="mt-3 border-orange-200 hover:bg-orange-50 hover:border-orange-400" asChild>
            <Link href="/event-team/jobs/create">Post a Job</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border-orange-200/60 bg-white/80 dark:bg-neutral-900/80 hover:bg-orange-100/50 hover:border-orange-300 rounded-xl border p-4 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-foreground text-sm">
                  {job.title}
                </h4>

                <Badge
                  variant="secondary"
                  className={
                    job.status === "OPEN"
                      ? "bg-orange-500/10 text-orange-600 border-orange-200 text-[10px]"
                      : "bg-amber-500/10 text-amber-700 border-amber-200 text-[10px]"
                  }
                >
                  {job.status}
                </Badge>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="text-orange-600 h-3.5 w-3.5" />
                  {job.location}
                </div>

                <div className="flex items-center gap-1.5">
                  <Users className="text-orange-600 h-3.5 w-3.5" />
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
