"use client";

import { WorkerHeader } from "./WorkerHeader";
import { WorkerSidebar } from "./WorkerSidebar";

interface WorkerLayoutProps {
  children: React.ReactNode;
}

export function WorkerLayout({ children }: WorkerLayoutProps) {
  return (
    <div className="bg-background flex min-h-screen">
      {/* Desktop Sidebar */}
      <WorkerSidebar />

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <WorkerHeader />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
export default WorkerLayout;
