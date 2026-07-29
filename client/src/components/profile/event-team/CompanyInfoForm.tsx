"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, User, Phone, FileCheck } from "lucide-react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import {
  companyInfoSchema,
  type CompanyInfoFormData,
} from "@/schemas/eventTeamProfile.schema";
import type {
  EventTeamProfile,
  UpdateEventTeamProfileInput,
} from "@/types/eventTeamProfile.types";

interface CompanyInfoFormProps {
  profile: EventTeamProfile;
  onSubmit: (data: UpdateEventTeamProfileInput) => Promise<void>;
  isLoading?: boolean;
}

export function CompanyInfoForm({
  profile,
  onSubmit,
  isLoading = false,
}: CompanyInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CompanyInfoFormData>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      companyName: profile.companyName || "",
      ownerName: profile.ownerName || "",
      phone: profile.phone || "",
      gst: profile.gst || "",
    },
  });

  const handleFormSubmit = async (data: CompanyInfoFormData) => {
    await onSubmit(data);
  };

  return (
    <Card className="space-y-6 p-6">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-foreground text-lg font-semibold tracking-tight">
            Company Information
          </h2>
          <p className="text-muted-foreground text-xs">
            Update your organization details, representative name, and contact info.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Company Name */}
          <Input
            label="Company / Agency Name"
            placeholder="e.g. Malabar Event Management"
            leftIcon={<Building2 size={18} />}
            error={errors.companyName?.message}
            {...register("companyName")}
          />

          {/* Owner / Representative Name */}
          <Input
            label="Owner / Contact Person"
            placeholder="Enter representative full name"
            leftIcon={<User size={18} />}
            error={errors.ownerName?.message}
            {...register("ownerName")}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Phone Number */}
          <Input
            label="Phone Number"
            type="tel"
            placeholder="9876543210"
            leftIcon={<Phone size={18} />}
            error={errors.phone?.message}
            {...register("phone")}
          />

          {/* GST Number */}
          <Input
            label="GST Registration Number (Optional)"
            placeholder="e.g. 32ABCDE1234F1Z5"
            leftIcon={<FileCheck size={18} />}
            error={errors.gst?.message}
            {...register("gst")}
          />
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
            Save Company Info
          </Button>
        </div>
      </form>
    </Card>
  );
}
