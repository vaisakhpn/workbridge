import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { applicationService } from "@/services/worker/application.service";
import { useApplicationStore } from "@/store/application.store";
import type { ApplicationFilterStatus } from "@/types/application.types";

interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useWorkerApplications() {
  const {
    applications,
    filterStatus,
    isLoading,
    error,
    setApplications,
    setFilterStatus,
    setLoading,
    setError,
  } = useApplicationStore();

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await applicationService.getMyApplications();

      if (response.success && Array.isArray(response.data)) {
        setApplications(response.data);
      }
    } catch (err: unknown) {
      const apiErr = err as ApiErrorResponse;
      const message =
        apiErr?.response?.data?.message || "Failed to load applications";

      setError(message);
      toast.error(message);
    }
  }, [setLoading, setError, setApplications]);

  const filteredApplications = useMemo(() => {
    if (filterStatus === "ALL") {
      return applications;
    }

    if (filterStatus === "COMPLETED") {
      return applications.filter(
        (app) => app.job.status === "COMPLETED" || app.attendance
      );
    }

    return applications.filter((app) => app.status === filterStatus);
  }, [applications, filterStatus]);

  const counts = useMemo(() => {
    return {
      ALL: applications.length,
      PENDING: applications.filter((app) => app.status === "PENDING").length,
      ACCEPTED: applications.filter((app) => app.status === "ACCEPTED").length,
      REJECTED: applications.filter((app) => app.status === "REJECTED").length,
      COMPLETED: applications.filter(
        (app) => app.job.status === "COMPLETED" || app.attendance
      ).length,
    };
  }, [applications]);

  const handleFilterChange = (status: ApplicationFilterStatus) => {
    setFilterStatus(status);
  };

  return {
    applications,
    filteredApplications,
    filterStatus,
    counts,
    isLoading,
    error,
    fetchApplications,
    handleFilterChange,
  };
}
