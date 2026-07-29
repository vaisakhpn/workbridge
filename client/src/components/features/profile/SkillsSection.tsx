"use client";

import { useState } from "react";
import { Wrench, Plus, X } from "lucide-react";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import type { UpdateWorkerProfileInput, WorkerProfile } from "@/types/workerProfile.types";

interface SkillsSectionProps {
  profile: WorkerProfile;
  onSubmit: (data: UpdateWorkerProfileInput) => Promise<void>;
  isLoading?: boolean;
}

const popularSkills = [
  "Catering",
  "Food Serving",
  "Event Decor",
  "Stage Setup",
  "Security",
  "Sound Operator",
  "Light Assistant",
  "Cleaning & Cleanup",
  "Logistics",
  "Crowd Control",
];

export function SkillsSection({ profile, onSubmit, isLoading = false }: SkillsSectionProps) {
  const [skills, setSkills] = useState<string[]>(profile.skills || []);
  const [inputVal, setInputVal] = useState("");

  const addSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (trimmed && !skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setSkills((prev) => [...prev, trimmed]);
      setInputVal("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(inputVal);
    }
  };

  const isDirty =
    JSON.stringify(skills.sort()) !== JSON.stringify([...(profile.skills || [])].sort());

  const handleSave = async () => {
    await onSubmit({ skills });
  };

  return (
    <Card className="space-y-6 p-6">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-foreground flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Wrench className="text-primary h-5 w-5" />
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-xs">
            Highlight your skills so event organizers can match you with relevant jobs.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a skill (e.g. Food Serving, Security)..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-border bg-background focus:border-primary flex h-10 w-full rounded-md border px-3 text-sm transition-colors outline-hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => addSkill(inputVal)}
            disabled={!inputVal.trim()}
            className="shrink-0 gap-1"
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-muted-foreground mr-1 text-xs font-medium">Suggestions:</span>
          {popularSkills
            .filter((s) => !skills.some((existing) => existing.toLowerCase() === s.toLowerCase()))
            .slice(0, 6)
            .map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => addSkill(suggestion)}
                className="border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground cursor-pointer rounded-full border px-2.5 py-1 text-xs transition-all"
              >
                + {suggestion}
              </button>
            ))}
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <label className="text-foreground text-xs font-semibold uppercase tracking-wider">
          Your Added Skills ({skills.length})
        </label>

        {skills.length === 0 ? (
          <p className="text-muted-foreground text-xs italic">No skills added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="border-primary/20 bg-primary/10 text-foreground gap-1.5 rounded-lg border px-3 py-1 text-xs font-medium"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
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
          Save Skills
        </Button>
      </div>
    </Card>
  );
}
