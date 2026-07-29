"use client";

import {
  Award,
  CheckCircle2,
  Star,
  Briefcase,
  CalendarCheck,
} from "lucide-react";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { ProfileAvatar } from "./ProfileAvatar";
import type { WorkerProfile } from "@/types/workerProfile.types";

interface ProfileHeaderProps {
  profile: WorkerProfile;
  email: string;
  onPhotoUpdate?: (photoUrl: string) => void;
}

const badgeColorMap: Record<WorkerProfile["badge"], string> = {
  Beginner:
    "bg-slate-500/10 text-slate-600 border-slate-300 dark:text-slate-300",
  Bronze: "bg-amber-700/10 text-amber-700 border-amber-300 dark:text-amber-400",
  Silver: "bg-slate-400/15 text-slate-700 border-slate-400 dark:text-slate-200",
  Gold: "bg-yellow-500/15 text-yellow-700 border-yellow-400 dark:text-yellow-400",
  Platinum:
    "bg-indigo-500/15 text-indigo-700 border-indigo-400 dark:text-indigo-300",
};

export function ProfileHeader({
  profile,
  email,
  onPhotoUpdate,
}: ProfileHeaderProps) {
  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "WB";

  return (
    <Card className="from-background via-background/95 to-accent/20 border-border relative overflow-hidden bg-linear-to-r p-6 shadow-xs sm:p-8">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        {/* Avatar */}
        <ProfileAvatar
          photo={profile.photo}
          name={profile.name}
          initials={initials}
          onPhotoUpdate={onPhotoUpdate}
        />

        {/* Details */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              {profile.name || "Worker Name"}
            </h1>

            {profile.isIdentityVerified && (
              <Badge
                variant="secondary"
                className="gap-1 border-emerald-200 bg-emerald-500/10 text-emerald-600"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Verified
              </Badge>
            )}

            <Badge
              variant="outline"
              className={`gap-1 font-semibold ${badgeColorMap[profile.badge] || ""}`}
            >
              <Award className="h-3.5 w-3.5" />
              {profile.badge || "Beginner"} Badge
            </Badge>
          </div>

          <p className="text-muted-foreground text-sm">{email}</p>

          {/* Metrics */}
          <div className="border-border/60 grid max-w-lg grid-cols-3 gap-3 border-t pt-3 sm:gap-6">
            <div className="space-y-0.5">
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                Rating
              </div>
              <p className="text-base font-bold">
                {profile.rating ? profile.rating.toFixed(1) : "0.0"}
              </p>
            </div>

            <div className="space-y-0.5">
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <Briefcase className="text-primary h-3.5 w-3.5" />
                Completed
              </div>
              <p className="text-base font-bold">
                {profile.jobsCompleted || 0} Jobs
              </p>
            </div>

            <div className="space-y-0.5">
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <CalendarCheck className="h-3.5 w-3.5 text-emerald-500" />
                Attendance
              </div>
              <p className="text-base font-bold">
                {profile.attendanceRate || 100}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
