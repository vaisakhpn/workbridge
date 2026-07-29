import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { UseFormReset } from "react-hook-form";

import { jobService } from "@/services/event-team/job.service";
import type { Job, CreateJobInput } from "@/types/job.types";
import type { CreateJobFormData } from "@/schemas/job.schema";

interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useEditJob(
  jobId: string,
  resetForm?: UseFormReset<CreateJobFormData>
) {
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadJobDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await jobService.getJobById(jobId);

      if (response.success && response.data) {
        const fetchedJob = response.data;
        setJob(fetchedJob);

        if (resetForm) {
          const isoDate = fetchedJob.date
            ? new Date(fetchedJob.date).toISOString().split("T")[0]
            : "";

          resetForm({
            title: fetchedJob.title || "",
            category: fetchedJob.category || "",
            description: fetchedJob.description || "",
            date: isoDate,
            startTime: fetchedJob.startTime || "09:00",
            endTime: fetchedJob.endTime || "17:00",
            district: fetchedJob.district || "",
            location: fetchedJob.location || "",
            workersNeeded: fetchedJob.workersNeeded || 1,
            salary: fetchedJob.salary || 1000,
          });
        }
      }
    } catch (err: unknown) {
      const apiErr = err as ApiErrorResponse;
      const message =
        apiErr?.response?.data?.message || "Failed to load job details";

      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [jobId, resetForm]);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const response = await jobService.getJobById(jobId);

        if (isMounted && response.success && response.data) {
          const fetchedJob = response.data;
          setJob(fetchedJob);

          if (resetForm) {
            const isoDate = fetchedJob.date
              ? new Date(fetchedJob.date).toISOString().split("T")[0]
              : "";

            resetForm({
              title: fetchedJob.title || "",
              category: fetchedJob.category || "",
              description: fetchedJob.description || "",
              date: isoDate,
              startTime: fetchedJob.startTime || "09:00",
              endTime: fetchedJob.endTime || "17:00",
              district: fetchedJob.district || "",
              location: fetchedJob.location || "",
              workersNeeded: fetchedJob.workersNeeded || 1,
              salary: fetchedJob.salary || 1000,
            });
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          const apiErr = err as ApiErrorResponse;
          const message =
            apiErr?.response?.data?.message || "Failed to load job details";

          setError(message);
          toast.error(message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [jobId, resetForm]);

  const updateJob = useCallback(
    async (data: CreateJobInput) => {
      try {
        setIsSubmitting(true);

        const response = await jobService.updateJob(jobId, data);

        if (response.success) {
          toast.success("Job updated successfully!");
          router.push("/event-team/jobs");
        }
      } catch (err: unknown) {
        const apiErr = err as ApiErrorResponse;
        toast.error(
          apiErr?.response?.data?.message || "Failed to update job. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [jobId, router]
  );

  return {
    job,
    isLoading,
    isSubmitting,
    error,
    fetchJob: loadJobDetails,
    updateJob,
  };
}
