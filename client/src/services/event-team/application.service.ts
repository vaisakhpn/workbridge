import axiosInstance from "@/lib/axios";
import type {
  GetJobApplicantsApiResponse,
  UpdateApplicationStatusInput,
  UpdateApplicationStatusApiResponse,
} from "@/types/application.types";

export const applicationService = {
  getApplicantsByJob: async (
    jobId: string
  ): Promise<GetJobApplicantsApiResponse> => {
    const response = await axiosInstance.get<GetJobApplicantsApiResponse>(
      `/applications/job/${jobId}`
    );
    return response.data;
  },

  updateApplicationStatus: async (
    applicationId: string,
    data: UpdateApplicationStatusInput
  ): Promise<UpdateApplicationStatusApiResponse> => {
    const response = await axiosInstance.patch<UpdateApplicationStatusApiResponse>(
      `/applications/${applicationId}/status`,
      data
    );
    return response.data;
  },
};
