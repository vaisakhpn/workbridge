"use client";

import { Search, X } from "lucide-react";
import Input from "@/components/ui/Input";

interface ApplicationFiltersProps {
  searchQuery: string;
  statusFilter: string;
  onSearchChange: (query: string) => void;
  onStatusChange: (status: string) => void;
}

const statusTabs = [
  { value: "ALL", label: "All Applicants" },
  { value: "PENDING", label: "Pending", colorDot: "bg-amber-500" },
  { value: "ACCEPTED", label: "Accepted", colorDot: "bg-emerald-500" },
  { value: "REJECTED", label: "Rejected", colorDot: "bg-rose-500" },
];

export function ApplicationFilters({
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: ApplicationFiltersProps) {
  return (
    <div className="flex flex-col gap-4 bg-card p-4 sm:p-5 rounded-2xl border border-border/80 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Search applicant name, location..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search size={18} />}
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground p-1 transition-colors cursor-pointer"
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {statusTabs.map((tab) => {
            const isActive = statusFilter === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => onStatusChange(tab.value)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.colorDot && (
                  <span
                    className={`h-2 w-2 rounded-full transition-colors ${
                      isActive ? "bg-primary-foreground" : tab.colorDot
                    }`}
                  />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
