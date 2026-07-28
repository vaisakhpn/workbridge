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
  const setUser = useAuthStore((state) => state.setUser);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await authService.getCurrentUser();

        setUser(response.user);
      } catch {
        // No active session.
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [setUser]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return children;
}