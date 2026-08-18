"use client";

import Container from "@/components/common/Container";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import LandingHeader from "@/components/HomePage/Header";
import LandingFooter from "@/components/HomePage/Footer";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyContainer() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <LandingHeader />

      <main className="flex-1 py-12 sm:py-16">
        <Container className="space-y-10 max-w-4xl">
          {/* Header Banner */}
          <div className="text-center space-y-4">
            <Badge
              variant="secondary"
              className="bg-orange-500/10 text-orange-600 border-orange-200 text-xs font-semibold px-3 py-1 rounded-full"
            >
              Legal & Privacy
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Privacy Policy
            </h1>

            <p className="text-muted-foreground text-xs sm:text-sm">
              Last Updated: July 30, 2026 | Effective for all FindNearJob users across Kerala
            </p>
          </div>

          <Card className="p-6 sm:p-10 space-y-8 bg-orange-50/60 dark:bg-orange-950/20 border-orange-200/80 dark:border-orange-900/40">
            {/* Overview */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-lg">
                <ShieldCheck className="h-5 w-5" />
                <h2>1. Overview & Commitment</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                FindNearJob (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates the workforce marketplace connecting temporary event staff and verified event organizers across Kerala. We respect your privacy and are committed to protecting the personal data you share with us.
              </p>
            </section>

            {/* Information Collected */}
            <section className="space-y-3 border-t border-orange-200/60 dark:border-orange-900/30 pt-6">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-lg">
                <FileText className="h-5 w-5" />
                <h2>2. Information We Collect</h2>
              </div>
              <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <p>We collect information necessary to operate a trusted platform:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Account Registration:</strong> Name, email address, mobile number, role type, and password.</li>
                  <li><strong>Profile Details:</strong> District, address, skill categories, work history, ratings, and profile images.</li>
                  <li><strong>Company Data:</strong> Company name, owner name, contact numbers, address, and verification details.</li>
                  <li><strong>Platform Activity:</strong> Job postings, applications submitted, attendance logs, and completed gig records.</li>
                </ul>
              </div>
            </section>

            {/* Use of Information */}
            <section className="space-y-3 border-t border-orange-200/60 dark:border-orange-900/30 pt-6">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-lg">
                <Eye className="h-5 w-5" />
                <h2>3. How We Use Your Information</h2>
              </div>
              <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <p>Your information is used strictly for legitimate platform purposes:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Connecting workers with relevant event job opportunities in their district.</li>
                  <li>Displaying applicant profiles to event organizers for job selection.</li>
                  <li>Calculating experience scores, attendance percentages, and worker badges.</li>
                  <li>Sending notifications regarding job applications, shift updates, and attendance alerts.</li>
                  <li>Preventing fraudulent accounts and enforcing platform safety policies.</li>
                </ul>
              </div>
            </section>

            {/* Data Security & Sharing */}
            <section className="space-y-3 border-t border-orange-200/60 dark:border-orange-900/30 pt-6">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-lg">
                <Lock className="h-5 w-5" />
                <h2>4. Data Security & Third-Party Sharing</h2>
              </div>
              <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <p>
                  We implement industry-standard encryption, password hashing, and secure token mechanisms to safeguard your data.
                </p>
                <p>
                  We do <strong>NOT</strong> sell, rent, or trade your personal information to third-party advertisers. Information is only shared between applicants and event organizers as required to complete job engagements.
                </p>
              </div>
            </section>

            {/* Your Rights */}
            <section className="space-y-3 border-t border-orange-200/60 dark:border-orange-900/30 pt-6">
              <h2 className="text-orange-600 font-bold text-lg">5. Your Rights & Choices</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You have full control over your profile data. You may update your contact information, skill categories, or request account closure at any time by accessing your profile settings or contacting support@findnearjob.in.
              </p>
            </section>

            {/* Contact */}
            <section className="space-y-3 border-t border-orange-200/60 dark:border-orange-900/30 pt-6">
              <h2 className="text-orange-600 font-bold text-lg">6. Privacy Questions</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If you have any questions or concerns regarding this Privacy Policy, please email our Data Officer at <strong>privacy@findnearjob.in</strong>.
              </p>
            </section>
          </Card>
        </Container>
      </main>

      <LandingFooter />
    </div>
  );
}
