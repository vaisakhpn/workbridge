import { create } from "zustand";
import type { WorkerDashboardData } from "@/types/workerDashboard.types";

interface WorkerDashboardState {
  dashboardData: WorkerDashboardData | null;
  isLoading: boolean;
  error: string | null;

  setDashboardData: (data: WorkerDashboardData) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearDashboard: () => void;
}

export const useWorkerDashboardStore = create<WorkerDashboardState>((set) => ({
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
}));
