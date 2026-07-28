import axiosInstance from "@/lib/axios";
import { LoginRequest, AuthResponse } from "./auth.types";

export const authService = {
  login: async (data: LoginRequest) => {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      data
    );

    return response.data;
  },
  getCurrentUser: async () => {
    const response = await axiosInstance.get<AuthResponse>("/auth/me");

    return response.data;
  },
   logout: async () => {
    const response = await axiosInstance.post("/auth/logout");

    return response.data;
  },
};
