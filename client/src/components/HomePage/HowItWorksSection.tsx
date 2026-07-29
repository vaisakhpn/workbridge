"use client";

import { UserPlus, Search, CheckCircle } from "lucide-react";
import Card from "@/components/ui/Card";

const organizerSteps = [
  {
    step: "01",
    title: "Post Your Event Job",
    desc: "Specify date, time, location, worker count & salary per worker in under 2 minutes.",
    icon: UserPlus,
  },
  {
    step: "02",
    title: "Review Verified Applicants",
    desc: "Browse worker ratings, attendance records, and past event history before accepting.",
    icon: Search,
  },
  {
    step: "03",
    title: "Hire & Track Attendance",
    desc: "Confirm your team, mark attendance on event day, and rate performance transparently.",
    icon: CheckCircle,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100/80 px-3 py-1 rounded-full border border-orange-200">
            Simple & Transparent
          </span>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            How WorkBridge Works
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Empowering event teams to find reliable staff in 3 quick steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {organizerSteps.map((s, i) => {
            const Icon = s.icon;

            return (
              <Card
                key={i}
                className="p-8 relative space-y-4 border-border/80 hover:border-orange-500/50 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-orange-600/30">
                    {s.step}
                  </span>
                  <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-600">
                    <Icon size={24} />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
