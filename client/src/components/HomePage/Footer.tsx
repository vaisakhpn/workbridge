"use client";

import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30 pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-border/60 pb-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-600 font-extrabold text-white">
              W
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Work<span className="text-orange-600">Bridge</span>
            </span>
          </Link>

          {/* Footer Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">
              How it Works
            </a>
            <a href="#ranking-algorithm" className="hover:text-foreground transition-colors">
              Ranking Algorithm
            </a>
            <a href="#expansion-plan" className="hover:text-foreground transition-colors">
              Expansion Plan
            </a>
            <Link href="/auth/login" className="hover:text-foreground transition-colors">
              Login
            </Link>
            <Link href="/auth/register" className="hover:text-foreground transition-colors">
              Register
            </Link>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center sm:text-left">
          <p>© {new Date().getFullYear()} WorkBridge. All rights reserved.</p>
          <p>Connecting people with reliable temporary event staff across Kerala.</p>
        </div>
      </div>
    </footer>
  );
}
