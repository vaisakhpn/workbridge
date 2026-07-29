"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Upload, Building2, User } from "lucide-react";

import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface ProfileAvatarProps {
  photoUrl?: string;
  name: string;
  onPhotoUpdate: (url: string) => void;
  type?: "user" | "company";
}

export function ProfileAvatar({
  photoUrl,
  name,
  onPhotoUpdate,
  type = "user",
}: ProfileAvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newUrl, setNewUrl] = useState(photoUrl || "");
  const [imageError, setImageError] = useState(false);

  const handleSave = () => {
    if (newUrl.trim()) {
      setImageError(false);
      onPhotoUpdate(newUrl.trim());
      setIsOpen(false);
    }
  };

  const DefaultIcon = type === "company" ? Building2 : User;

  return (
    <div className="relative group shrink-0">
      <div className="border-background relative h-24 w-24 overflow-hidden rounded-2xl border-4 shadow-md bg-muted flex items-center justify-center">
        {photoUrl && !imageError ? (
          <Image
            src={photoUrl}
            alt={name}
            fill
            unoptimized
            onError={() => setImageError(true)}
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <DefaultIcon className="text-muted-foreground h-10 w-10" />
        )}
      </div>

      {/* Edit Photo Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-primary-foreground border-background absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-xs transition-transform hover:scale-105 cursor-pointer"
        title="Update Image"
      >
        <Camera size={14} />
      </button>

      {/* URL Popover */}
      {isOpen && (
        <div className="border-border bg-card absolute top-full left-0 z-50 mt-2 w-72 rounded-xl border p-3 shadow-lg">
          <p className="text-foreground mb-2 text-xs font-semibold">
            {type === "company" ? "Enter Logo Image URL" : "Enter Avatar Photo URL"}
          </p>

          <Input
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="text-xs"
          />

          <div className="mt-3 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              size="xs"
              onClick={handleSave}
              leftIcon={<Upload size={12} />}
            >
              Update
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
