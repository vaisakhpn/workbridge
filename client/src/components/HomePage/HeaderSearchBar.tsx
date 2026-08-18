"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

interface HeaderSearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

export function HeaderSearchBar({
  placeholder = "Search jobs, categories, or districts...",
  className = "",
  onSearch,
}: HeaderSearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (onSearch) {
      onSearch(trimmed);
    }
    if (trimmed) {
      router.push(`/jobs/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/jobs/search");
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full min-w-0 ${className}`}>
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none shrink-0"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full min-w-0 rounded-full bg-white pl-8 pr-7 sm:pl-9 sm:pr-8 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/70 placeholder:truncate border border-orange-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all shadow-2xs"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X size={14} />
        </button>
      )}
    </form>
  );
}

export default HeaderSearchBar;
