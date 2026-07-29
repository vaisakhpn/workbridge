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
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 rounded-lg p-1.5 text-primary">
            <Briefcase className="h-4 w-4" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            Active Job Listings
          </h3>
        </div>

        <Button variant="ghost" size="sm" asChild>
          <Link href="/event-team/jobs">Manage All</Link>
        </Button>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-border rounded-xl">
          <p className="text-sm font-medium text-muted-foreground">
            No active job listings
          </p>
          <Button variant="outline" size="xs" className="mt-3" asChild>
            <Link href="/event-team/jobs/create">Post a Job</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border-border hover:bg-muted/40 rounded-xl border p-4 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-foreground text-sm">
                  {job.title}
                </h4>

                <Badge
                  variant="secondary"
                  className={
                    job.status === "OPEN"
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-200 text-[10px]"
                      : "bg-indigo-500/10 text-indigo-600 border-indigo-200 text-[10px]"
                  }
                >
                  {job.status}
                </Badge>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="text-primary h-3.5 w-3.5" />
                  {job.location}
                </div>

                <div className="flex items-center gap-1.5">
                  <Users className="text-primary h-3.5 w-3.5" />
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
