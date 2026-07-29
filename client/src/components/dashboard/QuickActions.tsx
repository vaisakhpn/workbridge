"use client";

import Link from "next/link";
import { BriefcaseBusiness, FileText, User } from "lucide-react";

import Card from "@/components/ui/Card";

const actions = [
  {
    title: "Find Jobs",
    description: "Browse available jobs",
    href: "/worker/jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "Applications",
    description: "Track your applications",
    href: "/worker/applications",
    icon: FileText,
  },
  {
    title: "My Profile",
    description: "Complete your profile",
    href: "/worker/profile",
    icon: User,
  },
];

export function QuickActions() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Quick Actions</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link key={action.title} href={action.href}>
              <Card className="cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="space-y-4">
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                    <Icon className="text-primary h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold">{action.title}</h3>

                    <p className="text-muted-foreground mt-1 text-sm">
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
