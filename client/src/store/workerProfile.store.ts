import { create } from "zustand";
import type { WorkerProfile } from "@/types/workerProfile.types";

interface WorkerProfileState {
  profile: WorkerProfile | null;
  email: string | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;

  setProfileData: (profile: WorkerProfile, email: string) => void;
  updateProfileState: (updatedProfile: WorkerProfile) => void;
  setLoading: (isLoading: boolean) => void;
  setUpdating: (isUpdating: boolean) => void;
  setError: (error: string | null) => void;
  clearProfile: () => void;
}

export const useWorkerProfileStore = create<WorkerProfileState>((set) => ({
  profile: null,
  email: null,
  isLoading: true,
  isUpdating: false,
  error: null,

  setProfileData: (profile, email) =>
    set({
      profile,
      email,
      isLoading: false,
      error: null,
    }),

  updateProfileState: (updatedProfile) =>
    set({
      profile: updatedProfile,
      isUpdating: false,
      error: null,
    }),

  setLoading: (isLoading) =>
    set({
      isLoading,
    }),

  setUpdating: (isUpdating) =>
    set({
      isUpdating,
    }),

  setError: (error) =>
    set({
      error,
      isLoading: false,
      isUpdating: false,
    }),

  clearProfile: () =>
    set({
      profile: null,
      email: null,
      isLoading: false,
      isUpdating: false,
      error: null,
    }),
}));
