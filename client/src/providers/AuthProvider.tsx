"use client";

import { useEffect, useState } from "react";

import { authService } from "@/services/auth/auth.service";
import { useAuthStore } from "@/store/auth.store";
import Spinner from "@/components/ui/Spinner";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({
  children,
}: AuthProviderProps) {
  const { setUser, logout } = useAuthStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if token exists in localStorage before making network request
        let hasToken = false;
        if (typeof window !== "undefined") {
          const raw = localStorage.getItem("bincoz-auth-storage");
          if (raw) {
            try {
              const parsed = JSON.parse(raw);
              if (parsed?.state?.token) {
                hasToken = true;
              }
            } catch {
              // ignore JSON parse errors
            }
          }
        }

        // If user is not logged in (no token), don't block page render with backend call
        if (!hasToken) {
          setLoading(false);
          return;
        }

        const response: any = await authService.getCurrentUser();
        const fetchedUser = response?.user || response?.data?.user;

        if (fetchedUser) {
          setUser(fetchedUser);
        }
      } catch (error: any) {
        // Clear session if server explicitly returns 401 Unauthorized
        if (error.response?.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [setUser, logout]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return children;
}