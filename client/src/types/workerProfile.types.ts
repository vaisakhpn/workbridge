export type Gender = "male" | "female" | "other";
export type ExperienceLevel = "beginner" | "intermediate" | "expert";
export type WorkerBadge = "Beginner" | "Bronze" | "Silver" | "Gold" | "Platinum";

export interface WorkerProfile {
  _id: string;
  user: string;

  name: string;
  phone: string;
  photo?: string;

  dob?: string;
  gender?: Gender;

  address?: string;
  district?: string;
  currentLocation?: string;
  pincode?: string;

  languages: string[];
  skills: string[];

  availability: boolean;
  bio?: string;

  experienceLevel: ExperienceLevel;

  jobsCompleted: number;
  cancelledJobs: number;

  rating: number;
  attendanceRate: number;
  experienceScore: number;

  badge: WorkerBadge;
  isIdentityVerified: boolean;

  lastSeen?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkerProfileResponseData {
  id: string;
  email: string;
  role: string;
  isProfileSetup: boolean;
  isVerified: boolean;
  profile: WorkerProfile;
}

export interface WorkerProfileApiResponse {
  success: boolean;
  message: string;
  data: WorkerProfileResponseData;
}

export interface UpdateWorkerProfileApiResponse {
  success: boolean;
  message: string;
  data: WorkerProfile;
}

export interface UpdateWorkerProfileInput {
  name?: string;
  phone?: string;
  photo?: string;
  dob?: string;
  gender?: Gender;
  address?: string;
  district?: string;
  currentLocation?: string;
  pincode?: string;
  languages?: string[];
  skills?: string[];
  availability?: boolean;
  bio?: string;
  experienceLevel?: ExperienceLevel;
}
