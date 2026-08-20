export interface EventTeamDashboardStats {
  jobsPosted: number;
  openJobs: number;
  filledJobs: number;
  completedJobs: number;
  totalApplicants: number;
  acceptedWorkers: number;
  rejectedWorkers: number;
  pendingApplications: number;
}

export interface RecentJobItem {
  id: string | number;
  title: string;
  location: string;
  district?: string;
  workersNeeded: number;
  applicantsCount: number;
  status: "OPEN" | "FILLED" | "COMPLETED" | "CANCELLED";
}

export interface RecentApplicationItem {
  id: string | number;
  workerName: string;
  jobTitle: string;
  appliedTime: string;
}

export interface EventTeamDashboardData {
  stats: EventTeamDashboardStats;
  recentJobs?: RecentJobItem[];
  recentApplications?: RecentApplicationItem[];
}

export interface EventTeamDashboardApiResponse {
  success: boolean;
  message: string;
  data: EventTeamDashboardData;
}

