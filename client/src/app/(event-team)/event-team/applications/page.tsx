import { redirect } from "next/navigation";
import ApplicationsContainer from "@/components/applications/ApplicationsContainer";

interface ApplicationsPageProps {
  searchParams: Promise<{ jobId?: string }>;
}

export default async function ApplicationsPage({
  searchParams,
}: ApplicationsPageProps) {
  const { jobId } = await searchParams;

  if (!jobId) {
    redirect("/event-team/jobs");
  }

  return <ApplicationsContainer jobId={jobId} />;
}
