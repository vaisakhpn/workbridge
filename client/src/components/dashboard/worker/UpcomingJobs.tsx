"use client";

import Link from "next/link";
import { CalendarDays, Clock, MapPin, Briefcase } from "lucide-react";

import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";

interface UpcomingJobItem {
  id: string | number;
  title: string;
  location: string;
  district?: string;
  date: string;
  time: string;
  status?: string;
}

interface UpcomingJobsProps {
  jobs?: UpcomingJobItem[];
}

const defaultUpcomingJobs: UpcomingJobItem[] = [];

export function UpcomingJobs({
  jobs = defaultUpcomingJobs,
}: UpcomingJobsProps) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary rounded-lg p-1.5">
            <Briefcase className="h-4 w-4" />
          </div>
          <h3 className="text-foreground text-base font-semibold">
            Upcoming Jobs
          </h3>
        </div>

        <Button variant="ghost" size="sm" asChild>
          <Link href="/worker/jobs">View All</Link>
        </Button>
      </div>

      {jobs.length === 0 ? (
        <div className="border-border flex flex-col items-center justify-center rounded-xl border border-dashed py-8 text-center">
          <p className="text-muted-foreground text-sm font-medium">
            No upcoming jobs scheduled
          </p>
          <Button variant="outline" size="xs" className="mt-3" asChild>
            <Link href="/jobs/search">Find Work Now</Link>
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
                <h4 className="text-foreground text-sm font-semibold">
                  {job.title}
                </h4>
                {job.status && (
                  <Badge
                    variant="secondary"
                    className="border-emerald-200 bg-emerald-500/10 text-[10px] text-emerald-600"
                  >
                    {job.status}
                  </Badge>
                )}
              </div>

              <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <MapPin className="text-primary h-3.5 w-3.5" />
                  <span>
                    {job.location && job.district
                      ? `${job.location}, ${job.district}`
                      : job.location || job.district}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <CalendarDays className="text-primary h-3.5 w-3.5" />
                  {job.date}
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="text-primary h-3.5 w-3.5" />
                  {job.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
