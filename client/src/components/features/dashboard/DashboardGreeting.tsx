"use client";

interface DashboardGreetingProps {
  name: string;
}

export function DashboardGreeting({ name }: DashboardGreetingProps) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <section className="space-y-1">
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        👋 {greeting}, {name || "Worker"}
      </h2>

      <p className="text-sm text-muted-foreground">
        Welcome back! Here is your latest work activity summary.
      </p>
    </section>
  );
}
