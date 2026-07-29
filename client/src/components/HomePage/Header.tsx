"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Ranking Algorithm", href: "#ranking-algorithm" },
  { label: "Expansion Plan", href: "#expansion-plan" },
  { label: "Blog", href: "#blog" },
];

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 font-extrabold text-white shadow-xs group-hover:scale-105 transition-transform">
            W
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Work<span className="text-orange-600">Bridge</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/login" className="text-sm font-semibold">
              Login
            </Link>
          </Button>

          <Button
            variant="primary"
            size="sm"
            asChild
            className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-5 font-semibold shadow-xs gap-1"
          >
            <Link href="/auth/register">
              <span>Register Now</span>
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Trigger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground py-2 border-b border-border/40"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2 pt-2">
            <Button variant="outline" size="sm" asChild className="w-full justify-center">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button
              variant="primary"
              size="sm"
              asChild
              className="w-full justify-center bg-orange-600 hover:bg-orange-700 text-white rounded-full"
            >
              <Link href="/auth/register">
                <span>Register Now</span>
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
