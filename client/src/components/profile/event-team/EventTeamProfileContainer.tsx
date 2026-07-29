"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  AlertCircle,
  Building2,
  MapPin,
  FileText,
  LucideIcon,
} from "lucide-react";

import { useEventTeamProfile } from "@/hooks/useEventTeamProfile";
import { Button } from "@/components/ui/Button";

import { AddressForm } from "../shared/AddressForm";
import { DescriptionForm } from "../shared/DescriptionForm";

import { EventTeamProfileHeader } from "./EventTeamProfileHeader";
import { CompanyInfoForm } from "./CompanyInfoForm";
import { ProfileSkeleton } from "@/components/ui/skeletons";

type CompanyProfileTab = "company" | "location" | "about";

const tabs: {
  id: CompanyProfileTab;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
}[] = [
  {
    id: "company",
    label: "Company Details",
    shortLabel: "Company",
    icon: Building2,
  },
  {
    id: "location",
    label: "Location & Address",
    shortLabel: "Location",
    icon: MapPin,
  },
  {
    id: "about",
    label: "About Organization",
    shortLabel: "About",
    icon: FileText,
  },
];



export function EventTeamProfileContainer() {
  const {
    profile,
    email,
    isLoading,
    isUpdating,
    error,
    fetchProfile,
    updateProfile,
  } = useEventTeamProfile();

  const [activeTab, setActiveTab] = useState<CompanyProfileTab>("company");

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
        <h2 className="text-xl font-bold">Unable to load company profile</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {error || "Company profile data was not found."}
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
      <EventTeamProfileHeader
        profile={profile}
        email={email || ""}
        onLogoUpdate={(logoUrl) => updateProfile({ logo: logoUrl })}
      />

      {/* Navigation Tab Bar */}
      <div className="border-border bg-card grid w-full grid-cols-3 gap-1 rounded-2xl border p-1.5 shadow-xs">
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
      {activeTab === "company" && (
        <div className="max-w-3xl">
          <CompanyInfoForm
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

      {activeTab === "about" && (
        <div className="max-w-3xl">
          <DescriptionForm
            title="About Company"
            subtitle="Write a brief overview of your event management team, services, and reputation."
            placeholder="Describe your company services, experience & events managed..."
            initialValue={profile.description || ""}
            onSubmit={(text) => updateProfile({ description: text })}
            isLoading={isUpdating}
          />
        </div>
      )}
    </div>
  );
}

export default EventTeamProfileContainer;
