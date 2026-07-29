"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  AlertCircle,
  User,
  MapPin,
  Wrench,
  Power,
  LucideIcon,
} from "lucide-react";

import { useWorkerProfile } from "@/hooks/useWorkerProfile";
import { Button } from "@/components/ui/Button";

import { AddressForm } from "../shared/AddressForm";
import { DescriptionForm } from "../shared/DescriptionForm";

import { WorkerProfileHeader } from "./WorkerProfileHeader";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { SkillsSection } from "./SkillsSection";
import { LanguagesSection } from "./LanguagesSection";
import { AvailabilitySection } from "./AvailabilitySection";
import { ProfileSkeleton } from "@/components/ui/skeletons";

type ProfileTab = "personal" | "location" | "skills" | "status";

const tabs: {
  id: ProfileTab;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
}[] = [
  {
    id: "personal",
    label: "Personal Details",
    shortLabel: "Personal",
    icon: User,
  },
  {
    id: "location",
    label: "Location & Address",
    shortLabel: "Location",
    icon: MapPin,
  },
  {
    id: "skills",
    label: "Skills & Languages",
    shortLabel: "Skills",
    icon: Wrench,
  },
  {
    id: "status",
    label: "Availability & Bio",
    shortLabel: "Status",
    icon: Power,
  },
];



export function WorkerProfileContainer() {
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
    return <ProfileSkeleton />;
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
      <WorkerProfileHeader
        profile={profile}
        email={email || ""}
        onPhotoUpdate={(photoUrl) => updateProfile({ photo: photoUrl })}
      />

      {/* Navigation Tab Bar */}
      <div className="border-border bg-card grid w-full grid-cols-4 gap-1 rounded-2xl border p-1.5 shadow-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-xs font-semibold transition-all duration-200 sm:gap-2 sm:px-4 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">{tab.shortLabel}</span>
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
            initialValues={{
              address: profile.address,
              district: profile.district,
              currentLocation: profile.currentLocation,
            }}
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

          <DescriptionForm
            title="Bio / About Me"
            subtitle="Write a brief introduction about your work experience."
            placeholder="Tell organizers about your work experience..."
            initialValue={profile.bio || ""}
            onSubmit={(text) => updateProfile({ bio: text })}
            isLoading={isUpdating}
          />
        </div>
      )}
    </div>
  );
}

export default WorkerProfileContainer;
