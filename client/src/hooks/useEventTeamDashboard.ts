import { useCallback } from "react";
import { toast } from "sonner";

import { eventTeamDashboardService } from "@/services/event-team/eventTeamDashboard.service";
import { useEventTeamDashboardStore } from "@/store/eventTeamDashboard.store";

interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useEventTeamDashboard() {
  const {
    dashboardData,
    isLoading,
    error,
    setDashboardData,
    setLoading,
    setError,
  } = useEventTeamDashboardStore();

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await eventTeamDashboardService.getEventTeamDashboard();

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
