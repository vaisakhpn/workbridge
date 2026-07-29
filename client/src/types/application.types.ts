export type ApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
export type ApplicationStatusType = "PENDING" | "ACCEPTED" | "REJECTED";
export type ApplicationFilterStatus = "ALL" | "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";

export interface WorkerInfo {
  _id: string;
  email: string;
  role: string;
  name?: string;
  phone?: string;
  photo?: string;
  district?: string;
  currentLocation?: string;
  rating?: number;
  jobsCompleted?: number;
  badge?: string;
  isIdentityVerified?: boolean;
  skills?: string[];
  languages?: string[];
  bio?: string;
  attendanceRate?: number;
}

export interface JobApplication {
  _id: string;
  job: string;
  worker: WorkerInfo | string;
  status: ApplicationStatusType;
  attendance?: boolean;
  attendanceMarkedAt?: string;
  rating?: number;
  ratedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkerApplication {
  _id: string;
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  job: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  worker: any;
  status: ApplicationStatus;
  attendance?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetJobApplicantsApiResponse {
  success: boolean;
  message: string;
  results: number;
  data: JobApplication[];
}

export interface MyApplicationsApiResponse {
  success: boolean;
  message: string;
  results: number;
  data: WorkerApplication[];
}

export interface UpdateApplicationStatusInput {
  status: ApplicationStatusType;
}

export interface UpdateApplicationStatusApiResponse {
  success: boolean;
  message: string;
  data: JobApplication;
}
