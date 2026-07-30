"use client";

import { User, Building2 } from "lucide-react";

interface ProfileAvatarProps {
  photoUrl?: string;
  name?: string;
  onPhotoUpdate?: (url: string) => void;
  type?: "user" | "company";
}

export function ProfileAvatar({
  type = "user",
}: ProfileAvatarProps) {
  const Icon = type === "company" ? Building2 : User;

  return (
    <div className="relative shrink-0">
      <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border-2 border-orange-200/80 dark:border-orange-900/40 bg-orange-500/10 flex items-center justify-center shadow-xs">
        <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-orange-600" />
      </div>
    </div>
  );
}
