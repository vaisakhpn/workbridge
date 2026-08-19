"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, X, ArrowLeft } from "lucide-react";

interface HeaderSearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: { keyword: string; location: string }) => void;
}

export function HeaderSearchBar({
  placeholder = "Search jobs, shop, location...",
  className = "",
  onSearch,
}: HeaderSearchBarProps) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const keywordInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Close desktop expanded search on click outside or Esc key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
        setIsMobileModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleOpen = () => {
    if (window.innerWidth < 640) {
      setIsMobileModalOpen(true);
    } else {
      setIsExpanded(true);
      setTimeout(() => keywordInputRef.current?.focus(), 50);
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedKeyword = keyword.trim();
    const trimmedLocation = location.trim();

    if (onSearch) {
      onSearch({ keyword: trimmedKeyword, location: trimmedLocation });
    }

    const searchParams = new URLSearchParams();
    if (trimmedKeyword) searchParams.set("q", trimmedKeyword);
    if (trimmedLocation) searchParams.set("location", trimmedLocation);

    const queryString = searchParams.toString();
    router.push(queryString ? `/jobs/search?${queryString}` : "/jobs/search");

    setIsExpanded(false);
    setIsMobileModalOpen(false);
  };

  const handleClear = (type: "keyword" | "location") => {
    if (type === "keyword") setKeyword("");
    if (type === "location") setLocation("");
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* ------------------------------------------------------------- */}
      {/* 1. COLLAPSED BAR / INITIAL HEADER TRIGGER (Photo 1)          */}
      {/* ------------------------------------------------------------- */}
      {!isExpanded && (
        <button
          type="button"
          onClick={handleOpen}
          className="text-foreground group flex w-full cursor-pointer items-center justify-between gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs shadow-2xs transition-all hover:border-orange-500/80 focus:border-orange-500 focus:outline-none sm:px-4 sm:py-2 sm:text-sm"
        >
          <div className="text-muted-foreground/80 group-hover:text-muted-foreground flex min-w-0 flex-1 items-center gap-2">
            <span className="truncate text-xs font-normal sm:text-sm">
              {keyword || location
                ? `${keyword}${keyword && location ? " • " : ""}${location}`
                : placeholder}
            </span>
          </div>
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white shadow-2xs transition-colors group-hover:bg-orange-700">
            <Search className="h-3 w-3" />
          </div>
        </button>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. DESKTOP EXPANDED DUAL-INPUT SEARCH BAR (Photo 2)           */}
      {/* ------------------------------------------------------------- */}
      {isExpanded && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 z-40 hidden bg-black/20 backdrop-blur-[1.5px] sm:block"
            onClick={() => setIsExpanded(false)}
          />

          <form
            onSubmit={handleSearchSubmit}
            className="animate-in fade-in zoom-in-95 absolute top-1/2 left-1/2 z-50 hidden w-[560px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 items-center rounded-full border-2 border-orange-500 bg-white p-1.5 shadow-2xl duration-150 sm:flex"
          >
            {/* Input 1: Keyword / Designation / Shop */}
            <div className="flex min-w-0 flex-1 items-center gap-2 px-3 py-1">
              <Search className="text-muted-foreground h-4 w-4 shrink-0" />
              <input
                ref={keywordInputRef}
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter keyword / job / shop"
                className="text-foreground placeholder:text-muted-foreground/70 w-full bg-transparent text-xs outline-none sm:text-sm"
              />
              {keyword && (
                <button
                  type="button"
                  onClick={() => handleClear("keyword")}
                  className="text-muted-foreground hover:text-foreground cursor-pointer p-0.5"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Vertical Divider */}
            <div className="mx-1 h-6 w-px shrink-0 bg-gray-200" />

            {/* Input 2: Location */}
            <div className="flex min-w-0 flex-1 items-center gap-2 px-3 py-1">
              <MapPin className="text-muted-foreground h-4 w-4 shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className="text-foreground placeholder:text-muted-foreground/70 w-full bg-transparent text-xs outline-none sm:text-sm"
              />
              {location && (
                <button
                  type="button"
                  onClick={() => handleClear("location")}
                  className="text-muted-foreground hover:text-foreground cursor-pointer p-0.5"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Action Search Button */}
            <button
              type="submit"
              className="ml-1 flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-orange-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-orange-700 active:scale-95 sm:text-sm"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>
          </form>
        </>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. MOBILE FULL-SCREEN / SHEET SEARCH OVERLAY (Photo 3)       */}
      {/* ------------------------------------------------------------- */}
      {isMobileModalOpen && (
        <div className="bg-background animate-in slide-in-from-bottom fixed inset-0 z-50 flex flex-col duration-200 sm:hidden">
          {/* Mobile Overlay Header */}
          <div className="border-border flex items-center gap-3 border-b bg-white p-4">
            <button
              type="button"
              onClick={() => setIsMobileModalOpen(false)}
              className="hover:bg-muted text-foreground cursor-pointer rounded-full p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-foreground text-lg font-bold">Find jobs</h2>
          </div>

          {/* Mobile Overlay Body - Dual Input Form (No radio buttons) */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-1 flex-col justify-between space-y-4 bg-black/40  backdrop-blur-[1.5px] p-4"
          >
            <div className="space-y-3 pt-2">
              {/* Stacked Input 1: Keyword */}
              <div className="flex items-center gap-3 rounded-2xl border border-gray-300 bg-white p-3.5 shadow-2xs focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500">
                <Search className="text-muted-foreground h-5 w-5 shrink-0" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Enter keyword, job, shop"
                  autoFocus
                  className="text-foreground placeholder:text-muted-foreground/70 w-full bg-transparent text-sm outline-none"
                />
                {keyword && (
                  <button
                    type="button"
                    onClick={() => handleClear("keyword")}
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Stacked Input 2: Location */}
              <div className="flex items-center gap-3 rounded-2xl border border-gray-300 bg-white p-3.5 shadow-2xs focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500">
                <MapPin className="text-muted-foreground h-5 w-5 shrink-0" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                  className="text-foreground placeholder:text-muted-foreground/70 w-full bg-transparent text-sm outline-none"
                />
                {location && (
                  <button
                    type="button"
                    onClick={() => handleClear("location")}
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Full-width Submit Button */}
            <div className="pb-6">
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-orange-600 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:bg-orange-700 active:scale-[0.98]"
              >
                <Search className="h-5 w-5" />
                <span>Search jobs</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default HeaderSearchBar;
