"use client";

import { useState } from "react";
import { Plus, X, Wrench } from "lucide-react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import type {
  UpdateWorkerProfileInput,
  WorkerProfile,
} from "@/types/workerProfile.types";

interface SkillsSectionProps {
  profile: WorkerProfile;
  onSubmit: (data: UpdateWorkerProfileInput) => Promise<void>;
  isLoading?: boolean;
}

const suggestedSkills = [
  "Catering",
  "Event Setup",
  "Cooking",
  "Decorating",
  "Sound Systems",
  "Photography Assistant",
  "Cleaning",
  "Driving",
];

export function SkillsSection({
  profile,
  onSubmit,
  isLoading = false,
}: SkillsSectionProps) {
  const [skills, setSkills] = useState<string[]>(profile.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  const handleAddSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (trimmed && !skills.includes(trimmed)) {
      const updated = [...skills, trimmed];
      setSkills(updated);
      setNewSkill("");
      setIsChanged(true);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = skills.filter((s) => s !== skillToRemove);
    setSkills(updated);
    setIsChanged(true);
  };

  const handleSave = async () => {
    await onSubmit({ skills });
    setIsChanged(false);
  };

  return (
    <Card className="space-y-6 p-6">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-foreground text-lg font-semibold tracking-tight">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-xs">
            Add skills you excel at to get relevant event job invites.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Input & Add Button */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Type a skill (e.g. Catering, Lighting)"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill(newSkill);
                }
              }}
              leftIcon={<Wrench size={18} />}
            />
          </div>

          <Button
            type="button"
            onClick={() => handleAddSkill(newSkill)}
            variant="outline"
            size="md"
            leftIcon={<Plus size={16} />}
          >
            Add
          </Button>
        </div>

        {/* Selected Skills Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {skills.length === 0 ? (
            <p className="text-muted-foreground text-xs italic">
              No skills added yet. Add some below.
            </p>
          ) : (
            skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1.5 px-3 py-1 text-xs font-semibold"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-destructive text-primary/70 transition-colors cursor-pointer"
                  title="Remove skill"
                >
                  <X size={13} />
                </button>
              </Badge>
            ))
          )}
        </div>

        {/* Suggested Skills */}
        <div className="border-border/60 border-t pt-3">
          <p className="text-muted-foreground mb-2 text-xs font-medium">
            Suggested Skills:
          </p>

          <div className="flex flex-wrap gap-1.5">
            {suggestedSkills
              .filter((s) => !skills.includes(s))
              .map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleAddSkill(suggestion)}
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
            Save Skills
          </Button>
        </div>
      </div>
    </Card>
  );
}
