"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Star,
  MapPin,
  CheckCircle2,
  User,
  ShieldCheck,
  Check,
  XCircle,
  Languages,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import type { JobApplication, WorkerInfo } from "@/types/application.types";

import { ApplicationStatus } from "./ApplicationStatus";

interface WorkerProfileModalProps {
  application: JobApplication | null;
  onClose: () => void;
  onAccept: (applicationId: string) => Promise<void>;
  onReject: (applicationId: string) => Promise<void>;
}

export function WorkerProfileModal({
  application,
  onClose,
  onAccept,
  onReject,
}: WorkerProfileModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!application) return null;

  const worker =
    typeof application.worker === "object"
      ? (application.worker as WorkerInfo)
      : null;

  const name = worker?.name || worker?.email?.split("@")[0] || "Worker Profile";
  const photo = worker?.photo;
  const rating = worker?.rating || 5.0;
  const district = worker?.district || worker?.currentLocation || "Kerala";
  const jobsCompleted = worker?.jobsCompleted || 0;
  const attendanceRate = worker?.attendanceRate || 100;
  const skills = worker?.skills || ["Catering", "Event Setup"];
  const languages = worker?.languages || ["Malayalam", "English"];
  const bio =
    worker?.bio ||
    "Experienced event support worker skilled in catering, setup, and hospitality.";

  const handleAccept = async () => {
    setIsSubmitting(true);
    await onAccept(application._id);
    setIsSubmitting(false);
    onClose();
  };

  const handleReject = async () => {
    setIsSubmitting(true);
    await onReject(application._id);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in-0 duration-200">
      <div className="bg-card w-full max-w-lg rounded-2xl border border-border p-6 shadow-xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Worker Main Header */}
        <div className="flex items-center gap-4 border-b border-border pb-5">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-muted border border-border flex items-center justify-center">
            {photo ? (
              <Image
                src={photo}
                alt={name}
                fill
                unoptimized
                className="object-cover"
                sizes="64px"
              />
            ) : (
              <User className="h-8 w-8 text-muted-foreground" />
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">{name}</h2>
              {worker?.isIdentityVerified && (
                <Badge
                  variant="secondary"
                  className="bg-emerald-500/10 text-emerald-600 border-emerald-200 px-1.5 py-0 text-[10px]"
                >
                  <ShieldCheck size={11} className="mr-0.5" /> Verified
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1 font-semibold text-foreground">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span>{rating.toFixed(1)}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin size={13} className="text-primary" />
                <span>{district}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status & Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/40 p-3 rounded-xl border border-border/60">
            <p className="text-[11px] text-muted-foreground font-medium">
              Completed Jobs
            </p>
            <p className="text-base font-bold text-foreground flex items-center gap-1 mt-0.5">
              <CheckCircle2 size={16} className="text-emerald-500" />
              {jobsCompleted}
            </p>
          </div>

          <div className="bg-muted/40 p-3 rounded-xl border border-border/60">
            <p className="text-[11px] text-muted-foreground font-medium">
              Attendance Rate
            </p>
            <p className="text-base font-bold text-foreground mt-0.5">
              {attendanceRate}%
            </p>
          </div>
        </div>

        {/* Bio / About */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
            About Worker
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-xl border border-border/50">
            {bio}
          </p>
        </div>

        {/* Skills */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1 text-xs font-semibold text-foreground uppercase tracking-wider">
            <Wrench size={13} className="text-primary" />
            <span>Skills</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <Badge key={s} variant="secondary" className="text-xs">
                {s}
              </Badge>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1 text-xs font-semibold text-foreground uppercase tracking-wider">
            <Languages size={13} className="text-primary" />
            <span>Languages</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {languages.map((l) => (
              <Badge key={l} variant="outline" className="text-xs">
                {l}
              </Badge>
            ))}
          </div>
        </div>

        {/* Application Status Badge */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground font-medium">
            Application Status:
          </span>
          <ApplicationStatus status={application.status} />
        </div>

        {/* Decision Action Buttons */}
        {application.status === "PENDING" && (
          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={handleReject}
              disabled={isSubmitting}
              className="flex-1 text-rose-600 border-rose-200 hover:bg-rose-50 gap-1.5"
            >
              <XCircle size={16} />
              Reject Worker
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={handleAccept}
              disabled={isSubmitting}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
            >
              <Check size={16} />
              Accept Worker
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
