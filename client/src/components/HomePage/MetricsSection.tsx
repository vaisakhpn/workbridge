"use client";

import Image from "next/image";
import { MapPin, ShieldCheck, Zap, Star } from "lucide-react";
import Card from "@/components/ui/Card";

const metrics = [
  {
    icon: MapPin,
    title: "Any Event",
    subtitle: "Weddings, parties, corporate events & more",
  },
  {
    icon: ShieldCheck,
    title: "Verified Workers",
    subtitle: "Background checked and trusted",
  },
  {
    icon: Zap,
    title: "Quick Matching",
    subtitle: "Find the right people in minutes",
  },
  {
    icon: Star,
    title: "Build Reputation",
    subtitle: "Transparent reviews and work history",
  },
];

const mockAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
];

export function MetricsSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 z-20 pb-16">
      <Card className="p-6 sm:p-10 bg-card border border-border/80 shadow-lg space-y-8">
        {/* 4 Metrics Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 md:divide-x md:divide-border/60">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;

            return (
              <div
                key={i}
                className={`flex flex-col items-center text-center space-y-3 ${
                  i !== 0 ? "md:pl-4" : ""
                }`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100/80 text-orange-600 border border-orange-200/80 shadow-2xs">
                  <Icon className="h-6 w-6 text-orange-600" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                    {metric.title}
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-[180px] mx-auto leading-relaxed">
                    {metric.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Social Proof Trust Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-border/60 text-xs sm:text-sm">
          <div className="flex items-center -space-x-2 overflow-hidden">
            {mockAvatars.map((src, idx) => (
              <div
                key={idx}
                className="relative h-8 w-8 rounded-full ring-2 ring-background overflow-hidden inline-block"
              >
                <Image
                  src={src}
                  alt="User Avatar"
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="32px"
                />
              </div>
            ))}
          </div>

          <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-full border border-orange-200">
            10K+
          </span>

          <p className="text-muted-foreground font-medium">
            Event teams and workers trust{" "}
            <span className="font-bold text-orange-600">WorkBridge</span>
          </p>
        </div>
      </Card>
    </section>
  );
}
