import type { ReactNode } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { WorkerLayout } from "@/components/layout/worker/WorkerLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["worker"]}>
      <WorkerLayout>{children}</WorkerLayout>
    </ProtectedRoute>
  );
}
