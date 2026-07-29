import { create } from "zustand";
import type { EventTeamProfile } from "@/types/eventTeamProfile.types";

interface EventTeamProfileState {
  profile: EventTeamProfile | null;
  email: string | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;

  setProfile: (profile: EventTeamProfile, email: string) => void;
  setLoading: (isLoading: boolean) => void;
  setUpdating: (isUpdating: boolean) => void;
  setError: (error: string | null) => void;
  updateProfileInStore: (updated: Partial<EventTeamProfile>) => void;
  clearProfile: () => void;
}

export const useEventTeamProfileStore = create<EventTeamProfileState>(
  (set) => ({
    profile: null,
    email: null,
    isLoading: true,
    isUpdating: false,
    error: null,

    setProfile: (profile, email) =>
      set({
        profile,
        email,
        isLoading: false,
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
      }),

    updateProfileInStore: (updated) =>
      set((state) => ({
        profile: state.profile ? { ...state.profile, ...updated } : null,
      })),

    clearProfile: () =>
      set({
        profile: null,
        email: null,
        isLoading: false,
        isUpdating: false,
        error: null,
      }),
  })
);
