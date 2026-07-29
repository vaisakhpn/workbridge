import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { jobService } from "@/services/event-team/job.service";
import type { CreateJobInput } from "@/types/job.types";

interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useCreateJob() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createJob = useCallback(
    async (data: CreateJobInput) => {
      try {
        setIsSubmitting(true);

        const response = await jobService.createJob(data);

        if (response.success) {
          toast.success("Job listing created & published successfully!");
          router.push("/event-team/dashboard");
        }
      } catch (err: unknown) {
        const apiErr = err as ApiErrorResponse;
        toast.error(
          apiErr?.response?.data?.message || "Failed to create job. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [router]
  );

  return {
    createJob,
    isSubmitting,
  };
}
