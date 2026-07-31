export type JobStatus = "OPEN" | "FILLED" | "COMPLETED" | "CANCELLED";

export interface EventTeamInfo {
  companyName: string;
  ownerName?: string;
  logo?: string;
  district?: string;
  rating?: number;
}

export interface Job {
  _id: string;
  createdBy: string | { _id?: string; email?: string };
  title: string;
  description: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  district: string;
  location: string;
  workersNeeded: number;
  salary: number;
  status: JobStatus;
  applicationsCount: number;
  createdAt: string;
  updatedAt: string;
  eventTeam?: EventTeamInfo | null;
}

export interface CreateJobInput {
  title: string;
  description?: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  district: string;
  location: string;
  workersNeeded: number;
  salary: number;
}

export interface CreateJobApiResponse {
  success: boolean;
  message: string;
  data: Job;
}

export interface GetMyJobsApiResponse {
  success: boolean;
  message: string;
  results: number;
  data: Job[];
}

export interface SearchJobsParams {
  search?: string;
  district?: string;
  category?: string;
  salaryMin?: number;
  salaryMax?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface SearchJobsApiResponse {
  success: boolean;
  message: string;
  page: number;
  limit: number;
  totalJobs: number;
  totalPages: number;
  results: number;
  data: Job[];
}
