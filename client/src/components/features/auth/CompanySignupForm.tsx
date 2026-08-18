"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import {
  companySignupSchema,
  type CompanySignupFormData,
} from "@/schemas/auth.schema";
import { authService } from "@/services/auth/auth.service";
import { useAuthStore } from "@/store/auth.store";

export default function CompanySignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanySignupFormData>({
    resolver: zodResolver(companySignupSchema),
    defaultValues: {
      companyName: "",
      ownerName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const onSubmit = async (data: CompanySignupFormData) => {
    try {
      const response = await authService.registerCompany(data);
      if (response.user) {
        setUser(response.user, response.accessToken);
        router.push("/");
      }
      toast.success(response.message || "Company registered successfully!");
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Failed to register company. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Company / Business Name"
        type="text"
        placeholder="e.g. Malabar Retail & Catering Services"
        error={errors.companyName?.message}
        {...register("companyName")}
      />

      <Input
        label="Owner / Manager / Representative Name"
        type="text"
        placeholder="e.g. Antony Joseph"
        error={errors.ownerName?.message}
        {...register("ownerName")}
      />

      <Input
        label="Work / Business Email"
        type="email"
        placeholder="info@company.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Contact / Phone Number"
        type="tel"
        placeholder="10-digit mobile or office number"
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
        Register Employer Account
      </Button>
    </form>
  );
}
