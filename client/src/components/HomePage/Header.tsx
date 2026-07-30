"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { HeaderSearchBar } from "./HeaderSearchBar";
import { UserMenu } from "@/components/layout/shared/UserMenu";
import { useAuthStore } from "@/store/auth.store";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs/search" },
];

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isUserLoggedIn = mounted && isAuthenticated && Boolean(user);

  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 font-extrabold text-white shadow-xs transition-transform group-hover:scale-105">
            W
          </div>
          <span className="text-foreground xs:inline hidden text-lg font-bold tracking-tight sm:text-xl">
            Work<span className="text-orange-600">Bridge</span>
          </span>
        </Link>

        {/* Reusable Header Search Bar Component - Visible on Mobile & Desktop */}
        <div className="mx-1.5 flex max-w-[220px] flex-1 items-center sm:max-w-xs md:mx-4 md:max-w-sm">
          <HeaderSearchBar />
        </div>

        {/* Desktop Navigation Links (Home, Jobs) */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons / User Menu */}
        <div className="hidden min-h-[40px] shrink-0 items-center gap-3 md:flex">
          {isUserLoggedIn ? (
            <UserMenu />
          ) : mounted ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login" className="text-sm font-semibold">
                  Login
                </Link>
              </Button>

              <Button
                variant="primary"
                size="sm"
                asChild
                className="gap-1 rounded-full bg-orange-600 px-5 font-semibold text-white shadow-xs hover:bg-orange-700"
              >
                <Link href="/signup">
                  <span>Register Now</span>
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </>
          ) : null}
        </div>

        {/* Mobile Menu Trigger Button & User Menu */}
        <div className="flex shrink-0 items-center gap-2 md:hidden">
          {isUserLoggedIn && (
            <div className="mr-0.5">
              <UserMenu />
            </div>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-muted-foreground hover:text-foreground cursor-pointer rounded-lg p-2 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-border bg-background animate-in slide-in-from-top-2 space-y-4 border-b px-4 pt-3 pb-6 shadow-lg duration-200 md:hidden">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground border-border/40 border-b py-2 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {!isUserLoggedIn && mounted && (
            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="w-full justify-center"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                variant="primary"
                size="sm"
                asChild
                className="w-full justify-center rounded-full bg-orange-600 text-white hover:bg-orange-700"
              >
                <Link href="/signup">
                  <span>Register Now</span>
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default LandingHeader;
