"use client";

import { useForm, useWatch } from "react-hook-form";

import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface DescriptionFormProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  initialValue?: string;
  onSubmit: (text: string) => Promise<void>;
  isLoading?: boolean;
  maxLength?: number;
}

export function DescriptionForm({
  title = "About / Description",
  subtitle = "Provide a summary to introduce yourself or your company.",
  placeholder = "Write a brief description...",
  initialValue = "",
  onSubmit,
  isLoading = false,
  maxLength = 500,
}: DescriptionFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      text: initialValue,
    },
  });

  const textValue = useWatch({ control, name: "text" }) || "";

  const handleFormSubmit = async (data: { text: string }) => {
    await onSubmit(data.text);
  };

  return (
    <Card className="space-y-6 p-6">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-foreground text-lg font-semibold tracking-tight">
            {title}
          </h2>
          <p className="text-muted-foreground text-xs">{subtitle}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="relative">
          <textarea
            {...register("text")}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={4}
            className="border-border bg-background focus:border-primary w-full rounded-lg border p-3 text-sm transition-colors outline-hidden resize-none"
          />

          <div className="text-muted-foreground mt-1 flex justify-end text-[11px]">
            <span>
              {textValue.length} / {maxLength}
            </span>
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
            Save Description
          </Button>
        </div>
      </form>
    </Card>
  );
}
