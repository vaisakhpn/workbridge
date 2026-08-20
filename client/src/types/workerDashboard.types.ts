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

export interface RecentNotificationItem {
  id: string | number;
  title: string;
  time: string;
  isUnread?: boolean;
}

export interface WorkerDashboardData {
  profile: WorkerDashboardProfile;
  stats: WorkerDashboardStats;
  recentNotifications?: RecentNotificationItem[];
}

export interface WorkerDashboardApiResponse {
  success: boolean;
  message: string;
  data: WorkerDashboardData;
}


