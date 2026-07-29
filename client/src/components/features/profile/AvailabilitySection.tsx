"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Power } from "lucide-react";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import type { UpdateWorkerProfileInput, WorkerProfile } from "@/types/workerProfile.types";

interface AvailabilitySectionProps {
  profile: WorkerProfile;
  onSubmit: (data: UpdateWorkerProfileInput) => Promise<void>;
  isLoading?: boolean;
}

export function AvailabilitySection({ profile, onSubmit, isLoading = false }: AvailabilitySectionProps) {
  const [availability, setAvailability] = useState<boolean>(profile.availability ?? true);

  const isDirty = availability !== profile.availability;

  const handleToggle = () => {
    setAvailability((prev) => !prev);
  };

  const handleSave = async () => {
    await onSubmit({ availability });
  };

  return (
    <Card className="space-y-6 p-6">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-foreground flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Power className="text-primary h-5 w-5" />
            Work Availability Status
          </h2>
          <p className="text-muted-foreground text-xs">
            Control whether organizers can send you instant job offers.
          </p>
        </div>
        <Badge
          variant="outline"
          className={
            availability
              ? "border-emerald-300 bg-emerald-500/10 text-emerald-600 font-semibold"
              : "border-rose-300 bg-rose-500/10 text-rose-600 font-semibold"
          }
        >
          {availability ? "Available for Work" : "Currently Unavailable"}
        </Badge>
      </div>

      <div className="border-border bg-muted/20 flex flex-col justify-between gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <div className="text-foreground flex items-center gap-2 text-sm font-medium">
            {availability ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <XCircle className="text-rose-500 h-4 w-4" />
            )}
            {availability
              ? "You are open to receiving new work requests"
              : "Your profile is hidden from active job matching"}
          </div>
          <p className="text-muted-foreground text-xs">
            Toggle off if you are taking a break or unavailable for upcoming event bookings.
          </p>
        </div>

        <Button
          type="button"
          variant={availability ? "outline" : "primary"}
          size="sm"
          onClick={handleToggle}
          className="shrink-0"
        >
          {availability ? "Set as Unavailable" : "Set as Available"}
        </Button>
      </div>

      {isDirty && (
        <div className="flex justify-end pt-2">
          <Button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            loading={isLoading}
            loadingText="Saving..."
            variant="primary"
            size="sm"
          >
            Save Availability Status
          </Button>
        </div>
      )}
    </Card>
  );
}
