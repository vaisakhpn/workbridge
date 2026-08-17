"use client";

import Link from "next/link";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export default function AuthHeader({
  title,
  description,
}: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 mb-6">
      {/* Brand Logo */}
      <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 font-extrabold text-white text-lg shadow-xs transition-transform group-hover:scale-105">
          J
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">
          Job<span className="text-orange-600">ora</span>
        </span>
      </Link>

      {/* Main Title */}
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}