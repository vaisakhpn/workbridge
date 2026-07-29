import axiosInstance from "@/lib/axios";
import type { EventTeamDashboardApiResponse } from "@/types/eventTeamDashboard.types";

export const eventTeamDashboardService = {
  getEventTeamDashboard: async (): Promise<EventTeamDashboardApiResponse> => {
    const response = await axiosInstance.get<EventTeamDashboardApiResponse>(
      "/dashboard/event-team"
    );
    return response.data;
  },
};
