import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { jobService } from "@/services/event-team/job.service";
import { useManageJobsStore } from "@/store/manageJobs.store";

interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useManageJobs() {
  const {
    jobs,
    searchQuery,
    statusFilter,
    isLoading,
    error,
    setJobs,
    setSearchQuery,
    setStatusFilter,
    setLoading,
    setError,
    updateJobInStore,
  } = useManageJobsStore();

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await jobService.getMyJobs();

      if (response.success && response.data) {
        setJobs(response.data);
      }
    } catch (err: unknown) {
      const apiErr = err as ApiErrorResponse;
      const message =
        apiErr?.response?.data?.message || "Failed to load job listings";

      setError(message);
      toast.error(message);
    }
  }, [setLoading, setError, setJobs]);

  const closeJob = useCallback(
    async (jobId: string) => {
      try {
        const response = await jobService.deleteJob(jobId);
        if (response.success) {
          updateJobInStore(jobId, { status: "CANCELLED" });
          toast.success("Job closed successfully");
        }
      } catch (err: unknown) {
        const apiErr = err as ApiErrorResponse;
        toast.error(
          apiErr?.response?.data?.message || "Failed to close job"
        );
      }
    },
    [updateJobInStore]
  );

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchQuery, statusFilter]);

  return {
    jobs: filteredJobs,
    totalJobsCount: jobs.length,
    searchQuery,
    statusFilter,
    isLoading,
    error,
    fetchJobs,
    closeJob,
    setSearchQuery,
    setStatusFilter,
  };
}
