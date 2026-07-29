"use client";

import Link from "next/link";
import { BriefcaseBusiness, FileText, User } from "lucide-react";

import Card from "@/components/ui/Card";

const actions = [
  {
    title: "Find Jobs",
    description: "Browse available event opportunities",
    href: "/worker/jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "My Applications",
    description: "Track your pending & accepted applications",
    href: "/worker/applications",
    icon: FileText,
  },
  {
    title: "My Profile",
    description: "Update skills, location & availability",
    href: "/worker/profile",
    icon: User,
  },
];

export function QuickActions() {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight text-foreground">
        Quick Actions
      </h3>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link key={action.title} href={action.href}>
              <Card className="cursor-pointer p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="space-y-3">
                  <div className="bg-primary/10 flex h-11 w-11 items-center justify-center rounded-xl">
                    <Icon className="text-primary h-5 w-5" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground">
                      {action.title}
                    </h4>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
