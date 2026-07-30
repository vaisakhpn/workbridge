"use client";

import { LandingHeader } from "./Header";
import { HeroSection } from "./HeroSection";
import { MetricsSection } from "./MetricsSection";
import { LatestJobsSection } from "./LatestJobsSection";
import { HowItWorksSection } from "./HowItWorksSection";


import { LandingFooter } from "./Footer";

export function LandingContainer() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-600">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        <MetricsSection />
        <LatestJobsSection />
        <HowItWorksSection />
      </main>
      <LandingFooter />
    </div>
  );
}

export default LandingContainer;
