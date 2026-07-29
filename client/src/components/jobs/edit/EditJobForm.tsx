"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { useEditJob } from "@/hooks/useEditJob";
import {
  createJobSchema,
  type CreateJobFormData,
} from "@/schemas/job.schema";

import { BasicInformationSection } from "../create/BasicInformationSection";
import { ScheduleSection } from "../create/ScheduleSection";
import { LocationSection } from "../create/LocationSection";
import { WorkerSection } from "../create/WorkerSection";
import { FormSkeleton } from "@/components/ui/skeletons";

interface EditJobFormProps {
  jobId: string;
}

export function EditJobForm({ jobId }: EditJobFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      date: "",
      startTime: "09:00",
      endTime: "17:00",
      district: "",
      location: "",
      workersNeeded: 1,
      salary: 1000,
    },
  });

  const { isLoading, isSubmitting, error, updateJob, fetchJob } = useEditJob(
    jobId,
    reset
  );

  const onSubmit = async (data: CreateJobFormData) => {
    await updateJob(data);
  };


  if (isLoading) {
    return <FormSkeleton />;
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center p-6 text-center">
        <div className="bg-destructive/10 text-destructive mb-4 rounded-full p-3">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold">Unable to load job</h2>
        <p className="text-muted-foreground mt-1 text-sm">{error}</p>
        <Button
          onClick={fetchJob}
          variant="primary"
          size="sm"
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-16">
      {/* Back Link & Header */}
      <div className="space-y-2">
        <Link
          href="/event-team/jobs"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Manage Jobs
        </Link>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Update Job
          </h1>
          <p className="text-sm text-muted-foreground">
            Modify requirements, date schedule, location, or salary for this job listing.
          </p>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section 1: Basic Information */}
        <BasicInformationSection
          register={register}
          errors={errors}
          watch={watch}
        />

        {/* Section 2: Schedule */}
        <ScheduleSection register={register} errors={errors} />

        {/* Section 3: Location */}
        <LocationSection register={register} errors={errors} />

        {/* Section 4: Workers & Salary */}
        <WorkerSection register={register} errors={errors} />

        {/* Action Button Bar */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            loadingText="Saving Changes..."
            variant="primary"
            size="lg"
            leftIcon={<Save size={18} />}
            className="w-full sm:w-auto px-8 font-semibold shadow-md"
          >
            Update Job
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditJobForm;
