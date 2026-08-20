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
  XCircle,
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

  const initialQuery =
    searchParams.get("q") ||
    searchParams.get("search") ||
    searchParams.get("keyword") ||
    "";
  const initialDistrict =
    searchParams.get("district") ||
    searchParams.get("location") ||
    "All Districts";
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
  const [appliedStatusMap, setAppliedStatusMap] = useState<Map<string, string>>(
    new Map()
  );

  // Fetch existing worker applications
  useEffect(() => {
    if (isAuthenticated && user?.role === "worker") {
      applicationService
        .getMyApplications()
        .then((res) => {
          if (res.success && res.data) {
            const ids = new Set<string>();
            const statusMap = new Map<string, string>();
            res.data.forEach((app: any) => {
              const jId = typeof app.job === "string" ? app.job : app.job?._id;
              if (jId) {
                ids.add(jId);
                statusMap.set(jId, app.status);
              }
            });
            setAppliedJobIds(ids);
            setAppliedStatusMap(statusMap);
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
    setSearchQuery(
      searchParams.get("q") ||
        searchParams.get("search") ||
        searchParams.get("keyword") ||
        ""
    );
    setSelectedDistrict(
      searchParams.get("district") ||
        searchParams.get("location") ||
        "All Districts"
    );
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
    if (selectedDistrict !== "All Districts")
      params.set("district", selectedDistrict);
    if (selectedCategory !== "All Categories")
      params.set("category", selectedCategory);
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
    <div className="bg-background text-foreground flex min-h-screen flex-col font-sans">
      <LandingHeader />

      {/* Main Container */}
      <main className="flex-1 py-8 sm:py-12">
        <Container className="space-y-8">
          {/* Header Banner */}
          <div className="space-y-3 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <Badge
                variant="secondary"
                className="rounded-full border-orange-200 bg-orange-500/10 px-3 py-0.5 text-xs font-semibold text-orange-600"
              >
                Search Results
              </Badge>
            </div>

            <h1 className="text-foreground text-2xl font-extrabold tracking-tight sm:text-4xl">
              {searchQuery.trim() ? (
                <>
                  Results for &ldquo;
                  <span className="text-orange-600">{searchQuery}</span>&rdquo;
                </>
              ) : (
                "Explore Job Across Kerala"
              )}
            </h1>

            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
              Filter by job position, location/district, or company name to
              discover live verified event work opportunities.
            </p>
          </div>

          {/* Search & Filter Control Bar Card */}
          <Card className="space-y-4 border-orange-200/80 bg-orange-50/60 p-4 sm:p-6 dark:border-orange-900/40 dark:bg-orange-950/20">
            <form
              onSubmit={handleSearchSubmit}
              className="grid gap-3 md:grid-cols-12"
            >
              {/* Search Bar Input */}
              <div className="relative md:col-span-5">
                <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search job title, category, district, or company..."
                  className="text-foreground placeholder:text-muted-foreground/70 w-full rounded-xl border border-orange-200/80 bg-white py-2.5 pr-9 pl-10 text-sm shadow-xs transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none dark:bg-neutral-900"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
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
                  className="text-foreground w-full cursor-pointer rounded-xl border border-orange-200/80 bg-white px-3 py-2.5 text-sm shadow-xs transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none dark:bg-neutral-900"
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
                  className="text-foreground w-full cursor-pointer rounded-xl border border-orange-200/80 bg-white px-3 py-2.5 text-sm shadow-xs transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none dark:bg-neutral-900"
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
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-2.5 font-semibold text-white transition-colors hover:bg-orange-700"
                >
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </Button>
              </div>
            </form>

            {/* Filter Summary & Sorting Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-orange-200/60 pt-2 text-xs sm:text-sm dark:border-orange-900/30">
              <div className="text-muted-foreground flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-orange-600" />
                <span>
                  Found <strong className="text-foreground">{totalJobs}</strong>{" "}
                  open job{totalJobs !== 1 ? "s" : ""}
                </span>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="ml-2 inline-flex cursor-pointer items-center gap-1 font-medium text-orange-600 hover:underline"
                  >
                    <X className="h-3.5 w-3.5" />
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground hidden sm:inline">
                  Sort by:
                </span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="text-foreground cursor-pointer rounded-lg border border-orange-200/80 bg-white px-2.5 py-1.5 text-xs focus:border-orange-500 focus:outline-none dark:bg-neutral-900"
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
                <Card key={i} className="space-y-4 rounded-2xl p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
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
            <Card className="flex flex-col items-center justify-center space-y-4 rounded-2xl border-dashed border-orange-200/80 bg-orange-50/40 p-12 text-center dark:bg-orange-950/10">
              <div className="rounded-full bg-orange-500/10 p-4 text-orange-600">
                <Briefcase className="h-8 w-8" />
              </div>
              <div className="max-w-md space-y-1">
                <h3 className="text-foreground text-lg font-bold">
                  No matching jobs found
                </h3>
                <p className="text-muted-foreground text-sm">
                  We couldn&apos;t find any open event listings matching your
                  search parameters. Try adjusting your query or district
                  filters.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="rounded-full border-orange-200 px-5 text-orange-600 hover:border-orange-400 hover:bg-orange-100/50"
              >
                Reset Search Filters
              </Button>
            </Card>
          ) : (
            /* Cards Grid */
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => {
                const formattedDate = job.date
                  ? new Date(job.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : null;

                const companyName =
                  job.eventTeam?.companyName || "Employer / Business";

                return (
                  <Card
                    key={job._id}
                    className="flex flex-col justify-between space-y-5 rounded-2xl border-orange-200/80 bg-orange-50/60 p-6 transition-all duration-200 hover:border-orange-300 hover:shadow-md dark:border-orange-900/40 dark:bg-orange-950/20"
                  >
                    <div className="space-y-4">
                      {/* Top Header with Company Info & Category Badge */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-1.5 truncate text-xs font-semibold text-orange-600">
                            <Building2 className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{companyName}</span>
                          </div>
                          <Link href={`/jobs/${job.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")}-${(job.district || "kerala").toLowerCase().replace(/[^a-z0-9]+/g, "")}-${job._id}`}>
                            <h3 className="text-foreground line-clamp-1 text-base font-bold sm:text-lg hover:text-orange-600 transition-colors">
                              {job.title}
                            </h3>
                          </Link>
                        </div>

                        <Badge
                          variant="secondary"
                          className="shrink-0 rounded-full border-orange-200 bg-orange-500/10 px-2.5 py-0.5 text-xs font-semibold text-orange-600"
                        >
                          {job.category}
                        </Badge>
                      </div>

                      {/* Job Meta Details */}
                      <div className="text-muted-foreground grid grid-cols-2 gap-3 border-t border-orange-200/60 pt-3 text-xs dark:border-orange-900/30">
                        <div className="flex items-center gap-1.5 truncate">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-orange-600" />
                          <span className="truncate">
                            {job.location && job.district
                              ? `${job.location}, ${job.district}`
                              : job.location || job.district}
                          </span>
                        </div>

                        {formattedDate && (
                          <div className="flex items-center gap-1.5 truncate">
                            <Calendar className="h-3.5 w-3.5 shrink-0 text-orange-600" />
                            <span>{formattedDate}</span>
                          </div>
                        )}

                        {job.startTime && job.endTime && (
                          <div className="flex items-center gap-1.5 truncate">
                            <Clock className="h-3.5 w-3.5 shrink-0 text-orange-600" />
                            <span>
                              {job.startTime} - {job.endTime}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-1.5 truncate">
                          <Users className="h-3.5 w-3.5 shrink-0 text-orange-600" />
                          <span>{job.workersNeeded} Workers Needed</span>
                        </div>
                      </div>

                      {/* Salary Highlight Box */}
                      <div className="flex items-center justify-between rounded-xl border border-orange-200/60 bg-white/80 p-3 dark:bg-neutral-900/80">
                        <span className="text-muted-foreground text-xs font-medium">
                          Offered Salary:
                        </span>
                        <div className="flex items-center text-sm font-bold text-emerald-600 sm:text-base">
                          <IndianRupee className="h-4 w-4" />
                          <span>{job.salary} / day</span>
                        </div>
                      </div>
                    </div>

                    {/* Apply / View Button - Hidden for Event Team accounts */}
                    {user?.role === "eventTeam" ? null : (
                      <div>
                        {appliedJobIds.has(job._id) ? (
                          appliedStatusMap.get(job._id) === "REJECTED" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled
                              className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border-rose-500/50 bg-rose-500/10 py-2.5 text-sm font-semibold text-rose-600 dark:text-rose-400"
                            >
                              <XCircle className="h-4 w-4" />
                              <span>Rejected</span>
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled
                              className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border-emerald-500/50 bg-emerald-50 py-2.5 text-sm font-semibold text-emerald-600"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              <span>Applied</span>
                            </Button>
                          )
                        ) : job.status === "FILLED" ||
                          (job.activeApplicationsCount ??
                            job.applicationsCount ??
                            0) >= (job.workersNeeded || 1) ? (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled
                            className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border-amber-500/50 bg-amber-500/10 py-2.5 text-sm font-semibold text-amber-700 dark:text-amber-300"
                          >
                            <Users className="h-4 w-4" />
                            <span>Applicants Full</span>
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleApply(job._id)}
                            disabled={applyingJobId === job._id}
                            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
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
                className="rounded-xl border-orange-200"
              >
                Previous
              </Button>
              <span className="text-muted-foreground px-3 text-sm font-medium">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="rounded-xl border-orange-200"
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
