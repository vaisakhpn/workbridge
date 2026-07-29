"use client";

import {
  BriefcaseBusiness,
  Clock,
  CheckCircle2,
  XCircle,
  Star,
  LucideIcon,
} from "lucide-react";

import Card from "@/components/ui/Card";

export type DashboardStatIconName =
  | "applied"
  | "pending"
  | "accepted"
  | "rejected"
  | "completed"
  | "rating";

const iconMap: Record<DashboardStatIconName, LucideIcon> = {
  applied: BriefcaseBusiness,
  pending: Clock,
  accepted: CheckCircle2,
  rejected: XCircle,
  completed: CheckCircle2,
  rating: Star,
};

const iconStyleMap: Record<
  DashboardStatIconName,
  { bg: string; iconColor: string }
> = {
  applied: { bg: "bg-blue-500/10", iconColor: "text-blue-600" },
  pending: { bg: "bg-amber-500/10", iconColor: "text-amber-600" },
  accepted: { bg: "bg-emerald-500/10", iconColor: "text-emerald-600" },
  rejected: { bg: "bg-rose-500/10", iconColor: "text-rose-600" },
  completed: { bg: "bg-emerald-500/10", iconColor: "text-emerald-600" },
  rating: { bg: "bg-amber-500/15", iconColor: "text-amber-500 fill-amber-500" },
};

export interface StatItem {
  title: string;
  value: string | number;
  description?: string;
  iconName: DashboardStatIconName;
}

export function StatCard({ title, value, description, iconName }: StatItem) {
  const Icon = iconMap[iconName] || BriefcaseBusiness;
  const style = iconStyleMap[iconName] || {
    bg: "bg-primary/10",
    iconColor: "text-primary",
  };

  return (
    <Card className="flex items-start justify-between p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md border-border/80">
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </p>

        <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {value}
        </h3>

        {description && (
          <p className="text-xs text-muted-foreground pt-0.5">{description}</p>
        )}
      </div>

      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.bg}`}
      >
        <Icon className={`h-5 w-5 ${style.iconColor}`} />
      </div>
    </Card>
  );
}
