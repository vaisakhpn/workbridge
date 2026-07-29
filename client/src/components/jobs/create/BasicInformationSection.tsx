"use client";

import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { FileText, Layers } from "lucide-react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import {
  JOB_CATEGORIES,
  type CreateJobFormData,
} from "@/schemas/job.schema";

interface BasicInformationSectionProps {
  register: UseFormRegister<CreateJobFormData>;
  errors: FieldErrors<CreateJobFormData>;
  watch: UseFormWatch<CreateJobFormData>;
}

export function BasicInformationSection({
  register,
  errors,
  watch,
}: BasicInformationSectionProps) {
  const descriptionValue = watch("description") || "";

  return (
    <Card className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Basic Information
        </h2>
        <p className="text-xs text-muted-foreground">
          Provide key details about the event role requirement.
        </p>
      </div>

      <div className="space-y-4">
        {/* Job Title */}
        <Input
          label="Job Title"
          required
          placeholder="e.g. Wedding Catering Staff"
          leftIcon={<FileText size={18} />}
          error={errors.title?.message}
          {...register("title")}
        />

        {/* Category Dropdown */}
        <Select
          label="Category"
          required
          placeholder="Select a category"
          options={JOB_CATEGORIES}
          leftIcon={<Layers size={18} />}
          error={errors.category?.message}
          {...register("category")}
        />

        {/* Description Textarea */}
        <Textarea
          label="Description"
          required
          placeholder="Describe the job duties, requirements, dress code, etc."
          rows={4}
          maxLength={1000}
          currentLength={descriptionValue.length}
          error={errors.description?.message}
          {...register("description")}
        />
      </div>
    </Card>
  );
}
