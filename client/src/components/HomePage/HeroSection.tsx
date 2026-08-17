"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

import waveBg from "@/assets/wave.png";

export function HeroSection() {
  return (
    <section className="bg-background relative overflow-hidden pt-10 pb-36 sm:pt-16 sm:pb-48 md:pt-20 md:pb-56">
      {/* Background Wave Image Asset */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={waveBg}
          alt="Wave Background"
          fill
          priority
          className="h-full w-full object-cover object-top"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl space-y-8 px-4 text-center sm:px-6 lg:px-8">
        {/* Main Headline */}
        <div className="mx-auto max-w-4xl space-y-4">
          <h1 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            The Smarter Way To <br className="hidden sm:inline" />
            <span className="mt-1 block sm:mt-0 sm:inline">Hire Part-Time Staff</span>
          </h1>

          <p className="mx-auto max-w-2xl pt-1 text-sm leading-relaxed font-medium text-white/95 sm:text-lg">
            Find verified staff for part-time jobs, events, retail, catering, and daily gigs.
            Build a trusted network. Get work. Grow together.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mx-auto flex max-w-xs flex-col items-center justify-center gap-3.5 pt-2 sm:max-w-none sm:flex-row">
          <Button
            variant="primary"
            size="lg"
            asChild
            className="w-full gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-orange-600 shadow-lg transition-all hover:bg-white/95 hover:shadow-xl sm:w-auto"
          >
            <Link href="/signup?role=worker">
              <MapPin size={18} className="shrink-0 text-orange-600" />
              <span>Find Part-Time Jobs</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            asChild
            className="w-full gap-2 rounded-full border-2 border-orange-600 bg-white/95 px-8 py-3.5 text-base font-bold text-orange-600 shadow-lg backdrop-blur-xs transition-all hover:border-orange-700 hover:bg-orange-50 sm:w-auto"
          >
            <Link href="/signup?role=eventTeam">
              <Users size={18} className="shrink-0 text-orange-600" />
              <span>Hire Part-Time Staff</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
