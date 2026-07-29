"use client";

import { ShieldCheck, Star, Briefcase, Mail } from "lucide-react";

import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import type { EventTeamProfile } from "@/types/eventTeamProfile.types";
import { ProfileAvatar } from "../shared/ProfileAvatar";

interface EventTeamProfileHeaderProps {
  profile: EventTeamProfile;
  email: string;
  onLogoUpdate: (logoUrl: string) => void;
}

export function EventTeamProfileHeader({
  profile,
  email,
  onLogoUpdate,
}: EventTeamProfileHeaderProps) {
  const {
    companyName,
    ownerName,
    logo,
    rating,
    totalReviews,
    jobsPosted,
    isVerified,
  } = profile;

  return (
    <Card className="relative overflow-hidden p-6 sm:p-8">
      {/* Background Accent */}
      <div className="bg-primary/5 absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full blur-2xl" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo & Main Info */}
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <ProfileAvatar
            photoUrl={logo}
            name={companyName || "Event Company"}
            onPhotoUpdate={onLogoUpdate}
            type="company"
          />

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
                {companyName || "Unnamed Company"}
              </h1>

              {isVerified && (
                <Badge
                  variant="secondary"
                  className="bg-emerald-500/10 text-emerald-600 border-emerald-200/80 gap-1 px-2 py-0.5 text-xs font-semibold"
                >
                  <ShieldCheck size={13} />
                  Verified Agency
                </Badge>
              )}
            </div>

            <p className="text-sm font-medium text-foreground">
              Owner / Representative: <span className="text-muted-foreground">{ownerName || "N/A"}</span>
            </p>

            <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <Mail size={14} className="text-muted-foreground" />
                <span>{email}</span>
              </div>

              {rating !== undefined && (
                <div className="flex items-center gap-1 font-semibold text-foreground">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span>{rating.toFixed(1)}</span>
                  <span className="text-muted-foreground font-normal">
                    ({totalReviews || 0} reviews)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Jobs Posted Metric */}
        <div className="border-border/60 flex items-center gap-6 border-t pt-4 sm:border-t-0 sm:pt-0">
          <div className="space-y-0.5 text-center sm:text-right">
            <p className="text-muted-foreground text-xs font-medium">
              Jobs Posted
            </p>
            <p className="text-foreground flex items-center justify-center sm:justify-end gap-1 text-xl font-bold">
              <Briefcase size={18} className="text-primary" />
              {jobsPosted || 0}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
