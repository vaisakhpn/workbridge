"use client";

import { Mail, Lock } from "lucide-react";

import Container from "@/components/common/Container";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="py-20">
      <Container className="max-w-md">
        <Card className="space-y-6">
          <h1 className="text-2xl font-bold">
            Login
          </h1>

          <Input
            label="Email"
            placeholder="Enter your email"
            leftIcon={<Mail size={18} />}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            leftIcon={<Lock size={18} />}
          />

          <Button fullWidth>
            Login
          </Button>
        </Card>
      </Container>
    </main>
  );
}