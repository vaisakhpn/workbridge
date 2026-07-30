"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/common/Container";
import Input from "@/components/ui/Input";
import AuthHeader from "./AuthHeader";

import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import { authService } from "@/services/auth/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authService.login(data);

      setUser(response.user);
      toast.success(response.message || "Logged in successfully!");
      router.push("/");
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Failed to log in. Please check your credentials.";
      toast.error(errorMessage);
    }
  };

  return (
    <Container className="max-w-md mx-auto py-6">
      {/* Brand Logo, Title & Description Header */}
      <AuthHeader
        title="Welcome Back"
        description="Sign in to continue to WorkBridge."
      />

      {/* Main Login Form Card using standard UI Card */}
      <Card className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. rahul@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button
            type="submit"
            loading={isSubmitting}
            loadingText="Signing in..."
            fullWidth
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition-colors w-full flex items-center justify-center gap-2 text-sm sm:text-base mt-2"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Login
          </Button>
        </form>

        {/* Footer Navigation Link */}
        <div className="text-center text-xs sm:text-sm text-muted-foreground pt-3">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-orange-600 hover:text-orange-700 hover:underline"
          >
            Sign up instead
          </Link>
        </div>
      </Card>
    </Container>
  );
}
