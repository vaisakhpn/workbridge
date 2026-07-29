import ApplicationsContainer from "@/components/applications/ApplicationsContainer";

interface JobApplicationsPageProps {
  params: Promise<{ jobId: string }>;
}

export default async function JobApplicationsPage({
  params,
}: JobApplicationsPageProps) {
  const { jobId } = await params;
  return <ApplicationsContainer jobId={jobId} />;
}
