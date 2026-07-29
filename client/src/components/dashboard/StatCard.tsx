"use client";

import {
  BriefcaseBusiness,
  CircleCheckBig,
  FileText,
  LucideIcon,
  Star,
} from "lucide-react";

import Card from "@/components/ui/Card";

export type StatIconName = "briefcase" | "file" | "check" | "star";

const iconMap: Record<StatIconName, LucideIcon> = {
  briefcase: BriefcaseBusiness,
  file: FileText,
  check: CircleCheckBig,
  star: Star,
};

export interface StatItem {
  title: string;
  value: string | number;
  description?: string;
  iconName?: StatIconName;
  icon?: LucideIcon;
}

export function StatCard({
  title,
  value,
  description,
  iconName,
  icon: DirectIcon,
}: StatItem) {
  const Icon = DirectIcon || (iconName ? iconMap[iconName] : BriefcaseBusiness);

  return (
    <Card className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-muted-foreground text-sm">{title}</p>

        <h3 className="text-3xl font-bold tracking-tight">{value}</h3>

        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
      </div>

      <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
        <Icon className="text-primary h-6 w-6" />
      </div>
    </Card>
  );
}
