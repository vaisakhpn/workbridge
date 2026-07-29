import axiosInstance from "@/lib/axios";
import type { MyApplicationsApiResponse } from "@/types/application.types";

export const applicationService = {
  getMyApplications: async (): Promise<MyApplicationsApiResponse> => {
    const response = await axiosInstance.get<MyApplicationsApiResponse>(
      "/applications/my-applications"
    );
    return response.data;
  },
};
