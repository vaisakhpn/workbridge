"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, MapPin, CheckCircle2, User, Eye, Check, X, Award } from "lucide-react";

import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import type { JobApplication, WorkerInfo } from "@/types/application.types";

import { ApplicationStatus } from "./ApplicationStatus";

interface ApplicationCardProps {
  application: JobApplication;
  onViewProfile: (application: JobApplication) => void;
  onAccept: (applicationId: string) => Promise<void>;
  onReject: (applicationId: string) => Promise<void>;
}

export function ApplicationCard({
  application,
  onViewProfile,
  onAccept,
  onReject,
}: ApplicationCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const worker =
    typeof application.worker === "object"
      ? (application.worker as WorkerInfo)
      : null;

  const name = worker?.name || worker?.email?.split("@")[0] || "Worker";
  const photo = worker?.photo;
  const rating = worker?.rating || 5.0;
  const district = worker?.district || worker?.currentLocation || "Kerala";
  const jobsCompleted = worker?.jobsCompleted || 0;
  const badge = worker?.badge || "Pro";

  const appliedDate = new Date(application.createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
    }
  );

  const handleAcceptClick = async () => {
    setIsSubmitting(true);
    await onAccept(application._id);
    setIsSubmitting(false);
  };

  const handleRejectClick = async () => {
    setIsSubmitting(true);
    await onReject(application._id);
    setIsSubmitting(false);
  };

  return (
    <Card className="p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-all duration-200 border-border/80">
      <div className="space-y-4">
        {/* Worker Header: Photo, Name, Rating & Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Photo Avatar */}
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-muted border border-border flex items-center justify-center">
              {photo ? (
                <Image
                  src={photo}
                  alt={name}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="48px"
                />
              ) : (
                <User className="h-6 w-6 text-muted-foreground" />
              )}
            </div>

            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-foreground line-clamp-1">
                {name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span>{rating.toFixed(1)}</span>
                {badge && (
                  <Badge variant="outline" className="ml-1 text-[10px] px-1.5 py-0">
                    <Award size={10} className="mr-0.5" />
                    {badge}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <ApplicationStatus status={application.status} />
        </div>

        {/* Worker Metrics Grid */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-muted-foreground pt-1 border-t border-border/40">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin size={14} className="text-primary shrink-0" />
            <span className="truncate">{district}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
            <span>Jobs Completed: {jobsCompleted}</span>
          </div>
        </div>

        <div className="text-[11px] text-muted-foreground flex justify-between items-center">
          <span>Applied: {appliedDate}</span>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="flex items-center gap-1.5 pt-3 border-t border-border/60">
        <Button
          variant="outline"
          size="xs"
          onClick={() => onViewProfile(application)}
          className="flex-1 min-w-0 whitespace-nowrap gap-1 px-2 text-xs"
        >
          <Eye size={14} className="shrink-0" />
          <span className="truncate">View Profile</span>
        </Button>

        {application.status === "PENDING" && (
          <>
            <Button
              variant="primary"
              size="xs"
              onClick={handleAcceptClick}
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1 px-2.5 whitespace-nowrap shrink-0 text-xs"
              title="Accept Worker"
            >
              <Check size={14} className="shrink-0" />
              <span>Accept</span>
            </Button>

            <Button
              variant="danger"
              size="xs"
              onClick={handleRejectClick}
              disabled={isSubmitting}
              className="gap-1 px-2.5 whitespace-nowrap shrink-0 text-xs"
              title="Reject Worker"
            >
              <X size={14} className="shrink-0" />
              <span>Reject</span>
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
