"use client";

import { useForm } from "react-hook-form";
import { MapPin, Building, Navigation } from "lucide-react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export interface AddressFormValues {
  address?: string;
  district?: string;
  currentLocation?: string;
}

interface AddressFormProps {
  initialValues?: AddressFormValues;
  onSubmit: (data: AddressFormValues) => Promise<void>;
  isLoading?: boolean;
}

export function AddressForm({
  initialValues,
  onSubmit,
  isLoading = false,
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<AddressFormValues>({
    defaultValues: {
      address: initialValues?.address || "",
      district: initialValues?.district || "",
      currentLocation: initialValues?.currentLocation || "",
    },
  });

  const handleFormSubmit = async (data: AddressFormValues) => {
    await onSubmit(data);
  };

  return (
    <Card className="space-y-6 p-6">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-foreground text-lg font-semibold tracking-tight">
            Address & Location
          </h2>
          <p className="text-muted-foreground text-xs">
            Manage your operating location details and physical address.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Street Address */}
        <Input
          label="Street Address"
          placeholder="e.g. 123 Main Street, Suite 400"
          leftIcon={<MapPin size={18} />}
          {...register("address")}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {/* District */}
          <Input
            label="District"
            placeholder="e.g. Kozhikode"
            leftIcon={<Building size={18} />}
            {...register("district")}
          />

          {/* Current City / Location */}
          <Input
            label="City / Location"
            placeholder="e.g. Calicut"
            leftIcon={<Navigation size={18} />}
            {...register("currentLocation")}
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
            Save Address
          </Button>
        </div>
      </form>
    </Card>
  );
}
