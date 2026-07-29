"use client";

import { useState } from "react";
import { Plus, X, Languages } from "lucide-react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import type {
  UpdateWorkerProfileInput,
  WorkerProfile,
} from "@/types/workerProfile.types";

interface LanguagesSectionProps {
  profile: WorkerProfile;
  onSubmit: (data: UpdateWorkerProfileInput) => Promise<void>;
  isLoading?: boolean;
}

const suggestedLanguages = ["Malayalam", "English", "Hindi", "Tamil", "Kannada"];

export function LanguagesSection({
  profile,
  onSubmit,
  isLoading = false,
}: LanguagesSectionProps) {
  const [languages, setLanguages] = useState<string[]>(
    profile.languages || ["Malayalam"]
  );
  const [newLanguage, setNewLanguage] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  const handleAddLanguage = (langToAdd: string) => {
    const trimmed = langToAdd.trim();
    if (trimmed && !languages.includes(trimmed)) {
      const updated = [...languages, trimmed];
      setLanguages(updated);
      setNewLanguage("");
      setIsChanged(true);
    }
  };

  const handleRemoveLanguage = (langToRemove: string) => {
    const updated = languages.filter((l) => l !== langToRemove);
    setLanguages(updated);
    setIsChanged(true);
  };

  const handleSave = async () => {
    await onSubmit({ languages });
    setIsChanged(false);
  };

  return (
    <Card className="space-y-6 p-6">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-foreground text-lg font-semibold tracking-tight">
            Languages Spoken
          </h2>
          <p className="text-muted-foreground text-xs">
            Languages you can fluently communicate in.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Input & Add Button */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Type a language (e.g. Malayalam, English)"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddLanguage(newLanguage);
                }
              }}
              leftIcon={<Languages size={18} />}
            />
          </div>

          <Button
            type="button"
            onClick={() => handleAddLanguage(newLanguage)}
            variant="outline"
            size="md"
            leftIcon={<Plus size={16} />}
          >
            Add
          </Button>
        </div>

        {/* Selected Languages Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {languages.length === 0 ? (
            <p className="text-muted-foreground text-xs italic">
              No languages added yet.
            </p>
          ) : (
            languages.map((lang) => (
              <Badge
                key={lang}
                variant="secondary"
                className="bg-accent text-foreground flex items-center gap-1.5 px-3 py-1 text-xs font-semibold"
              >
                <span>{lang}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveLanguage(lang)}
                  className="hover:text-destructive text-muted-foreground transition-colors cursor-pointer"
                  title="Remove language"
                >
                  <X size={13} />
                </button>
              </Badge>
            ))
          )}
        </div>

        {/* Suggested Languages */}
        <div className="border-border/60 border-t pt-3">
          <p className="text-muted-foreground mb-2 text-xs font-medium">
            Common Languages:
          </p>

          <div className="flex flex-wrap gap-1.5">
            {suggestedLanguages
              .filter((l) => !languages.includes(l))
              .map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleAddLanguage(suggestion)}
                  className="border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs transition-colors cursor-pointer"
                >
                  <Plus size={12} />
                  {suggestion}
                </button>
              ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="button"
            onClick={handleSave}
            disabled={!isChanged || isLoading}
            loading={isLoading}
            loadingText="Saving..."
            variant="primary"
            size="sm"
          >
            Save Languages
          </Button>
        </div>
      </div>
    </Card>
  );
}
