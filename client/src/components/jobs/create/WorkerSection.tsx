"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Users, IndianRupee } from "lucide-react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import type { CreateJobFormData } from "@/schemas/job.schema";

interface WorkerSectionProps {
  register: UseFormRegister<CreateJobFormData>;
  errors: FieldErrors<CreateJobFormData>;
}

export function WorkerSection({ register, errors }: WorkerSectionProps) {
  return (
    <Card className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Workers & Salary
        </h2>
        <p className="text-xs text-muted-foreground">
          Set worker quota and daily salary pay amount.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Workers Needed */}
        <Input
          label="Workers Needed"
          type="number"
          min={1}
          required
          placeholder="e.g. 5"
          leftIcon={<Users size={18} />}
          error={errors.workersNeeded?.message}
          {...register("workersNeeded", { valueAsNumber: true })}
        />

        {/* Salary Per Worker */}
        <Input
          label="Salary Per Worker (₹)"
          type="number"
          min={1}
          required
          placeholder="e.g. 1500"
          leftIcon={<IndianRupee size={18} />}
          error={errors.salary?.message}
          {...register("salary", { valueAsNumber: true })}
        />
      </div>
    </Card>
  );
}
