"use client";

import { BellOff } from "lucide-react";
import Card from "@/components/ui/Card";

export function EmptyNotifications() {
  return (
    <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-2 border-border/80">
      <div className="bg-primary/10 text-primary mb-4 rounded-full p-4">
        <BellOff size={36} />
      </div>

      <h3 className="text-lg font-bold text-foreground">
        No notifications yet
      </h3>

      <p className="text-sm text-muted-foreground mt-1 max-w-sm">
        Stay updated on your job listings, applicants & event reminders.
      </p>
    </Card>
  );
}
