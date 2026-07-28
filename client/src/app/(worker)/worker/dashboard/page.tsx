"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Button from "@/components/ui/Button";
import { useLogout } from "@/hooks/useLogout";

export default function WorkerDashboard() {
  const { logout } = useLogout();
  return (
    <ProtectedRoute allowedRoles={["worker"]}>
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Worker Dashboard
          <Button onClick={logout}>Log out</Button>
        </h1>
      </div>
    </ProtectedRoute>
  );
}
