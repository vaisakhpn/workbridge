"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Phone, Calendar } from "lucide-react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import {
  personalInfoSchema,
  type PersonalInfoFormData,
} from "@/schemas/workerProfile.schema";
import type {
  UpdateWorkerProfileInput,
  WorkerProfile,
} from "@/types/workerProfile.types";

interface PersonalInfoFormProps {
  profile: WorkerProfile;
  onSubmit: (data: UpdateWorkerProfileInput) => Promise<void>;
  isLoading?: boolean;
}

export function PersonalInfoForm({
  profile,
  onSubmit,
  isLoading = false,
}: PersonalInfoFormProps) {
  const initialDob = profile.dob
    ? new Date(profile.dob).toISOString().split("T")[0]
    : "";

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: profile.name || "",
      phone: profile.phone || "",
      dob: initialDob,
      gender: profile.gender || "male",
      experienceLevel: profile.experienceLevel || "beginner",
    },
  });

  const handleFormSubmit = async (data: PersonalInfoFormData) => {
    const formattedDob = data.dob ? new Date(data.dob).toISOString() : undefined;

    await onSubmit({
      name: data.name,
      phone: data.phone,
      dob: formattedDob,
      gender: data.gender,
      experienceLevel: data.experienceLevel,
    });
  };

  return (
    <Card className="space-y-6 p-6">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-foreground text-lg font-semibold tracking-tight">
            Personal Information
          </h2>
          <p className="text-muted-foreground text-xs">
            Update your basic details and contact numbers.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            leftIcon={<User size={18} />}
            error={errors.name?.message}
            {...register("name")}
          />

          {/* Phone */}
          <Input
            label="Phone Number"
            type="tel"
            placeholder="9876543210"
            leftIcon={<Phone size={18} />}
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {/* DOB */}
          <Input
            label="Date of Birth"
            type="date"
            leftIcon={<Calendar size={18} />}
            error={errors.dob?.message}
            {...register("dob")}
          />

          {/* Gender */}
          <div className="w-full">
            <label className="text-foreground mb-2 block text-sm font-medium">
              Gender
            </label>
            <select
              {...register("gender")}
              className="border-border bg-background focus:border-primary flex h-10 w-full rounded-md border px-3 text-sm transition-colors outline-hidden"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Experience Level */}
          <div className="w-full">
            <label className="text-foreground mb-2 block text-sm font-medium">
              Experience Level
            </label>
            <select
              {...register("experienceLevel")}
              className="border-border bg-background focus:border-primary flex h-10 w-full rounded-md border px-3 text-sm transition-colors outline-hidden"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
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
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
}
