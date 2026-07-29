"use client";

import Link from "next/link";
import { ClipboardList, PlusCircle } from "lucide-react";

import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  isFiltered?: boolean;
}

export function EmptyState({ isFiltered = false }: EmptyStateProps) {
  return (
    <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-2 border-border/80">
      <div className="bg-primary/10 text-primary mb-4 rounded-full p-4">
        <ClipboardList size={36} />
      </div>

      <h3 className="text-lg font-bold text-foreground">
        {isFiltered ? "No matching jobs found" : "No jobs created yet"}
      </h3>

      <p className="text-sm text-muted-foreground mt-1 max-w-sm">
        {isFiltered
          ? "Try adjusting your search criteria or status filter."
          : "Create your first job posting and start hiring skilled workers."}
      </p>

      {!isFiltered && (
        <Button variant="primary" size="md" className="mt-6 gap-2" asChild>
          <Link href="/event-team/jobs/create">
            <PlusCircle size={18} />
            Create Job
          </Link>
        </Button>
      )}
    </Card>
  );
}
