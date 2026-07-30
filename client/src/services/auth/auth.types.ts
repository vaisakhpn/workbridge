export interface LoginRequest {
  email: string;
  password: string;
}

export interface WorkerSignupRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface CompanySignupRequest {
  companyName: string;
  ownerName: string;
  email: string;
  phone: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  role: "worker" | "eventTeam" | "admin";
  isProfileSetup: boolean;
}

export interface AuthResponse {
  success?: boolean;
  message: string;
  user: User;
  accessToken?: string;
  refreshToken?: string;
}
