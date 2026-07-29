"use client";

import { StatCard, type StatItem } from "./StatCard";

interface StatsSectionProps {
  items: StatItem[];
  columns?: 2 | 4;
}

export function StatsSection({ items, columns = 4 }: StatsSectionProps) {
  const gridColsClass =
    columns === 2
      ? "grid gap-4 sm:grid-cols-2"
      : "grid gap-4 grid-cols-2 lg:grid-cols-4";

  return (
    <section className={gridColsClass}>
      {items.map((item) => (
        <StatCard key={item.title} {...item} />
      ))}
    </section>
  );
}
