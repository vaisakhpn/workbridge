"use client";

import { MapPin, CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";

const districts = [
  { name: "Ernakulam", status: "Active Now" },
  { name: "Kozhikode", status: "Active Now" },
  { name: "Thiruvananthapuram", status: "Active Now" },
  { name: "Thrissur", status: "Active Now" },
  { name: "Kottayam", status: "Launching Soon" },
  { name: "Kollam", status: "Launching Soon" },
  { name: "Alappuzha", status: "Launching Soon" },
  { name: "Palakkad", status: "Launching Soon" },
  { name: "Malappuram", status: "Phase 2" },
  { name: "Kannur", status: "Phase 2" },
  { name: "Idukki", status: "Phase 2" },
  { name: "Wayanad", status: "Phase 2" },
  { name: "Pathanamthitta", status: "Phase 2" },
  { name: "Kasaragod", status: "Phase 2" },
];

export function ExpansionPlanSection() {
  return (
    <section id="expansion-plan" className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100/80 px-3 py-1 rounded-full border border-orange-200">
            Across Kerala
          </span>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Expansion Plan
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Starting in key event hubs and expanding across all 14 districts in Kerala.
          </p>
        </div>

        {/* Districts Badges Grid */}
        <Card className="p-6 sm:p-8 bg-card border-border/80 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {districts.map((d, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-3 rounded-xl bg-muted/40 border border-border/60 text-center space-y-1.5"
              >
                <MapPin size={16} className="text-orange-600" />
                <span className="text-xs font-bold text-foreground">
                  {d.name}
                </span>
                <Badge
                  variant="outline"
                  className={`text-[10px] px-1.5 py-0 ${
                    d.status === "Active Now"
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-200"
                      : "text-muted-foreground border-border/60"
                  }`}
                >
                  {d.status === "Active Now" && (
                    <CheckCircle2 size={10} className="mr-0.5" />
                  )}
                  {d.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
