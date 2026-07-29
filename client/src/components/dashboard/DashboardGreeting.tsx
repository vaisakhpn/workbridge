"use client";

export function DashboardGreeting() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <section className="space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">
        👋 {greeting}, Vaisakh
      </h2>

      <p className="text-muted-foreground">
        Welcome back! Ready to find your next opportunity?
      </p>
    </section>
  );
}