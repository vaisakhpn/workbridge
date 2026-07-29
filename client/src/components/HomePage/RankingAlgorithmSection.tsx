"use client";

import { Award, ShieldCheck, Zap, Star } from "lucide-react";
import Card from "@/components/ui/Card";

const factors = [
  {
    title: "Attendance Record",
    desc: "100% attendance rate boosts worker visibility at the top of organizer searches.",
    icon: ShieldCheck,
  },
  {
    title: "Organizer Ratings",
    desc: "Verified 5-star ratings from real event organizers build public credibility.",
    icon: Star,
  },
  {
    title: "Response Speed",
    desc: "Prompt application acceptance and clear communication improve worker badges.",
    icon: Zap,
  },
  {
    title: "Experience Badges",
    desc: "Workers earn Pro, Gold, and Elite status based on completed job milestones.",
    icon: Award,
  },
];

export function RankingAlgorithmSection() {
  return (
    <section
      id="ranking-algorithm"
      className="py-16 md:py-24 bg-muted/40 border-y border-border/60"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100/80 px-3 py-1 rounded-full border border-orange-200">
            Fair & Merit-Based
          </span>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Smart Ranking Algorithm
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            WorkBridge rewards hard-working staff with top placement and higher pay visibility.
          </p>
        </div>

        {/* Algorithm Factors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {factors.map((f, i) => {
            const Icon = f.icon;

            return (
              <Card key={i} className="p-6 space-y-3 bg-card border-border/80">
                <div className="p-3 w-fit rounded-2xl bg-orange-500/10 text-orange-600">
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {f.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
