"use client";

import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface UpcomingJobItem {
  id: string | number;
  title: string;
  location: string;
  date: string;
  time: string;
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
  },
  {
    id: "2",
    title: "Birthday Event Setup",
    location: "Malappuram",
    date: "Friday",
    time: "11:30 AM",
  },
];

export function UpcomingJobs({ jobs = defaultUpcomingJobs }: UpcomingJobsProps) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">
          Upcoming Jobs
        </h3>

        <Button variant="ghost" size="sm" asChild>
          <Link href="/worker/jobs">View All</Link>
        </Button>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border-border hover:bg-muted/40 rounded-lg border p-4 transition-colors"
          >
            <h4 className="font-medium text-foreground">{job.title}</h4>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
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
    </Card>
  );
}
