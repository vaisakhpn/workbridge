import { create } from "zustand";
import type { Job } from "@/types/job.types";

interface ManageJobsState {
  jobs: Job[];
  searchQuery: string;
  statusFilter: string;
  isLoading: boolean;
  error: string | null;

  setJobs: (jobs: Job[]) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  removeJobFromStore: (jobId: string) => void;
  updateJobInStore: (jobId: string, updated: Partial<Job>) => void;
}

export const useManageJobsStore = create<ManageJobsState>((set) => ({
  jobs: [],
  searchQuery: "",
  statusFilter: "ALL",
  isLoading: true,
  error: null,

  setJobs: (jobs) =>
    set({
      jobs,
      isLoading: false,
      error: null,
    }),

  setSearchQuery: (searchQuery) =>
    set({
      searchQuery,
    }),

  setStatusFilter: (statusFilter) =>
    set({
      statusFilter,
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

  removeJobFromStore: (jobId) =>
    set((state) => ({
      jobs: state.jobs.filter((j) => j._id !== jobId),
    })),

  updateJobInStore: (jobId, updated) =>
    set((state) => ({
      jobs: state.jobs.map((j) =>
        j._id === jobId ? { ...j, ...updated } : j
      ),
    })),
}));
