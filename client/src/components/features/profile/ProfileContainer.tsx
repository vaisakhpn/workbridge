"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertCircle, User, MapPin, Wrench, Power, LucideIcon } from "lucide-react";

import { useWorkerProfile } from "@/hooks/useWorkerProfile";
import { Button } from "@/components/ui/Button";

import { ProfileHeader } from "./ProfileHeader";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { AddressForm } from "./AddressForm";
import { SkillsSection } from "./SkillsSection";
import { LanguagesSection } from "./LanguagesSection";
import { AvailabilitySection } from "./AvailabilitySection";
import { BioSection } from "./BioSection";

type ProfileTab = "personal" | "location" | "skills" | "status";

const tabs: { id: ProfileTab; label: string; icon: LucideIcon }[] = [
  { id: "personal", label: "Personal Details", icon: User },
  { id: "location", label: "Location & Address", icon: MapPin },
  { id: "skills", label: "Skills & Languages", icon: Wrench },
  { id: "status", label: "Availability & Bio", icon: Power },
];

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

  const [activeTab, setActiveTab] = useState<ProfileTab>("personal");

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

      {/* Navigation Tab Bar */}
      <div className="border-border bg-card flex flex-wrap items-center gap-1.5 rounded-2xl border p-1.5 shadow-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      {activeTab === "personal" && (
        <div className="max-w-3xl">
          <PersonalInfoForm
            profile={profile}
            onSubmit={updateProfile}
            isLoading={isUpdating}
          />
        </div>
      )}

      {activeTab === "location" && (
        <div className="max-w-3xl">
          <AddressForm
            profile={profile}
            onSubmit={updateProfile}
            isLoading={isUpdating}
          />
        </div>
      )}

      {activeTab === "skills" && (
        <div className="grid gap-8 md:grid-cols-2">
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
      )}

      {activeTab === "status" && (
        <div className="grid gap-8 md:grid-cols-2">
          <AvailabilitySection
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
      )}
    </div>
  );
}

export default ProfileContainer;
