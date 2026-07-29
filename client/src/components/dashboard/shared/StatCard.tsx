"use client";

import {
  BriefcaseBusiness,
  Clock,
  CheckCircle2,
  XCircle,
  Star,
  Users,
  UserCheck,
  Hourglass,
  CheckCheck,
  Briefcase,
  LucideIcon,
} from "lucide-react";

import Card from "@/components/ui/Card";

export type StatIconName =
  | "applied"
  | "pending"
  | "accepted"
  | "rejected"
  | "completed"
  | "rating"
  | "posted"
  | "open"
  | "filled"
  | "applicants";

const iconMap: Record<StatIconName, LucideIcon> = {
  applied: BriefcaseBusiness,
  pending: Hourglass,
  accepted: CheckCircle2,
  rejected: XCircle,
  completed: CheckCheck,
  rating: Star,
  posted: Briefcase,
  open: Clock,
  filled: UserCheck,
  applicants: Users,
};

const iconStyleMap: Record<
  StatIconName,
  { bg: string; iconColor: string }
> = {
  applied: { bg: "bg-blue-500/10", iconColor: "text-blue-600" },
  pending: { bg: "bg-amber-500/10", iconColor: "text-amber-600" },
  accepted: { bg: "bg-emerald-500/10", iconColor: "text-emerald-600" },
  rejected: { bg: "bg-rose-500/10", iconColor: "text-rose-600" },
  completed: { bg: "bg-purple-500/10", iconColor: "text-purple-600" },
  rating: { bg: "bg-amber-500/15", iconColor: "text-amber-500 fill-amber-500" },
  posted: { bg: "bg-blue-500/10", iconColor: "text-blue-600" },
  open: { bg: "bg-emerald-500/10", iconColor: "text-emerald-600" },
  filled: { bg: "bg-indigo-500/10", iconColor: "text-indigo-600" },
  applicants: { bg: "bg-sky-500/10", iconColor: "text-sky-600" },
};

export interface StatItem {
  title: string;
  value: string | number;
  description?: string;
  iconName: StatIconName;
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
