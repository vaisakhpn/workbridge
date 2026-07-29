import { EventTeamLayout } from "@/components/layout/event-team/EventTeamLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface LayoutProps {
  children: React.ReactNode;
}

export default function EventTeamAppLayout({ children }: LayoutProps) {
  return (
    <ProtectedRoute allowedRoles={["eventTeam"]}>
      <EventTeamLayout>{children}</EventTeamLayout>
    </ProtectedRoute>
  );
}
