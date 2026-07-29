"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Pencil, XCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";

interface JobActionsProps {
  jobId: string;
  status: string;
  onCloseJob: (jobId: string) => Promise<void>;
}

export function JobActions({ jobId, status, onCloseJob }: JobActionsProps) {
  const [isClosing, setIsClosing] = useState(false);
  const isClosed = status === "CANCELLED" || status === "COMPLETED";

  const handleClose = async () => {
    if (confirm("Are you sure you want to close this job listing?")) {
      setIsClosing(true);
      await onCloseJob(jobId);
      setIsClosing(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60">
      {/* View Applications */}
      <Button
        variant="outline"
        size="xs"
        asChild
        className="gap-1.5"
      >
        <Link href={`/event-team/applications?jobId=${jobId}`}>
          <Users size={14} />
          View Applications
        </Link>
      </Button>

      {/* Edit Job */}
      {!isClosed && (
        <Button
          variant="outline"
          size="xs"
          asChild
          className="gap-1.5"
        >
          <Link href={`/event-team/jobs/edit/${jobId}`}>
            <Pencil size={14} />
            Edit
          </Link>
        </Button>
      )}

      {/* Close Job */}
      {!isClosed && (
        <Button
          variant="danger"
          size="xs"
          onClick={handleClose}
          disabled={isClosing}
          loading={isClosing}
          className="gap-1.5"
        >
          <XCircle size={14} />
          Close Job
        </Button>
      )}
    </div>
  );
}
