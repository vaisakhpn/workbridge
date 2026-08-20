import type { Metadata } from "next";
import JobDetailContainer from "@/components/jobs/detail/JobDetailContainer";
import { jobService } from "@/services/event-team/job.service";
import type { Job } from "@/types/job.types";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate dynamic SEO metadata for each job listing
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const jobId = slug.includes("-") ? slug.split("-").pop() || slug : slug;

  try {
    const response = await jobService.getJobById(jobId);
    if (response?.success && response?.data) {
      const job = response.data;
      const title = `${job.title} Job in ${job.district} | Bincoz`;
      const description = `Apply for ${job.title} job in ${job.location}, ${job.district}. Daily pay: ₹${job.salary}. Category: ${job.category}. Hire or apply on Bincoz.`;
      const canonical = `https://www.bincoz.in/jobs/${slug}`;

      return {
        title,
        description,
        alternates: {
          canonical,
        },
        openGraph: {
          title,
          description,
          url: canonical,
          siteName: "Bincoz",
          locale: "en_IN",
          type: "article",
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
        },
      };
    }
  } catch (e) {
    // Fallback metadata if fetch fails or build time
  }

  return {
    title: "Part-Time Job Opening | Bincoz",
    description: "View job details, pay rate, location, and apply directly on Bincoz.",
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const jobId = slug.includes("-") ? slug.split("-").pop() || slug : slug;

  let initialJob: Job | null = null;
  try {
    const response = await jobService.getJobById(jobId);
    if (response?.success && response?.data) {
      initialJob = response.data;
    }
  } catch (e) {
    // Client fallback will handle error display
  }

  // Schema.org JobPosting JSON-LD for Google for Jobs integration
  const jobPostingSchema = initialJob
    ? {
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        "title": initialJob.title,
        "description": initialJob.description || `${initialJob.title} in ${initialJob.district}`,
        "datePosted": initialJob.createdAt,
        "validThrough": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        "employmentType": "PART_TIME",
        "hiringOrganization": {
          "@type": "Organization",
          "name": initialJob.eventTeam?.companyName || "Bincoz Verified Employer",
          "sameAs": "https://www.bincoz.in"
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": initialJob.location || initialJob.district,
            "addressRegion": initialJob.district,
            "addressCountry": "IN"
          }
        },
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "INR",
          "value": {
            "@type": "QuantitativeValue",
            "value": initialJob.salary,
            "unitText": "DAY"
          }
        }
      }
    : null;

  return (
    <>
      {jobPostingSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
        />
      )}
      <JobDetailContainer jobId={jobId} initialJob={initialJob} />
    </>
  );
}
