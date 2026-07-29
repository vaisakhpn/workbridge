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

export interface EventTeamDashboardData {
  stats: EventTeamDashboardStats;
}

export interface EventTeamDashboardApiResponse {
  success: boolean;
  message: string;
  data: EventTeamDashboardData;
}
