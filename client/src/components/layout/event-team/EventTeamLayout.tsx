"use client";

import { eventTeamNavigation } from "@/constants/navigation";
import { AppSidebar } from "../shared/AppSidebar";
import { AppHeader } from "../shared/AppHeader";

interface EventTeamLayoutProps {
  children: React.ReactNode;
}

export function EventTeamLayout({ children }: EventTeamLayoutProps) {
  return (
    <div className="bg-background flex h-screen overflow-hidden">
      {/* Shared Desktop Sidebar */}
      <AppSidebar navigationItems={eventTeamNavigation} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader navigationItems={eventTeamNavigation} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default EventTeamLayout;
