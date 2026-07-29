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

export interface StatItem {
  title: string;
  value: string | number;
  description?: string;
  iconName: DashboardStatIconName;
}

export function StatCard({ title, value, description, iconName }: StatItem) {
  const Icon = iconMap[iconName] || BriefcaseBusiness;

  return (
    <Card className="flex items-start justify-between p-5">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>

        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {value}
        </h3>

        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="bg-primary/10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
        <Icon className="text-primary h-5 w-5" />
      </div>
    </Card>
  );
}
