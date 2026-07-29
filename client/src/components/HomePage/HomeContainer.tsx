"use client";

import { LandingHeader } from "./Header";
import { HeroSection } from "./HeroSection";
import { MetricsSection } from "./MetricsSection";
import { FeaturesSection } from "./FeaturesSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { RankingAlgorithmSection } from "./RankingAlgorithmSection";
import { ExpansionPlanSection } from "./ExpansionPlanSection";
import { LandingFooter } from "./Footer";

export function LandingContainer() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-600">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        <MetricsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <RankingAlgorithmSection />
        <ExpansionPlanSection />
      </main>
      <LandingFooter />
    </div>
  );
}

export default LandingContainer;
