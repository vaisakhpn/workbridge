import { create } from "zustand";
import type { JobApplication } from "@/types/application.types";
import type { Job } from "@/types/job.types";

interface ApplicationsState {
  job: Job | null;
  applications: JobApplication[];
  searchQuery: string;
  statusFilter: string;
  selectedWorkerModal: JobApplication | null;
  isLoading: boolean;
  error: string | null;

  setJob: (job: Job | null) => void;
  setApplications: (applications: JobApplication[]) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;
  setSelectedWorkerModal: (app: JobApplication | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  updateApplicationStatusInStore: (
    applicationId: string,
    status: "PENDING" | "ACCEPTED" | "REJECTED"
  ) => void;
}

export const useApplicationsStore = create<ApplicationsState>((set) => ({
  job: null,
  applications: [],
  searchQuery: "",
  statusFilter: "ALL",
  selectedWorkerModal: null,
  isLoading: true,
  error: null,

  setJob: (job) => set({ job }),

  setApplications: (applications) =>
    set({
      applications,
      isLoading: false,
      error: null,
    }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  setStatusFilter: (statusFilter) => set({ statusFilter }),

  setSelectedWorkerModal: (selectedWorkerModal) => set({ selectedWorkerModal }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) =>
    set({
      error,
      isLoading: false,
    }),

  updateApplicationStatusInStore: (applicationId, status) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app._id === applicationId ? { ...app, status } : app
      ),
      selectedWorkerModal:
        state.selectedWorkerModal?._id === applicationId
          ? { ...state.selectedWorkerModal, status }
          : state.selectedWorkerModal,
    })),
}));
