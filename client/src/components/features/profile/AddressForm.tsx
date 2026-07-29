"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Navigation, Building2, Hash } from "lucide-react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import {
  addressSchema,
  type AddressFormData,
} from "@/schemas/workerProfile.schema";
import type {
  UpdateWorkerProfileInput,
  WorkerProfile,
} from "@/types/workerProfile.types";

interface AddressFormProps {
  profile: WorkerProfile;
  onSubmit: (data: UpdateWorkerProfileInput) => Promise<void>;
  isLoading?: boolean;
}

export function AddressForm({
  profile,
  onSubmit,
  isLoading = false,
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: profile.address || "",
      district: profile.district || "",
      currentLocation: profile.currentLocation || "",
      pincode: profile.pincode || "",
    },
  });

  const handleFormSubmit = async (data: AddressFormData) => {
    await onSubmit({
      address: data.address,
      district: data.district,
      currentLocation: data.currentLocation,
      pincode: data.pincode,
    });
  };

  return (
    <Card className="space-y-6 p-6">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-foreground text-lg font-semibold tracking-tight">
            Location & Address
          </h2>
          <p className="text-muted-foreground text-xs">
            Enter your current address details to get local job notifications.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Address */}
        <Input
          label="Street Address"
          placeholder="House/Building name, Street, Locality"
          leftIcon={<MapPin size={18} />}
          error={errors.address?.message}
          {...register("address")}
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {/* District */}
          <Input
            label="District"
            placeholder="e.g. Kozhikode, Malappuram"
            leftIcon={<Building2 size={18} />}
            error={errors.district?.message}
            {...register("district")}
          />

          {/* Current Location */}
          <Input
            label="Current Location / City"
            placeholder="e.g. Mananchira, Calicut"
            leftIcon={<Navigation size={18} />}
            error={errors.currentLocation?.message}
            {...register("currentLocation")}
          />

          {/* Pincode */}
          <Input
            label="Pincode"
            placeholder="673001"
            leftIcon={<Hash size={18} />}
            error={errors.pincode?.message}
            {...register("pincode")}
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
