export interface LoginRequest {
  email: string;
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
