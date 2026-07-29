import { useCallback } from "react";
import { toast } from "sonner";

import { workerDashboardService } from "@/services/worker/workerDashboard.service";
import { useWorkerDashboardStore } from "@/store/workerDashboard.store";

interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useWorkerDashboard() {
  const {
    dashboardData,
    isLoading,
    error,
    setDashboardData,
    setLoading,
    setError,
  } = useWorkerDashboardStore();

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await workerDashboardService.getWorkerDashboard();

      if (response.success && response.data) {
        setDashboardData(response.data);
      }
    } catch (err: unknown) {
      const apiErr = err as ApiErrorResponse;
      const message =
        apiErr?.response?.data?.message || "Failed to load dashboard data";

      setError(message);
      toast.error(message);
    }
  }, [setLoading, setError, setDashboardData]);

  return {
    dashboardData,
    isLoading,
    error,
    fetchDashboard,
  };
}
