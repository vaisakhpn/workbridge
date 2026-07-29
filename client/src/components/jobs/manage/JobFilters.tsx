"use client";

import { Search, Filter } from "lucide-react";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

interface JobFiltersProps {
  searchQuery: string;
  statusFilter: string;
  onSearchChange: (query: string) => void;
  onStatusChange: (status: string) => void;
}

const statusOptions = [
  { value: "ALL", label: "All Statuses" },
  { value: "OPEN", label: "Open" },
  { value: "FILLED", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Closed" },
];

export function JobFilters({
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: JobFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-card p-3.5 sm:p-4 rounded-xl border border-border/80 shadow-xs">
      {/* Search Input */}
      <div className="w-full flex-1 sm:max-w-md">
        <Input
          placeholder="Search jobs by title, location, category..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          leftIcon={<Search size={18} />}
          className="text-xs sm:text-sm"
        />
      </div>

      {/* Status Filter Select */}
      <div className="w-full sm:w-52 sm:shrink-0">
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          leftIcon={<Filter size={18} />}
          className="text-xs sm:text-sm"
        />
      </div>
    </div>
  );
}
