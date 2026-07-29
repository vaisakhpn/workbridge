import { create } from "zustand";
import type {
  WorkerApplication,
  ApplicationFilterStatus,
} from "@/types/application.types";

interface ApplicationState {
  applications: WorkerApplication[];
  filterStatus: ApplicationFilterStatus;
  isLoading: boolean;
  error: string | null;

  setApplications: (applications: WorkerApplication[]) => void;
  setFilterStatus: (filterStatus: ApplicationFilterStatus) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearApplications: () => void;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  applications: [],
  filterStatus: "ALL",
  isLoading: true,
  error: null,

  setApplications: (applications) =>
    set({
      applications,
      isLoading: false,
      error: null,
    }),

  setFilterStatus: (filterStatus) =>
    set({
      filterStatus,
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

  clearApplications: () =>
    set({
      applications: [],
      filterStatus: "ALL",
      isLoading: false,
      error: null,
    }),
}));
