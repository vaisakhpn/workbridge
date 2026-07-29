export type ApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED";
export type ApplicationFilterStatus = "ALL" | "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";

export interface JobInApplication {
  _id: string;
  createdBy: {
    _id: string;
    email: string;
    name?: string;
  } | string;
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
  status: "OPEN" | "FILLED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
}

export interface WorkerApplication {
  _id: string;
  job: JobInApplication;
  worker: string;
  status: ApplicationStatus;
  attendance: boolean;
  attendanceMarkedAt?: string;
  rating?: number;
  ratedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyApplicationsApiResponse {
  success: boolean;
  message: string;
  results: number;
  data: WorkerApplication[];
}
