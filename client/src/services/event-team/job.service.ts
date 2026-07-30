import axiosInstance from "@/lib/axios";
import type {
  CreateJobInput,
  CreateJobApiResponse,
  GetMyJobsApiResponse,
  Job,
} from "@/types/job.types";

export const jobService = {
  getPublicLatestJobs: async (
    limit: number = 4
  ): Promise<{ success: boolean; data: Job[] }> => {
    const response = await axiosInstance.get<{
      success: boolean;
      data: Job[];
    }>(`/jobs/public/latest?limit=${limit}`);
    return response.data;
  },

  createJob: async (data: CreateJobInput): Promise<CreateJobApiResponse> => {
    const response = await axiosInstance.post<CreateJobApiResponse>(
      "/jobs",
      data
    );
    return response.data;
  },

  getMyJobs: async (): Promise<GetMyJobsApiResponse> => {
    const response = await axiosInstance.get<GetMyJobsApiResponse>(
      "/jobs/my-jobs"
    );
    return response.data;
  },

  getJobById: async (jobId: string): Promise<{ success: boolean; data: Job }> => {
    const response = await axiosInstance.get<{ success: boolean; data: Job }>(
      `/jobs/${jobId}`
    );
    return response.data;
  },

  updateJob: async (
    jobId: string,
    data: Partial<CreateJobInput>
  ): Promise<{ success: boolean; message: string; data: Job }> => {
    const response = await axiosInstance.put<{
      success: boolean;
      message: string;
      data: Job;
    }>(`/jobs/${jobId}`, data);
    return response.data;
  },

  deleteJob: async (jobId: string): Promise<{ success: boolean; message: string }> => {
    const response = await axiosInstance.delete<{ success: boolean; message: string }>(
      `/jobs/${jobId}`
    );
    return response.data;
  },
};
