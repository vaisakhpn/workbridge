"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight, ShieldAlert, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();
  const loginUser = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await api.post<{
        user: {
          id: string;
          email: string;
          role: "worker" | "eventTeam" | "admin";
          isProfileSetup: boolean;
          name: string;
        };
        accessToken: string;
        refreshToken: string;
      }>("/auth/login", { email, password });

      // Save to Zustand and local storage
      loginUser(response.user, response.accessToken);

      // Redirect to home or dash
      router.push("/");
    } catch (err: any) {
      console.error(err);
      setError(
        err.info?.message || "Login failed. Please verify your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-subtle flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative font-sans">
      {/* Background glow spots */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-brand/5 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link href="/" className="inline-flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-extrabold text-sm">
            W
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Work<span className="text-brand">Bridge</span>
          </span>
        </Link>
        <h2 className="mt-4 text-3xl font-extrabold text-foreground tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Connecting you with trusted event staff and work opportunities.
        </p>
      </div>

      <Card className="w-full max-w-md bg-white border border-gray-border shadow-md">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-600 flex items-start space-x-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-8.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-brand focus:ring-brand border-gray-border rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-gray-500 cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              <a href="#" className="text-brand hover:text-brand-hover">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              variant="primary"
              className="w-full justify-between"
            >
              <span>Login to Account</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-subtle text-center text-xs">
            <span className="text-gray-500">Don't have an account yet?</span>{" "}
            <Link
              href="/register"
              className="font-bold text-brand hover:text-brand-hover transition-colors"
            >
              Create an account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
