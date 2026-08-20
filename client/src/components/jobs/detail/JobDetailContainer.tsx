"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  IndianRupee,
  Briefcase,
  Building2,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

import Container from "@/components/common/Container";
import LandingHeader from "@/components/HomePage/Header";
import Footer from "@/components/HomePage/Footer";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";

import { jobService } from "@/services/event-team/job.service";
import { applicationService } from "@/services/worker/application.service";
import type { Job } from "@/types/job.types";
import { useAuthStore } from "@/store/auth.store";

interface JobDetailContainerProps {
  jobId: string;
  initialJob?: Job | null;
}

export default function JobDetailContainer({ jobId, initialJob }: JobDetailContainerProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  const [job, setJob] = useState<Job | null>(initialJob || null);
  const [isLoading, setIsLoading] = useState(!initialJob);
  const [error, setError] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (!initialJob && jobId) {
      fetchJobDetails();
    }
  }, [jobId, initialJob]);

  const fetchJobDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Extract ObjectId if slug is formatted like "title-location-65b123456789abcdef123456"
      const idToFetch = jobId.includes("-") ? jobId.split("-").pop() || jobId : jobId;
      const res = await jobService.getJobById(idToFetch);
      if (res.success && res.data) {
        setJob(res.data);
      } else {
        setError("Job listing not found.");
      }
    } catch (err: any) {
      console.error("Error fetching job details:", err);
      setError(err?.response?.data?.message || "Failed to load job details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      toast.info("Please login as a worker to apply for this job.");
      router.push(`/login?redirect=/jobs/${jobId}`);
      return;
    }

    if (user?.role !== "worker") {
      toast.error("Only registered Workers can apply for jobs.");
      return;
    }

    if (!job) return;

    try {
      setIsApplying(true);
      const response = await applicationService.applyForJob(job._id);
      if (response.success) {
        toast.success("Application submitted successfully!");
        setHasApplied(true);
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to submit application.";
      toast.error(msg);
      if (msg.toLowerCase().includes("already applied")) {
        setHasApplied(true);
      }
    } finally {
      setIsApplying(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: job?.title || "Part time job on Bincoz",
          text: `Check out this ${job?.title} job in ${job?.location || job?.district} on Bincoz!`,
          url,
        });
      } catch (e) {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Job link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <LandingHeader />

      <main className="flex-1 py-8 md:py-12">
        <Container>
          {/* Top Breadcrumb & Back */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/jobs"
              className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Jobs
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              <Share2 className="w-4 h-4 mr-1.5" />
              Share Job
            </Button>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
              <p className="text-slate-500 font-medium">Loading job details...</p>
            </div>
          ) : error || !job ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
              <AlertCircle className="w-12 h-12 text-rose-500 mb-3" />
              <h2 className="text-xl font-bold text-slate-900 mb-2">Job Not Found</h2>
              <p className="text-slate-600 max-w-md mb-6">{error || "This job listing may have been removed or closed."}</p>
              <Link href="/jobs">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Browse All Jobs</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Job Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6 md:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  {/* Category & Status Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-100 font-semibold px-3 py-1 text-xs">
                      {job.category}
                    </Badge>
                    <Badge
                      className={
                        job.status === "OPEN"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }
                    >
                      {job.status === "OPEN" ? "Accepting Applicants" : job.status}
                    </Badge>
                  </div>

                  {/* Job Title */}
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
                    {job.title}
                  </h1>

                  {/* Employer Name */}
                  <div className="flex items-center text-slate-600 text-sm mb-6">
                    <Building2 className="w-4 h-4 mr-1.5 text-slate-400" />
                    <span className="font-semibold text-slate-800">
                      {job.eventTeam?.companyName || "Verified Employer"}
                    </span>
                    {job.eventTeam?.district && (
                      <span className="ml-2 text-slate-400">• {job.eventTeam.district}</span>
                    )}
                  </div>

                  {/* Key Specifications Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 mb-8">
                    <div>
                      <span className="text-xs text-slate-500 font-medium block">Daily Pay / Salary</span>
                      <div className="flex items-center text-indigo-700 font-bold text-lg mt-0.5">
                        <IndianRupee className="w-4 h-4 mr-0.5" />
                        {job.salary.toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-slate-500 font-medium block">Location</span>
                      <div className="flex items-center text-slate-800 font-semibold text-sm mt-1">
                        <MapPin className="w-4 h-4 mr-1 text-slate-400 shrink-0" />
                        <span className="truncate">{job.district}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-slate-500 font-medium block">Workers Needed</span>
                      <div className="flex items-center text-slate-800 font-semibold text-sm mt-1">
                        <Users className="w-4 h-4 mr-1 text-slate-400 shrink-0" />
                        <span>{job.workersNeeded} Workers</span>
                      </div>
                    </div>

                    {job.date && (
                      <div>
                        <span className="text-xs text-slate-500 font-medium block">Work Date</span>
                        <div className="flex items-center text-slate-800 font-semibold text-sm mt-1">
                          <Calendar className="w-4 h-4 mr-1 text-slate-400 shrink-0" />
                          <span>{new Date(job.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                        </div>
                      </div>
                    )}

                    {(job.startTime || job.endTime) && (
                      <div>
                        <span className="text-xs text-slate-500 font-medium block">Work Hours</span>
                        <div className="flex items-center text-slate-800 font-semibold text-sm mt-1">
                          <Clock className="w-4 h-4 mr-1 text-slate-400 shrink-0" />
                          <span>{job.startTime || "TBD"} - {job.endTime || "TBD"}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Job Description */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Job Description & Requirements</h3>
                    <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                      {job.description || "No additional description provided by the employer."}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar Action Box */}
              <div className="space-y-6">
                <Card className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm sticky top-24">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Apply for this Position</h3>
                  <p className="text-xs text-slate-500 mb-6 leading-normal">
                    Direct hiring with verified daily payout. Connect directly with the event manager upon acceptance.
                  </p>

                  <div className="space-y-3">
                    {hasApplied ? (
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 cursor-default">
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Application Submitted
                      </Button>
                    ) : (
                      <Button
                        onClick={handleApply}
                        disabled={isApplying || job.status !== "OPEN"}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 shadow-md transition-all"
                      >
                        {isApplying ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Apply Now"
                        )}
                      </Button>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Posted Date:</span>
                      <span className="font-medium text-slate-700">
                        {new Date(job.createdAt).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Applicants:</span>
                      <span className="font-medium text-slate-700">{job.applicationsCount || 0} applied</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Status:</span>
                      <span className="font-semibold text-emerald-600">{job.status}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}
