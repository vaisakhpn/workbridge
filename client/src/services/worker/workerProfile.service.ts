import axiosInstance from "@/lib/axios";
import type {
  WorkerProfileApiResponse,
  UpdateWorkerProfileApiResponse,
  UpdateWorkerProfileInput,
} from "@/types/workerProfile.types";

export const workerProfileService = {
  getProfile: async (): Promise<WorkerProfileApiResponse> => {
    const response = await axiosInstance.get<WorkerProfileApiResponse>(
      "/worker/profile"
    );
    return response.data;
  },

  updateProfile: async (
    data: UpdateWorkerProfileInput
  ): Promise<UpdateWorkerProfileApiResponse> => {
    const response = await axiosInstance.put<UpdateWorkerProfileApiResponse>(
      "/worker/profile/update",
      data
    );
    return response.data;
  },
};
