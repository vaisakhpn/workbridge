"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Building, MapPin } from "lucide-react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import {
  KERALA_DISTRICTS,
  type CreateJobFormData,
} from "@/schemas/job.schema";

interface LocationSectionProps {
  register: UseFormRegister<CreateJobFormData>;
  errors: FieldErrors<CreateJobFormData>;
}

export function LocationSection({ register, errors }: LocationSectionProps) {
  return (
    <Card className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Location
        </h2>
        <p className="text-xs text-muted-foreground">
          Set the event location & venue address.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* District Select Dropdown */}
        <Select
          label="District"
          required
          placeholder="Select a district"
          options={KERALA_DISTRICTS}
          leftIcon={<Building size={18} />}
          error={errors.district?.message}
          {...register("district")}
        />

        {/* Location Input */}
        <Input
          label="Specific Location / Venue"
          required
          placeholder="e.g. Calicut Trade Centre, Kozhikode"
          leftIcon={<MapPin size={18} />}
          error={errors.location?.message}
          {...register("location")}
        />
      </div>
    </Card>
  );
}
