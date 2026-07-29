export type JobStatus = "OPEN" | "FILLED" | "COMPLETED" | "CANCELLED";

export interface Job {
  _id: string;
  createdBy: string;
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
}

export interface CreateJobInput {
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
