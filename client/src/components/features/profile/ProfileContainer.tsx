"use client";

import { useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";

import { useWorkerProfile } from "@/hooks/useWorkerProfile";
import { Button } from "@/components/ui/Button";

import { ProfileHeader } from "./ProfileHeader";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { AddressForm } from "./AddressForm";
import { SkillsSection } from "./SkillsSection";
import { LanguagesSection } from "./LanguagesSection";
import { AvailabilitySection } from "./AvailabilitySection";
import { BioSection } from "./BioSection";

export function ProfileContainer() {
  const {
    profile,
    email,
    isLoading,
    isUpdating,
    error,
    fetchProfile,
    updateProfile,
  } = useWorkerProfile();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (isLoading) {
    return (
      <div className="text-muted-foreground flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <p className="text-sm font-medium">Loading your profile...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center p-6 text-center">
        <div className="bg-destructive/10 text-destructive mb-4 rounded-full p-3">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold">Unable to load profile</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {error || "Profile data was not found."}
        </p>
        <Button
          onClick={fetchProfile}
          variant="primary"
          size="sm"
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      {/* Header Banner */}
      <ProfileHeader
        profile={profile}
        email={email || ""}
        onPhotoUpdate={(photoUrl) => updateProfile({ photo: photoUrl })}
      />

      {/* Main Grid Layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column (2 Cols wide on desktop) */}
        <div className="space-y-8 lg:col-span-2">
          <PersonalInfoForm
            profile={profile}
            onSubmit={updateProfile}
            isLoading={isUpdating}
          />

          <AddressForm
            profile={profile}
            onSubmit={updateProfile}
            isLoading={isUpdating}
          />

          <BioSection
            profile={profile}
            onSubmit={updateProfile}
            isLoading={isUpdating}
          />
        </div>

        {/* Right Column (1 Col wide on desktop) */}
        <div className="space-y-8">
          <AvailabilitySection
            profile={profile}
            onSubmit={updateProfile}
            isLoading={isUpdating}
          />

          <SkillsSection
            profile={profile}
            onSubmit={updateProfile}
            isLoading={isUpdating}
          />

          <LanguagesSection
            profile={profile}
            onSubmit={updateProfile}
            isLoading={isUpdating}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileContainer;
