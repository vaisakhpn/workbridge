import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  role: "worker" | "eventTeam" | "admin";
  isProfileSetup: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));