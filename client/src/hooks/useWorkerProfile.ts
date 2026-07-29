import { useCallback } from "react";
import { toast } from "sonner";

import { workerProfileService } from "@/services/worker/workerProfile.service";
import { useWorkerProfileStore } from "@/store/workerProfile.store";
import type { UpdateWorkerProfileInput } from "@/types/workerProfile.types";

interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useWorkerProfile() {
  const {
    profile,
    email,
    isLoading,
    isUpdating,
    error,
    setProfileData,
    updateProfileState,
    setLoading,
    setUpdating,
    setError,
  } = useWorkerProfileStore();

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await workerProfileService.getProfile();

      if (response.success && response.data) {
        setProfileData(response.data.profile, response.data.email);
      }
    } catch (err: unknown) {
      const apiErr = err as ApiErrorResponse;
      const message = apiErr?.response?.data?.message || "Failed to load worker profile";

      setError(message);
      toast.error(message);
    }
  }, [setLoading, setError, setProfileData]);

  const updateProfile = useCallback(
    async (input: UpdateWorkerProfileInput) => {
      try {
        setUpdating(true);

        const response = await workerProfileService.updateProfile(input);

        if (response.success && response.data) {
          updateProfileState(response.data);
          toast.success(response.message || "Profile updated successfully");
        }
      } catch (err: unknown) {
        const apiErr = err as ApiErrorResponse;
        const message = apiErr?.response?.data?.message || "Failed to update profile";

        toast.error(message);
        throw err;
      } finally {
        setUpdating(false);
      }
    },
    [setUpdating, updateProfileState]
  );

  return {
    profile,
    email,
    isLoading,
    isUpdating,
    error,
    fetchProfile,
    updateProfile,
  };
}
