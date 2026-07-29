"use client";

import { MailOpen } from "lucide-react";
import Card from "@/components/ui/Card";

interface EmptyApplicationsProps {
  isFiltered?: boolean;
}

export function EmptyApplications({ isFiltered = false }: EmptyApplicationsProps) {
  return (
    <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-2 border-border/80">
      <div className="bg-primary/10 text-primary mb-4 rounded-full p-4">
        <MailOpen size={36} />
      </div>

      <h3 className="text-lg font-bold text-foreground">
        {isFiltered ? "No matching applicants" : "No one has applied yet"}
      </h3>

      <p className="text-sm text-muted-foreground mt-1 max-w-sm">
        {isFiltered
          ? "Try adjusting your search query or status filter."
          : "Share your job listing and wait for workers to apply."}
      </p>
    </Card>
  );
}
