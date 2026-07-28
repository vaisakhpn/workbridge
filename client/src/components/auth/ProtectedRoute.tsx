"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";
import Spinner from "../ui/Spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("worker" | "eventTeam" | "admin")[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const router = useRouter();

  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Not logged in
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // Logged in but wrong role
    if (
      allowedRoles &&
      user &&
      !allowedRoles.includes(user.role)
    ) {
      router.replace("/");
    }
  }, [isAuthenticated, user, allowedRoles, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (
    allowedRoles &&
    user &&
    !allowedRoles.includes(user.role)
  ) {
    return null;
  }

  return <>{children}</>;
}