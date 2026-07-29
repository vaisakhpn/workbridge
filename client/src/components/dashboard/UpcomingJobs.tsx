"use client";

import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const upcomingJobs = [
  {
    id: 1,
    title: "Wedding Catering",
    location: "Kozhikode",
    date: "Tomorrow",
    time: "9:00 AM",
  },
  {
    id: 2,
    title: "Birthday Event",
    location: "Malappuram",
    date: "Friday",
    time: "11:30 AM",
  },
];

export function UpcomingJobs() {
  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Upcoming Jobs</h2>

        <Button variant="ghost" size="sm" asChild>
          <Link href="/worker/jobs">View All</Link>
        </Button>
      </div>

      <div className="space-y-4">
        {upcomingJobs.map((job) => (
          <div
            key={job.id}
            className="border-border hover:bg-muted/40 rounded-lg border p-4 transition-colors"
          >
            <h3 className="font-medium">{job.title}</h3>

            <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center gap-1.5">
                <MapPin className="text-primary h-4 w-4" />
                {job.location}
              </div>

              <div className="flex items-center gap-1.5">
                <CalendarDays className="text-primary h-4 w-4" />
                {job.date}
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="text-primary h-4 w-4" />
                {job.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
