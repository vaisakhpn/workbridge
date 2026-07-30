"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import {
  workerSignupSchema,
  type WorkerSignupFormData,
} from "@/schemas/auth.schema";
import { authService } from "@/services/auth/auth.service";
import { useAuthStore } from "@/store/auth.store";

export default function WorkerSignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WorkerSignupFormData>({
    resolver: zodResolver(workerSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const onSubmit = async (data: WorkerSignupFormData) => {
    try {
      const response = await authService.registerWorker(data);
      if (response.user) {
        setUser(response.user);
        router.push("/worker/dashboard");
      }
      toast.success(response.message || "Worker registered successfully!");
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Failed to register worker. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        type="text"
        placeholder="e.g. Rahul Kumar"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="rahul@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="WhatsApp / Phone Number"
        type="tel"
        placeholder="10-digit mobile number"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Choose a strong password"
        error={errors.password?.message}
        {...register("password")}
      />

      <Button
        type="submit"
        loading={isSubmitting}
        loadingText="Registering..."
        fullWidth
        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition-colors w-full flex items-center justify-center gap-2 text-sm sm:text-base mt-2"
        rightIcon={<ArrowRight className="h-4 w-4" />}
      >
        Register as Worker
      </Button>
    </form>
  );
}
