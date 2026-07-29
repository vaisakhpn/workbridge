"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Calendar, Clock } from "lucide-react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import type { CreateJobFormData } from "@/schemas/job.schema";

interface ScheduleSectionProps {
  register: UseFormRegister<CreateJobFormData>;
  errors: FieldErrors<CreateJobFormData>;
}

export function ScheduleSection({ register, errors }: ScheduleSectionProps) {
  return (
    <Card className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Schedule
        </h2>
        <p className="text-xs text-muted-foreground">
          Specify event date and working shift hours.
        </p>
      </div>

      <div className="space-y-4">
        {/* Date */}
        <Input
          label="Event Date"
          type="date"
          required
          leftIcon={<Calendar size={18} />}
          error={errors.date?.message}
          {...register("date")}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Start Time */}
          <Input
            label="Start Time"
            type="time"
            required
            leftIcon={<Clock size={18} />}
            error={errors.startTime?.message}
            {...register("startTime")}
          />

          {/* End Time */}
          <Input
            label="End Time"
            type="time"
            required
            leftIcon={<Clock size={18} />}
            error={errors.endTime?.message}
            {...register("endTime")}
          />
        </div>
      </div>
    </Card>
  );
}
