"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { useCreateJob } from "@/hooks/useCreateJob";
import {
  createJobSchema,
  isScheduleRequiredCategory,
  type CreateJobFormData,
} from "@/schemas/job.schema";

import { BasicInformationSection } from "./BasicInformationSection";
import { ScheduleSection } from "./ScheduleSection";
import { LocationSection } from "./LocationSection";
import { WorkerSection } from "./WorkerSection";

export function CreateJobForm() {
  const { createJob, isSubmitting } = useCreateJob();

  const {
    register,
    handleSubmit,
    watch,
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

  const selectedCategory = watch("category");
  const customCategory = watch("customCategory");
  const showSchedule = isScheduleRequiredCategory(selectedCategory, customCategory);

  const onSubmit = async (data: CreateJobFormData) => {
    const finalCategory =
      data.category === "Others" && data.customCategory
        ? data.customCategory.trim()
        : data.category;

    const payload = {
      ...data,
      category: finalCategory,
    };

    await createJob(payload);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-16">
      {/* Back Link & Header */}
      <div className="space-y-2">
        <Link
          href="/event-team/dashboard"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Dashboard
        </Link>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Create Job
          </h1>
          <p className="text-sm text-muted-foreground">
            Fill out the details below to post a new event job requirement for workers.
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

        {/* Section 2: Schedule (Shown only for Catering & Events) */}
        {showSchedule && (
          <ScheduleSection register={register} errors={errors} />
        )}


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
            loadingText="Publishing Job..."
            variant="primary"
            size="lg"
            leftIcon={<Send size={18} />}
            className="w-full sm:w-auto px-8 font-semibold shadow-md"
          >
            Publish Job
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateJobForm;
