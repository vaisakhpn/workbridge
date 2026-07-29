import { useCallback, useMemo, useEffect } from "react";
import { toast } from "sonner";

import { applicationService } from "@/services/event-team/application.service";
import { jobService } from "@/services/event-team/job.service";
import { useApplicationsStore } from "@/store/applications.store";
import type { ApplicationStatusType, WorkerInfo } from "@/types/application.types";

interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useJobApplications(jobId: string) {
  const {
    job,
    applications,
    searchQuery,
    statusFilter,
    selectedWorkerModal,
    isLoading,
    error,
    setJob,
    setApplications,
    setSearchQuery,
    setStatusFilter,
    setSelectedWorkerModal,
    setLoading,
    setError,
    updateApplicationStatusInStore,
  } = useApplicationsStore();

  const fetchApplicationsData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [jobRes, appsRes] = await Promise.all([
        jobService.getJobById(jobId),
        applicationService.getApplicantsByJob(jobId),
      ]);

      if (jobRes.success && jobRes.data) {
        setJob(jobRes.data);
      }

      if (appsRes.success && appsRes.data) {
        setApplications(appsRes.data);
      }
    } catch (err: unknown) {
      const apiErr = err as ApiErrorResponse;
      const message =
        apiErr?.response?.data?.message || "Failed to load job applicants";

      setError(message);
      toast.error(message);
    }
  }, [jobId, setJob, setApplications, setLoading, setError]);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const [jobRes, appsRes] = await Promise.all([
          jobService.getJobById(jobId),
          applicationService.getApplicantsByJob(jobId),
        ]);

        if (isMounted) {
          if (jobRes.success && jobRes.data) setJob(jobRes.data);
          if (appsRes.success && appsRes.data) setApplications(appsRes.data);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const apiErr = err as ApiErrorResponse;
          const message =
            apiErr?.response?.data?.message || "Failed to load job applicants";

          setError(message);
          toast.error(message);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [jobId, setJob, setApplications, setError]);

  const updateStatus = useCallback(
    async (applicationId: string, status: ApplicationStatusType) => {
      try {
        const response = await applicationService.updateApplicationStatus(
          applicationId,
          { status }
        );

        if (response.success) {
          updateApplicationStatusInStore(applicationId, status);
          toast.success(
            `Application ${status.toLowerCase()} successfully`
          );
        }
      } catch (err: unknown) {
        const apiErr = err as ApiErrorResponse;
        toast.error(
          apiErr?.response?.data?.message || "Failed to update application status"
        );
      }
    },
    [updateApplicationStatusInStore]
  );

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const worker = typeof app.worker === "object" ? (app.worker as WorkerInfo) : null;
      const workerName = worker?.name || worker?.email || "Worker";
      const district = worker?.district || worker?.currentLocation || "";

      const matchesSearch =
        searchQuery === "" ||
        workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        district.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, statusFilter]);

  return {
    job,
    applications: filteredApplications,
    totalCount: applications.length,
    searchQuery,
    statusFilter,
    selectedWorkerModal,
    isLoading,
    error,
    fetchApplicationsData,
    updateStatus,
    setSearchQuery,
    setStatusFilter,
    setSelectedWorkerModal,
  };
}
