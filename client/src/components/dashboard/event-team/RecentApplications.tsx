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

const defaultApplications: RecentApplicationItem[] = [];

export function RecentApplications({
  applications = defaultApplications,
}: RecentApplicationsProps) {
  return (
    <Card className="border-orange-200/80 bg-orange-50/60 p-6 dark:border-orange-900/40 dark:bg-orange-950/20">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-orange-500/10 p-1.5 text-orange-600">
            <Users className="h-4 w-4" />
          </div>
          <h3 className="text-foreground text-base font-semibold">
            Recent Applications
          </h3>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-orange-100/60 hover:text-orange-600"
          asChild
        >
          <Link href="/event-team/applications">View All</Link>
        </Button>
      </div>

      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-orange-200 bg-white/60 py-8 text-center dark:bg-black/20">
          <p className="text-muted-foreground text-sm font-medium">
            No pending applications
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between rounded-xl border border-orange-200/60 bg-white/80 p-4 transition-colors hover:border-orange-300 hover:bg-orange-100/50 dark:bg-neutral-900/80"
            >
              <div className="space-y-1">
                <h4 className="text-foreground text-sm font-semibold">
                  {app.workerName}
                </h4>
                <p className="text-muted-foreground text-xs">{app.jobTitle}</p>
              </div>

              <div className="text-muted-foreground flex shrink-0 items-center gap-1 text-xs">
                <Clock className="h-3.5 w-3.5 text-orange-600" />
                <span>{app.appliedTime}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
