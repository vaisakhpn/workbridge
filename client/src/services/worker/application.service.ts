import axiosInstance from "@/lib/axios";
import type { MyApplicationsApiResponse } from "@/types/application.types";

export const applicationService = {
  applyForJob: async (
    jobId: string
  ): Promise<{ success: boolean; message: string; data?: any }> => {
    const response = await axiosInstance.post<{
      success: boolean;
      message: string;
      data?: any;
    }>(`/applications/${jobId}`);
    return response.data;
  },

  getMyApplications: async (): Promise<MyApplicationsApiResponse> => {
    const response = await axiosInstance.get<MyApplicationsApiResponse>(
      "/applications/my-applications"
    );
    return response.data;
  },
};
