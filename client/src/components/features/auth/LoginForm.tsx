"use client";

import { Mail, Lock } from "lucide-react";
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
      switch (response.user.role) {
        case "worker":
          router.push("/worker/dashboard");
          break;

        case "eventTeam":
          router.push("/event-team/dashboard");
          break;

        case "admin":
          router.push("/admin/dashboard");
          break;
      }

      toast.success(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="max-w-md">
      <Card className="space-y-6">
        <AuthHeader
          title="Welcome Back"
          description="Sign in to continue to WorkBridge."
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            leftIcon={<Mail size={18} />}
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            leftIcon={<Lock size={18} />}
            error={errors.password?.message}
            {...register("password")}
          />

          <Button
            type="submit"
            loading={isSubmitting}
            loadingText="Signing in..."
            fullWidth
          >
            Login
          </Button>
        </form>
      </Card>
    </Container>
  );
}
