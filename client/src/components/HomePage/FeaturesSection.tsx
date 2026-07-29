"use client";

import { Utensils, Sparkles, Building, CheckCircle2, UserCheck, CalendarCheck, Shield } from "lucide-react";
import Card from "@/components/ui/Card";

const categories = [
  {
    title: "Catering & Kitchen Staff",
    description: "Experienced chefs, food servers, kitchen assistants, and cleanup crews for weddings & bulk events.",
    icon: Utensils,
    count: "500+ Active Workers",
  },
  {
    title: "Stage & Venue Decoration",
    description: "Floral arrangement, lighting technicians, stage setup experts, and audio-visual operators.",
    icon: Sparkles,
    count: "300+ Verified Teams",
  },
  {
    title: "Hospitality & Guest Care",
    description: "Welcome hosts, registration desk managers, ushering staff, and VIP guest coordinators.",
    icon: Building,
    count: "400+ Hospitality Pros",
  },
  {
    title: "Event Setup & Logistics",
    description: "Heavy lifting, seating arrangements, tear-down crews, and transport support staff.",
    icon: CalendarCheck,
    count: "600+ Ready Helpers",
  },
];

const highlights = [
  {
    title: "Verified Identity & Phone",
    desc: "Every worker profile is identity-verified before listing.",
    icon: UserCheck,
  },
  {
    title: "Reliability & Attendance Score",
    desc: "Transparent history based on completed jobs and punctuality.",
    icon: CheckCircle2,
  },
  {
    title: "Direct Job Matching",
    desc: "Instant booking without middlemen or agency markups.",
    icon: Shield,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100/80 px-3 py-1 rounded-full border border-orange-200">
            Tailored For Events
          </span>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Everything You Need to Staff Your Next Big Event
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            From intimate gatherings to grand wedding receptions, hire vetted local temporary staff across Kerala with ease.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;

            return (
              <Card
                key={i}
                className="p-6 space-y-4 hover:shadow-md hover:border-orange-500/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60 text-xs font-semibold text-orange-600">
                  {cat.count}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Platform Highlights Banner */}
        <div className="grid md:grid-cols-3 gap-6 pt-6">
          {highlights.map((h, i) => {
            const Icon = h.icon;

            return (
              <div key={i} className="flex items-start gap-3.5 p-4 rounded-2xl bg-card border border-border/70">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 shrink-0">
                  <Icon size={20} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-foreground">{h.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{h.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
