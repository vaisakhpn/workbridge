"use client";

import { useState } from "react";
import { Power, CheckCircle, XCircle } from "lucide-react";

import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import type {
  UpdateWorkerProfileInput,
  WorkerProfile,
} from "@/types/workerProfile.types";

interface AvailabilitySectionProps {
  profile: WorkerProfile;
  onSubmit: (data: UpdateWorkerProfileInput) => Promise<void>;
  isLoading?: boolean;
}

export function AvailabilitySection({
  profile,
  onSubmit,
  isLoading = false,
}: AvailabilitySectionProps) {
  const [isAvailable, setIsAvailable] = useState<boolean>(
    profile.availability ?? true
  );
  const [isChanged, setIsChanged] = useState(false);

  const handleToggle = (status: boolean) => {
    setIsAvailable(status);
    setIsChanged(status !== profile.availability);
  };

  const handleSave = async () => {
    await onSubmit({ availability: isAvailable });
    setIsChanged(false);
  };

  return (
    <Card className="space-y-6 p-6">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-foreground text-lg font-semibold tracking-tight">
            Work Availability
          </h2>
          <p className="text-muted-foreground text-xs">
            Toggle your availability to accept new event jobs.
          </p>
        </div>

        <Badge
          variant="secondary"
          className={
            isAvailable
              ? "bg-emerald-500/10 text-emerald-600 border-emerald-200 gap-1 px-2.5 py-1 text-xs font-semibold"
              : "bg-rose-500/10 text-rose-600 border-rose-200 gap-1 px-2.5 py-1 text-xs font-semibold"
          }
        >
          {isAvailable ? <CheckCircle size={13} /> : <XCircle size={13} />}
          {isAvailable ? "Available for Work" : "Unavailable"}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {/* Available Option */}
          <button
            type="button"
            onClick={() => handleToggle(true)}
            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${
              isAvailable
                ? "border-emerald-500 bg-emerald-500/5 shadow-xs"
                : "border-border bg-background hover:bg-muted/40"
            }`}
          >
            <div className="bg-emerald-500/10 text-emerald-600 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
              <Power size={20} />
            </div>

            <div>
              <p className="text-foreground text-sm font-semibold">Available</p>
              <p className="text-muted-foreground text-xs">
                Receive new event job requests & alerts.
              </p>
            </div>
          </button>

          {/* Unavailable Option */}
          <button
            type="button"
            onClick={() => handleToggle(false)}
            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${
              !isAvailable
                ? "border-rose-500 bg-rose-500/5 shadow-xs"
                : "border-border bg-background hover:bg-muted/40"
            }`}
          >
            <div className="bg-rose-500/10 text-rose-600 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
              <Power size={20} />
            </div>

            <div>
              <p className="text-foreground text-sm font-semibold">
                Unavailable
              </p>
              <p className="text-muted-foreground text-xs">
                Pause new job invitations temporarily.
              </p>
            </div>
          </button>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="button"
            onClick={handleSave}
            disabled={!isChanged || isLoading}
            loading={isLoading}
            loadingText="Saving..."
            variant="primary"
            size="sm"
          >
            Save Status
          </Button>
        </div>
      </div>
    </Card>
  );
}
