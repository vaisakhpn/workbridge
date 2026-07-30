import { Suspense } from "react";
import JobSearchContainer from "@/components/jobs/search/JobSearchContainer";
import Spinner from "@/components/ui/Spinner";

export default function JobSearchPage() {
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
