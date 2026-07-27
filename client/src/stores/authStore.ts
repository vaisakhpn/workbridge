import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "worker" | "eventTeam" | "admin";
  phone?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Safe load of token and user from localStorage on init
  let initialToken = null;
  let initialUser = null;

  if (typeof window !== "undefined") {
    initialToken = localStorage.getItem("workbridge_token");
    const userStr = localStorage.getItem("workbridge_user");
    if (userStr) {
      try {
        initialUser = JSON.parse(userStr);
      } catch {
        // Clear corrupt data
        localStorage.removeItem("workbridge_user");
      }
    }
  }

  return {
    user: initialUser,
    token: initialToken,
    isAuthenticated: !!initialToken,
    isLoading: false,

    login: (user, token) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("workbridge_token", token);
        localStorage.setItem("workbridge_user", JSON.stringify(user));
      }
      set({ user, token, isAuthenticated: true });
    },

    logout: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("workbridge_token");
        localStorage.removeItem("workbridge_user");
      }
      set({ user: null, token: null, isAuthenticated: false });
    },

    setLoading: (isLoading) => set({ isLoading }),

    updateUser: (updatedUser) => {
      set((state) => {
        if (!state.user) return state;
        const newUserData = { ...state.user, ...updatedUser };
        if (typeof window !== "undefined") {
          localStorage.setItem("workbridge_user", JSON.stringify(newUserData));
        }
        return { user: newUserData };
      });
    },
  };
});
