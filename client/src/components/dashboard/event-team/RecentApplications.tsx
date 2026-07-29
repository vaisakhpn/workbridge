"use client";

import Link from "next/link";
import { Users, Clock } from "lucide-react";

import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface RecentApplicationItem {
  id: string | number;
  workerName: string;
  jobTitle: string;
  appliedTime: string;
}

interface RecentApplicationsProps {
  applications?: RecentApplicationItem[];
}

const defaultApplications: RecentApplicationItem[] = [
  {
    id: "1",
    workerName: "Vaisakh P N",
    jobTitle: "Wedding Catering Assistant",
    appliedTime: "10 mins ago",
  },
  {
    id: "2",
    workerName: "Rahul Kumar",
    jobTitle: "Stage Setup Crew",
    appliedTime: "1 hour ago",
  },
  {
    id: "3",
    workerName: "Anjali M",
    jobTitle: "Reception Hostess",
    appliedTime: "3 hours ago",
  },
];

export function RecentApplications({
  applications = defaultApplications,
}: RecentApplicationsProps) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-sky-500/10 rounded-lg p-1.5 text-sky-600">
            <Users className="h-4 w-4" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            Recent Applications
          </h3>
        </div>

        <Button variant="ghost" size="sm" asChild>
          <Link href="/event-team/applications">View All</Link>
        </Button>
      </div>

      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-border rounded-xl">
          <p className="text-sm font-medium text-muted-foreground">
            No pending applications
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="border-border hover:bg-muted/40 flex items-center justify-between rounded-xl border p-4 transition-colors"
            >
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground text-sm">
                  {app.workerName}
                </h4>
                <p className="text-xs text-muted-foreground">{app.jobTitle}</p>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                <Clock className="h-3.5 w-3.5" />
                <span>{app.appliedTime}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
