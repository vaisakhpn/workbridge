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
  date: string;
  time: string;
  status?: string;
}

interface UpcomingJobsProps {
  jobs?: UpcomingJobItem[];
}

const defaultUpcomingJobs: UpcomingJobItem[] = [
  {
    id: "1",
    title: "Wedding Catering Assistant",
    location: "Kozhikode",
    date: "Tomorrow",
    time: "9:00 AM",
    status: "Confirmed",
  },
  {
    id: "2",
    title: "Birthday Event Setup",
    location: "Malappuram",
    date: "Friday",
    time: "11:30 AM",
    status: "Confirmed",
  },
];

export function UpcomingJobs({ jobs = defaultUpcomingJobs }: UpcomingJobsProps) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 rounded-lg p-1.5 text-primary">
            <Briefcase className="h-4 w-4" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            Upcoming Jobs
          </h3>
        </div>

        <Button variant="ghost" size="sm" asChild>
          <Link href="/worker/jobs">View All</Link>
        </Button>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-border rounded-xl">
          <p className="text-sm font-medium text-muted-foreground">
            No upcoming jobs scheduled
          </p>
          <Button variant="outline" size="xs" className="mt-3" asChild>
            <Link href="/worker/jobs">Find Work Now</Link>
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
                <h4 className="font-semibold text-foreground text-sm">{job.title}</h4>
                {job.status && (
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-200 text-[10px]">
                    {job.status}
                  </Badge>
                )}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="text-primary h-3.5 w-3.5" />
                  {job.location}
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
