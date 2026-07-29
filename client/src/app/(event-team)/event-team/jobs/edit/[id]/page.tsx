import EditJobForm from "@/components/jobs/edit/EditJobForm";

interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { id } = await params;
  return <EditJobForm jobId={id} />;
}
