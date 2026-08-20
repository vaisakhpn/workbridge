import { Suspense } from "react";
import JobSearchContainer from "@/components/jobs/search/JobSearchContainer";
import Spinner from "@/components/ui/Spinner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Part-Time Jobs & Openings Near Me",
  description:
    "Browse and apply for verified part-time jobs, daily wage work, catering staff, retail, and event staffing across Kerala on Bincoz.",
  alternates: {
    canonical: "https://www.bincoz.in/jobs",
  },
};

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <JobSearchContainer />
    </Suspense>
  );
}
