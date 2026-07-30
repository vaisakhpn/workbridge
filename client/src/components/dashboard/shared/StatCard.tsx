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
  applied: { bg: "bg-orange-500/10", iconColor: "text-orange-600" },
  pending: { bg: "bg-orange-500/15", iconColor: "text-orange-600" },
  accepted: { bg: "bg-orange-500/10", iconColor: "text-orange-600" },
  rejected: { bg: "bg-orange-500/15", iconColor: "text-orange-700" },
  completed: { bg: "bg-orange-500/10", iconColor: "text-orange-600" },
  rating: { bg: "bg-orange-500/20", iconColor: "text-orange-500 fill-orange-500" },
  posted: { bg: "bg-orange-500/10", iconColor: "text-orange-600" },
  open: { bg: "bg-orange-500/10", iconColor: "text-orange-600" },
  filled: { bg: "bg-orange-500/15", iconColor: "text-orange-600" },
  applicants: { bg: "bg-orange-500/10", iconColor: "text-orange-600" },
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
    bg: "bg-orange-500/10",
    iconColor: "text-orange-600",
  };

  return (
    <Card className="border-orange-200/80 dark:border-orange-900/40 bg-orange-50/60 dark:bg-orange-950/20 flex items-start justify-between p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
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
