export interface WorkerDashboardProfile {
  name: string;
  badge: "Beginner" | "Bronze" | "Silver" | "Gold" | "Platinum";
  rating: number;
  experienceScore: number;
  jobsCompleted: number;
}

export interface WorkerDashboardStats {
  jobsApplied: number;
  pending: number;
  accepted: number;
  rejected: number;
}

export interface WorkerDashboardData {
  profile: WorkerDashboardProfile;
  stats: WorkerDashboardStats;
}

export interface WorkerDashboardApiResponse {
  success: boolean;
  message: string;
  data: WorkerDashboardData;
}
