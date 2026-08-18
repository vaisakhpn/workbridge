"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  Briefcase,
  ArrowRight,
  Filter,
  X,
  SlidersHorizontal,
  Building2,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import Skeleton from "@/components/ui/Skeleton";
import Container from "@/components/common/Container";
import LandingHeader from "@/components/HomePage/Header";
import Footer from "@/components/HomePage/Footer";

import { jobService } from "@/services/event-team/job.service";
import { applicationService } from "@/services/worker/application.service";
import type { Job } from "@/types/job.types";
import { useAuthStore } from "@/store/auth.store";

const KERALA_DISTRICTS = [
  "All Districts",
  "Ernakulam",
  "Kozhikode",
  "Thiruvananthapuram",
  "Thrissur",
  "Kochi",
  "Kollam",
  "Kannur",
  "Alappuzha",
  "Kottayam",
  "Palakkad",
  "Malappuram",
  "Wayanad",
  "Idukki",
  "Pathanamthitta",
  "Kasaragod",
];

const JOB_CATEGORIES = [
  "All Categories",
  "Catering & Restaurant",
  "Shop & Retail",
  "Delivery & Logistics",
  "Construction & Labour",
  "Electrical & Plumbing",
  "Driving & Transport",
  "Cleaning & Housekeeping",
  "Events & Promotion",
  "Factory & Warehouse",
  "Office & Customer Service",
  "Others",
];

export function JobSearchContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  const initialQuery = searchParams.get("q") || searchParams.get("search") || "";
  const initialDistrict = searchParams.get("district") || "All Districts";
  const initialCategory = searchParams.get("category") || "All Categories";
  const initialSort = searchParams.get("sort") || "latest";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSort, setSelectedSort] = useState(initialSort);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());

  // Fetch existing worker applications
  useEffect(() => {
    if (isAuthenticated && user?.role === "worker") {
      applicationService
        .getMyApplications()
        .then((res) => {
          if (res.success && res.data) {
            const ids = new Set(
              res.data.map((app: any) =>
                typeof app.job === "string" ? app.job : app.job?._id
              )
            );
            setAppliedJobIds(ids);
          }
        })
        .catch(() => {});
    }
  }, [isAuthenticated, user]);

  const handleApply = async (jobId: string) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user?.role !== "worker") {
      toast.error("Employer accounts cannot apply for worker jobs.");
      return;
    }

    try {
      setApplyingJobId(jobId);
      const res = await applicationService.applyForJob(jobId);
      if (res.success) {
        toast.success(res.message || "Application submitted successfully!");
        setAppliedJobIds((prev) => new Set(prev).add(jobId));
      }
    } catch (err: any) {
      const errMsg =
        err.response?.data?.message || "Failed to submit application";
      if (errMsg.includes("already applied")) {
        setAppliedJobIds((prev) => new Set(prev).add(jobId));
      }
      toast.error(errMsg);
    } finally {
      setApplyingJobId(null);
    }
  };

  // Sync state with URL params on param change
  useEffect(() => {
    setSearchQuery(searchParams.get("q") || searchParams.get("search") || "");
    setSelectedDistrict(searchParams.get("district") || "All Districts");
    setSelectedCategory(searchParams.get("category") || "All Categories");
    setSelectedSort(searchParams.get("sort") || "latest");
  }, [searchParams]);

  const fetchSearchResults = useCallback(async () => {
    try {
      setIsLoading(true);
      const params: any = {
        page,
        limit: 12,
        sort: selectedSort,
      };

      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      if (selectedDistrict && selectedDistrict !== "All Districts") {
        params.district = selectedDistrict;
      }

      if (selectedCategory && selectedCategory !== "All Categories") {
        params.category = selectedCategory;
      }

      const response = await jobService.searchJobs(params);
      if (response.success) {
        setJobs(response.data || []);
        setTotalJobs(response.totalJobs || 0);
        setTotalPages(response.totalPages || 1);
      }
    } catch (err) {
      console.error("Job search error:", err);
      setJobs([]);
      setTotalJobs(0);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedDistrict, selectedCategory, selectedSort, page]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams();
  };

  const updateUrlParams = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedDistrict !== "All Districts") params.set("district", selectedDistrict);
    if (selectedCategory !== "All Categories") params.set("category", selectedCategory);
    if (selectedSort !== "latest") params.set("sort", selectedSort);

    router.push(`/jobs/search?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedDistrict("All Districts");
    setSelectedCategory("All Categories");
    setSelectedSort("latest");
    router.push("/jobs/search");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedDistrict !== "All Districts" ||
    selectedCategory !== "All Categories";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <LandingHeader />

      {/* Main Container */}
      <main className="flex-1 py-8 sm:py-12">
        <Container className="space-y-8">
          {/* Header Banner */}
          <div className="space-y-3 text-center sm:text-left">
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <Badge
                variant="secondary"
                className="bg-orange-500/10 text-orange-600 border-orange-200 text-xs font-semibold px-3 py-0.5 rounded-full"
              >
                Search Results
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {searchQuery.trim() ? (
                <>
                  Results for &ldquo;<span className="text-orange-600">{searchQuery}</span>&rdquo;
                </>
              ) : (
                "Explore Event Jobs Across Kerala"
              )}
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              Filter by job position, location/district, or company name to discover live verified event work opportunities.
            </p>
          </div>

          {/* Search & Filter Control Bar Card */}
          <Card className="p-4 sm:p-6 bg-orange-50/60 dark:bg-orange-950/20 border-orange-200/80 dark:border-orange-900/40 space-y-4">
            <form onSubmit={handleSearchSubmit} className="grid gap-3 md:grid-cols-12">
              {/* Search Bar Input */}
              <div className="relative md:col-span-5">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search job title, category, district, or company..."
                  className="w-full rounded-xl bg-white dark:bg-neutral-900 pl-10 pr-9 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 border border-orange-200/80 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* District Select */}
              <div className="md:col-span-3">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-neutral-900 px-3 py-2.5 text-sm text-foreground border border-orange-200/80 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all shadow-xs cursor-pointer"
                >
                  {KERALA_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Select */}
              <div className="md:col-span-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-neutral-900 px-3 py-2.5 text-sm text-foreground border border-orange-200/80 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all shadow-xs cursor-pointer"
                >
                  {JOB_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Search Button */}
              <div className="md:col-span-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-2.5 font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </Button>
              </div>
            </form>

            {/* Filter Summary & Sorting Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-orange-200/60 dark:border-orange-900/30 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <SlidersHorizontal className="h-4 w-4 text-orange-600" />
                <span>
                  Found <strong className="text-foreground">{totalJobs}</strong> open job{totalJobs !== 1 ? "s" : ""}
                </span>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="ml-2 text-orange-600 hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground hidden sm:inline">Sort by:</span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="rounded-lg bg-white dark:bg-neutral-900 px-2.5 py-1.5 text-xs text-foreground border border-orange-200/80 focus:border-orange-500 focus:outline-none cursor-pointer"
                >
                  <option value="latest">Latest First</option>
                  <option value="salary_desc">Salary: High to Low</option>
                  <option value="salary_asc">Salary: Low to High</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Results Grid / Loading / Empty */}
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="p-6 space-y-4 rounded-2xl">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-3/4 rounded" />
                      <Skeleton className="h-4 w-1/2 rounded" />
                    </div>
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-16 w-full rounded-xl" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </Card>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            /* Empty State */
            <Card className="p-12 text-center flex flex-col items-center justify-center space-y-4 rounded-2xl bg-orange-50/40 dark:bg-orange-950/10 border-orange-200/80 border-dashed">
              <div className="p-4 rounded-full bg-orange-500/10 text-orange-600">
                <Briefcase className="h-8 w-8" />
              </div>
              <div className="space-y-1 max-w-md">
                <h3 className="text-lg font-bold text-foreground">
                  No matching jobs found
                </h3>
                <p className="text-sm text-muted-foreground">
                  We couldn&apos;t find any open event listings matching your search parameters. Try adjusting your query or district filters.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="border-orange-200 text-orange-600 hover:bg-orange-100/50 hover:border-orange-400 rounded-full px-5"
              >
                Reset Search Filters
              </Button>
            </Card>
          ) : (
            /* Cards Grid */
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => {
                const formattedDate = new Date(job.date).toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                );

                const companyName =
                  job.eventTeam?.companyName || "Employer / Business";

                return (
                  <Card
                    key={job._id}
                    className="flex flex-col justify-between p-6 space-y-5 rounded-2xl border-orange-200/80 dark:border-orange-900/40 bg-orange-50/60 dark:bg-orange-950/20 hover:border-orange-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="space-y-4">
                      {/* Top Header with Company Info & Category Badge */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-1.5 text-xs text-orange-600 font-semibold truncate">
                            <Building2 className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{companyName}</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-foreground line-clamp-1">
                            {job.title}
                          </h3>
                        </div>

                        <Badge
                          variant="secondary"
                          className="shrink-0 bg-orange-500/10 text-orange-600 border-orange-200 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                        >
                          {job.category}
                        </Badge>
                      </div>

                      {/* Job Meta Details */}
                      <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground border-t border-orange-200/60 dark:border-orange-900/30 pt-3">
                        <div className="flex items-center gap-1.5 truncate">
                          <MapPin className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                          <span className="truncate">
                            {job.location && job.district
                              ? `${job.location}, ${job.district}`
                              : job.location || job.district}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 truncate">
                          <Calendar className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                          <span>{formattedDate}</span>
                        </div>

                        <div className="flex items-center gap-1.5 truncate">
                          <Clock className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                          <span>
                            {job.startTime} - {job.endTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 truncate">
                          <Users className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                          <span>{job.workersNeeded} Workers Needed</span>
                        </div>
                      </div>

                      {/* Salary Highlight Box */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-orange-200/60">
                        <span className="text-xs text-muted-foreground font-medium">
                          Offered Salary:
                        </span>
                        <div className="flex items-center font-bold text-emerald-600 text-sm sm:text-base">
                          <IndianRupee className="h-4 w-4" />
                          <span>{job.salary} / day</span>
                        </div>
                      </div>
                    </div>

                    {/* Apply / View Button - Hidden for Event Team accounts */}
                    {user?.role === "eventTeam" ? null : (
                      <div>
                        {appliedJobIds.has(job._id) ? (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled
                            className="w-full border-emerald-500/50 bg-emerald-50 text-emerald-600 font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm cursor-not-allowed"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Applied</span>
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleApply(job._id)}
                            disabled={applyingJobId === job._id}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
                          >
                            {applyingJobId === job._id ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Applying...</span>
                              </>
                            ) : isAuthenticated ? (
                              <>
                                <span>Apply Now</span>
                                <ArrowRight className="h-4 w-4" />
                              </>
                            ) : (
                              <>
                                <span>Login to Apply</span>
                                <ArrowRight className="h-4 w-4" />
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="border-orange-200 rounded-xl"
              >
                Previous
              </Button>
              <span className="text-sm font-medium text-muted-foreground px-3">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="border-orange-200 rounded-xl"
              >
                Next
              </Button>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default JobSearchContainer;
