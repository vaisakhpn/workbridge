"use client";

import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Building2,
  Award,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  HeartHandshake,
} from "lucide-react";

import Container from "@/components/common/Container";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import LandingHeader from "@/components/HomePage/Header";
import LandingFooter from "@/components/HomePage/Footer";

const stats = [
  { label: "Districts Covered", value: "14", icon: MapPin },
  { label: "Verified Event Teams", value: "500+", icon: Building2 },
  { label: "Gigs Completed", value: "10,000+", icon: Award },
  { label: "Worker Rating Avg", value: "4.9/5", icon: Sparkles },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Verified Identity & Trust",
    description:
      "Every worker profile and event team listing is verified for authenticity, ensuring safety, reliability, and peace of mind.",
  },
  {
    icon: Clock,
    title: "Instant Staff Matching",
    description:
      "Event organizers can post urgent staffing needs and find qualified catering, decoration, or hospitality crews within minutes.",
  },
  {
    icon: HeartHandshake,
    title: "Fair Wages & Transparency",
    description:
      "Clear daily wage rates disclosed upfront with prompt settlements and performance badge progression for top event staff.",
  },
];

export default function AboutContainer() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <LandingHeader />

      <main className="flex-1 py-12 sm:py-16">
        <Container className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <Badge
              variant="secondary"
              className="bg-orange-500/10 text-orange-600 border-orange-200 text-xs font-semibold px-3 py-1 rounded-full"
            >
              About Jobora
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Empowering World&apos;s Part-Time & Temporary Workforce Marketplace
            </h1>

            <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed">
              Jobora is World&apos;s leading platform connecting verified employers, businesses, caterers, and organizers with reliable part-time staff.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.label}
                  className="p-6 text-center space-y-2 bg-orange-50/60 dark:bg-orange-950/20 border-orange-200/80 dark:border-orange-900/40 hover:border-orange-300 transition-all"
                >
                  <div className="inline-flex p-3 rounded-2xl bg-orange-500/10 text-orange-600 mx-auto">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {item.label}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Mission & Vision Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 space-y-4 bg-orange-50/40 dark:bg-orange-950/10 border-orange-200/80 rounded-2xl">
              <div className="p-3 w-fit rounded-2xl bg-orange-600 text-white font-bold">
                <Users className="h-6 w-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                For Part-Time Staff & Workers
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Whether you are a retail assistant, receptionist, catering crew member, delivery staff, or event coordinator, Jobora provides flexible access to part-time jobs in your district with transparent wages and badge progression.
              </p>
            </Card>

            <Card className="p-8 space-y-4 bg-orange-50/40 dark:bg-orange-950/10 border-orange-200/80 rounded-2xl">
              <div className="p-3 w-fit rounded-2xl bg-orange-600 text-white font-bold">
                <Building2 className="h-6 w-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                For Employers & Businesses
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Streamline your part-time staffing operations. Post job requirements in seconds, review worker profiles with past ratings, track attendance digitally, and build your trusted workforce network.
              </p>
            </Card>
          </div>

          {/* Core Values Section */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Why Choose Jobora
              </h2>
              <p className="text-sm text-muted-foreground">
                Built on transparency, speed, and trusted performance.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {values.map((val) => {
                const Icon = val.icon;
                return (
                  <Card
                    key={val.title}
                    className="p-6 space-y-3 bg-orange-50/60 dark:bg-orange-950/20 border-orange-200/80 dark:border-orange-900/40"
                  >
                    <div className="p-3 w-fit rounded-xl bg-orange-500/10 text-orange-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-foreground text-base">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {val.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* CTA Banner */}
          <Card className="p-8 sm:p-12 text-center space-y-6 bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-3xl border-none shadow-xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold">
              Ready to Work or Hire Event Staff?
            </h2>
            <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto">
              Join thousands of workers and organizers across World already using Jobora today.
            </p>
            
          </Card>
        </Container>
      </main>

      <LandingFooter />
    </div>
  );
}
