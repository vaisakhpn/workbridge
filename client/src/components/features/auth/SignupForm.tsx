"use client";

import { useState } from "react";
import Link from "next/link";

import Container from "@/components/common/Container";
import Card from "@/components/ui/Card";
import SignupHeader from "./SignupHeader";
import RoleToggle, { type SignupRole } from "./RoleToggle";
import WorkerSignupForm from "./WorkerSignupForm";
import CompanySignupForm from "./CompanySignupForm";

export default function SignupForm() {
  const [activeRole, setActiveRole] = useState<SignupRole>("worker");

  return (
    <Container className="max-w-md mx-auto py-6">
      {/* Header with Logo, Title and Subtitle */}
      <SignupHeader />

      {/* Role Switcher Pill Tabs */}
      <RoleToggle activeRole={activeRole} onChangeRole={setActiveRole} />

      {/* Main Signup Form Card using standard UI Card */}
      <Card className="space-y-4">
        {activeRole === "worker" ? (
          <WorkerSignupForm />
        ) : (
          <CompanySignupForm />
        )}

        {/* Footer Navigation Link */}
        <div className="text-center text-xs sm:text-sm text-muted-foreground pt-3">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-orange-600 hover:text-orange-700 hover:underline"
          >
            Log in instead
          </Link>
        </div>
      </Card>
    </Container>
  );
}
