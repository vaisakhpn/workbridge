"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function WorkerDashboard() {
  return (
    <ProtectedRoute allowedRoles={["worker"]}>
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Worker Dashboard
        </h1>
      </div>
    </ProtectedRoute>
  );
}