import axiosInstance from "@/lib/axios";
import type {
  GetEventTeamProfileApiResponse,
  UpdateEventTeamProfileInput,
  UpdateEventTeamProfileApiResponse,
} from "@/types/eventTeamProfile.types";

export const eventTeamProfileService = {
  getProfile: async (): Promise<GetEventTeamProfileApiResponse> => {
    const response = await axiosInstance.get<GetEventTeamProfileApiResponse>(
      "/event-team/profile"
    );
    return response.data;
  },

  updateProfile: async (
    data: UpdateEventTeamProfileInput
  ): Promise<UpdateEventTeamProfileApiResponse> => {
    const response = await axiosInstance.put<UpdateEventTeamProfileApiResponse>(
      "/event-team/profile/update",
      data
    );
    return response.data;
  },
};
