"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText } from "lucide-react";

import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

import {
  bioSchema,
  type BioFormData,
} from "@/schemas/workerProfile.schema";
import type {
  UpdateWorkerProfileInput,
  WorkerProfile,
} from "@/types/workerProfile.types";

interface BioSectionProps {
  profile: WorkerProfile;
  onSubmit: (data: UpdateWorkerProfileInput) => Promise<void>;
  isLoading?: boolean;
}

const MAX_BIO_LENGTH = 500;

export function BioSection({
  profile,
  onSubmit,
  isLoading = false,
}: BioSectionProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<BioFormData>({
    resolver: zodResolver(bioSchema),
    defaultValues: {
      bio: profile.bio || "",
    },
  });

  const currentBio = useWatch({ control, name: "bio" }) || "";

  const handleFormSubmit = async (data: BioFormData) => {
    await onSubmit({ bio: data.bio });
  };

  return (
    <Card className="space-y-6 p-6">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-foreground flex items-center gap-2 text-lg font-semibold tracking-tight">
            <FileText className="text-primary h-5 w-5" />
            About & Bio
          </h2>
          <p className="text-muted-foreground text-xs">
            Write a short introduction about your experience, work ethic, and background.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2">
        <textarea
          rows={4}
          maxLength={MAX_BIO_LENGTH}
          placeholder="Tell event organizers about your work experience, punctuality, and specialties..."
          className="border-border bg-background focus:border-primary min-h-24 w-full rounded-md border p-3 text-sm transition-colors outline-hidden resize-y"
          {...register("bio")}
        />

        {errors.bio?.message && (
          <p className="text-destructive text-sm">{errors.bio.message}</p>
        )}

        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <span>Organizers view this bio on your job application profiles.</span>
          <span className={currentBio.length >= MAX_BIO_LENGTH ? "text-destructive font-semibold" : ""}>
            {currentBio.length} / {MAX_BIO_LENGTH}
          </span>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={!isDirty || isLoading}
            loading={isLoading}
            loadingText="Saving..."
            variant="primary"
            size="sm"
          >
            Save Bio
          </Button>
        </div>
      </form>
    </Card>
  );
}
