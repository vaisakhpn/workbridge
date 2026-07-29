import axiosInstance from "@/lib/axios";
import type { WorkerDashboardApiResponse } from "@/types/workerDashboard.types";

export const workerDashboardService = {
  getWorkerDashboard: async (): Promise<WorkerDashboardApiResponse> => {
    const response = await axiosInstance.get<WorkerDashboardApiResponse>(
      "/dashboard/worker"
    );
    return response.data;
  },
};
