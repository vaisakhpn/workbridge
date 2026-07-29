"use client";

import Link from "next/link";
import { FileSearch } from "lucide-react";

import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { ApplicationFilterStatus } from "@/types/application.types";

interface EmptyApplicationsProps {
  filterStatus: ApplicationFilterStatus;
}

export function EmptyApplications({ filterStatus }: EmptyApplicationsProps) {
  const getEmptyMessage = () => {
    switch (filterStatus) {
      case "PENDING":
        return "You have no pending job applications.";
      case "ACCEPTED":
        return "You have no accepted job applications yet.";
      case "REJECTED":
        return "You have no rejected applications.";
      case "COMPLETED":
        return "You have no completed job history yet.";
      default:
        return "You haven't applied for any jobs yet.";
    }
  };

  return (
    <Card className="flex flex-col items-center justify-center border-dashed p-12 text-center">
      <div className="bg-primary/10 text-primary mb-4 rounded-full p-4">
        <FileSearch className="h-10 w-10" />
      </div>

      <h3 className="text-foreground text-lg font-bold">No Applications Found</h3>

      <p className="text-muted-foreground mt-1 max-w-sm text-xs sm:text-sm">
        {getEmptyMessage()}
      </p>

      <Button variant="primary" size="sm" className="mt-6" asChild>
        <Link href="/worker/jobs">Explore Available Jobs</Link>
      </Button>
    </Card>
  );
}
