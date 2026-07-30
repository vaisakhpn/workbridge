"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  IndianRupee,
  Briefcase,
  ArrowRight,
} from "lucide-react";

import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import Skeleton from "@/components/ui/Skeleton";
import { jobService } from "@/services/event-team/job.service";
import type { Job } from "@/types/job.types";

export function LatestJobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadLatestJobs() {
      try {
        setIsLoading(true);
        const res = await jobService.getPublicLatestJobs(6);
        if (isMounted && res.success && res.data) {
          setJobs(res.data);
        }
      } catch {
        if (isMounted) {
          setJobs([]);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadLatestJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="latest-jobs"
      className="via-background border-y border-orange-100/60 bg-linear-to-b from-orange-50/30 to-orange-50/20 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Section Header (Centered on Mobile & Desktop) */}
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <div>
            <span className="inline-block rounded-full border border-orange-200 bg-orange-100/80 px-3.5 py-1 text-xs font-bold tracking-widest text-orange-600 uppercase shadow-2xs">
              Live Postings
            </span>
          </div>

          <h2 className="text-foreground text-3xl font-extrabold sm:text-4xl">
            Latest Event Opportunities Across Kerala
          </h2>

          <p className="text-muted-foreground mx-auto max-w-xl text-sm sm:text-base">
            Browse recent open positions posted by top verified event
            organizers.
          </p>
        </div>

        {/* Loading Skeleton Grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="space-y-4 rounded-2xl p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-5 w-3/4 rounded-md" />
                    <Skeleton className="h-3.5 w-1/2 rounded-md" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="border-border/50 space-y-2 border-t pt-2">
                  <Skeleton className="h-4 w-2/3 rounded-md" />
                  <Skeleton className="h-4 w-1/2 rounded-md" />
                </div>
                <Skeleton className="h-10 w-full rounded-xl pt-2" />
              </Card>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          /* Empty / Fallback State */
          <Card className="bg-card/80 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200/80 p-12 text-center">
            <div className="mb-3 rounded-full bg-orange-500/10 p-4 text-orange-600">
              <Briefcase size={32} />
            </div>
            <h3 className="text-foreground text-lg font-bold">
              New event jobs arriving daily
            </h3>
            <p className="text-muted-foreground mt-1 max-w-sm text-sm">
              Register as a worker or event organizer to post and find verified
              event gigs across Kerala.
            </p>
            <Button
              variant="primary"
              size="sm"
              asChild
              className="mt-5 rounded-full bg-orange-600 px-6 text-white shadow-xs hover:bg-orange-700"
            >
              <Link href="/auth/register">Join WorkBridge Today</Link>
            </Button>
          </Card>
        ) : (
          /* Job Cards Grid */
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {jobs.map((job) => {
              const formattedDate = new Date(job.date).toLocaleDateString(
                "en-GB",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              );

              return (
                <Card
                  key={job._id}
                  className="bg-card/95 border-border/80 group flex flex-col justify-between space-y-4 rounded-2xl border p-5 shadow-2xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-xl"
                >
                  <div className="space-y-3.5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-foreground line-clamp-1 text-base font-bold transition-colors group-hover:text-orange-600">
                        {job.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="shrink-0 rounded-full border border-orange-200/80 bg-orange-50 px-2.5 py-0.5 text-[11px] font-bold text-orange-600 transition-colors duration-200 group-hover:bg-orange-600 group-hover:text-white"
                      >
                        {job.category}
                      </Badge>
                    </div>

                    {/* Meta Details Grid */}
                    <div className="text-muted-foreground border-border/50 grid grid-cols-2 gap-x-3 gap-y-2.5 border-t pt-2 text-xs">
                      <div className="flex items-center gap-1.5 truncate">
                        <Calendar
                          size={14}
                          className="shrink-0 text-orange-600"
                        />
                        <span>{formattedDate}</span>
                      </div>

                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin
                          size={14}
                          className="shrink-0 text-orange-600"
                        />
                        <span className="truncate">{job.district}</span>
                      </div>

                      <div className="flex items-center gap-1.5 truncate">
                        <Users size={14} className="shrink-0 text-orange-600" />
                        <span>{job.workersNeeded} Workers</span>
                      </div>

                      <div className="flex items-center gap-1 truncate font-semibold text-emerald-600">
                        <IndianRupee size={14} className="shrink-0" />
                        <span>₹{job.salary} / worker</span>
                      </div>
                    </div>
                  </div>

                  {/* Apply Action Button */}
                  <Button
                    variant="primary"
                    size="sm"
                    asChild
                    className="w-full gap-1.5 rounded-xl bg-orange-600 font-semibold text-white shadow-xs transition-all hover:bg-orange-700"
                  >
                    <Link href="/login">
                      <span>Apply For Job</span>
                      <ArrowRight size={14} />
                    </Link>
                  </Button>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center pt-2">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-1.5 rounded-full border-orange-200 hover:border-orange-500 hover:bg-orange-50/50"
        >
          <Link href="/register?role=worker">
            <span>View All Jobs</span>
            <ArrowRight size={16} className="text-orange-600" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default LatestJobsSection;
