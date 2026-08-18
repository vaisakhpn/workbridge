import { create } from "zustand";
import type { EventTeamDashboardData } from "@/types/eventTeamDashboard.types";

interface EventTeamDashboardState {
  dashboardData: EventTeamDashboardData | null;
  isLoading: boolean;
  error: string | null;

  setDashboardData: (data: EventTeamDashboardData) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearDashboard: () => void;
}

export const useEventTeamDashboardStore = create<EventTeamDashboardState>(
  (set) => ({
    dashboardData: null,
    isLoading: true,
    error: null,

    setDashboardData: (dashboardData) =>
      set({
        dashboardData,
        isLoading: false,
        error: null,
      }),

    setLoading: (isLoading) =>
      set({
        isLoading,
      }),

    setError: (error) =>
      set({
        error,
        isLoading: false,
      }),

    clearDashboard: () =>
      set({
        dashboardData: null,
        isLoading: true,
        error: null,
      }),
  })
);
