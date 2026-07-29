"use client";

import { useState } from "react";
import { Camera, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/Button";

interface ProfileAvatarProps {
  photo?: string;
  name: string;
  initials: string;
  onPhotoUpdate?: (photoUrl: string) => void;
}

export function ProfileAvatar({
  photo,
  name,
  initials,
  onPhotoUpdate,
}: ProfileAvatarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [urlInput, setUrlInput] = useState(photo || "");

  const handleSave = () => {
    if (onPhotoUpdate) {
      onPhotoUpdate(urlInput.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className="group relative flex flex-col items-center gap-2">
      <Avatar
        size="lg"
        className="border-background h-24 w-24 border-4 shadow-md sm:h-28 sm:w-28"
      >
        <AvatarImage src={photo} alt={name} />
        <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold sm:text-2xl">
          {initials || <User className="h-10 w-10" />}
        </AvatarFallback>
      </Avatar>

      {onPhotoUpdate && (
        <Button
          variant="outline"
          size="xs"
          className="gap-1 rounded-full shadow-xs"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          <Camera className="h-3.5 w-3.5" />
          {photo ? "Change" : "Upload"}
        </Button>
      )}

      {isEditing && (
        <div className="bg-popover border-border absolute top-32 z-20 w-64 space-y-2 rounded-xl border p-3 shadow-lg">
          <label className="text-foreground text-xs font-medium">
            Image URL
          </label>
          <input
            type="text"
            placeholder="https://example.com/avatar.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="bg-background border-border focus:ring-primary w-full rounded-md border px-2.5 py-1 text-xs outline-hidden focus:ring-1"
          />
          <div className="flex justify-end gap-2 pt-1">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" size="xs" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
