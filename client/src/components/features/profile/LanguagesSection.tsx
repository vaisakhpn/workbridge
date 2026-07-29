"use client";

import { useState } from "react";
import { Languages, Plus, X } from "lucide-react";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import type { UpdateWorkerProfileInput, WorkerProfile } from "@/types/workerProfile.types";

interface LanguagesSectionProps {
  profile: WorkerProfile;
  onSubmit: (data: UpdateWorkerProfileInput) => Promise<void>;
  isLoading?: boolean;
}

const defaultLanguages = [
  "English",
  "Malayalam",
  "Hindi",
  "Tamil",
  "Kannada",
  "Telugu",
  "Arabic",
];

export function LanguagesSection({ profile, onSubmit, isLoading = false }: LanguagesSectionProps) {
  const [languages, setLanguages] = useState<string[]>(profile.languages || []);
  const [inputVal, setInputVal] = useState("");

  const addLanguage = (langToAdd: string) => {
    const trimmed = langToAdd.trim();
    if (trimmed && !languages.some((l) => l.toLowerCase() === trimmed.toLowerCase())) {
      setLanguages((prev) => [...prev, trimmed]);
      setInputVal("");
    }
  };

  const removeLanguage = (langToRemove: string) => {
    setLanguages((prev) => prev.filter((l) => l !== langToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLanguage(inputVal);
    }
  };

  const isDirty =
    JSON.stringify(languages.sort()) !== JSON.stringify([...(profile.languages || [])].sort());

  const handleSave = async () => {
    await onSubmit({ languages });
  };

  return (
    <Card className="space-y-6 p-6">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-foreground flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Languages className="text-primary h-5 w-5" />
            Spoken Languages
          </h2>
          <p className="text-muted-foreground text-xs">
            Select the languages you can speak to communicate effectively during events.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a language (e.g. English, Malayalam)..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-border bg-background focus:border-primary flex h-10 w-full rounded-md border px-3 text-sm transition-colors outline-hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => addLanguage(inputVal)}
            disabled={!inputVal.trim()}
            className="shrink-0 gap-1"
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-muted-foreground mr-1 text-xs font-medium">Common:</span>
          {defaultLanguages
            .filter((l) => !languages.some((existing) => existing.toLowerCase() === l.toLowerCase()))
            .map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => addLanguage(lang)}
                className="border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground cursor-pointer rounded-full border px-2.5 py-1 text-xs transition-all"
              >
                + {lang}
              </button>
            ))}
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <label className="text-foreground text-xs font-semibold uppercase tracking-wider">
          Added Languages ({languages.length})
        </label>

        {languages.length === 0 ? (
          <p className="text-muted-foreground text-xs italic">No languages added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <Badge
                key={lang}
                variant="outline"
                className="border-border bg-background gap-1.5 rounded-lg px-3 py-1 text-xs font-medium"
              >
                {lang}
                <button
                  type="button"
                  onClick={() => removeLanguage(lang)}
                  className="hover:bg-destructive/20 hover:text-destructive cursor-pointer rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="button"
          onClick={handleSave}
          disabled={!isDirty || isLoading}
          loading={isLoading}
          loadingText="Saving..."
          variant="primary"
          size="sm"
        >
          Save Languages
        </Button>
      </div>
    </Card>
  );
}
