import { useCallback } from "react";
import { toast } from "sonner";

import { eventTeamProfileService } from "@/services/event-team/eventTeamProfile.service";
import { useEventTeamProfileStore } from "@/store/eventTeamProfile.store";
import type { UpdateEventTeamProfileInput } from "@/types/eventTeamProfile.types";

interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useEventTeamProfile() {
  const {
    profile,
    email,
    isLoading,
    isUpdating,
    error,
    setProfile,
    setLoading,
    setUpdating,
    setError,
    updateProfileInStore,
  } = useEventTeamProfileStore();

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await eventTeamProfileService.getProfile();

      if (response.success && response.data) {
        setProfile(response.data.profile, response.data.email);
      }
    } catch (err: unknown) {
      const apiErr = err as ApiErrorResponse;
      const message =
        apiErr?.response?.data?.message || "Failed to load company profile";

      setError(message);
      toast.error(message);
    }
  }, [setLoading, setError, setProfile]);

  const updateProfile = useCallback(
    async (data: UpdateEventTeamProfileInput) => {
      try {
        setUpdating(true);

        const response = await eventTeamProfileService.updateProfile(data);

        if (response.success && response.data) {
          updateProfileInStore(response.data);
          toast.success("Company profile updated successfully");
        }
      } catch (err: unknown) {
        const apiErr = err as ApiErrorResponse;
        toast.error(
          apiErr?.response?.data?.message || "Failed to update profile"
        );
      } finally {
        setUpdating(false);
      }
    },
    [setUpdating, updateProfileInStore]
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
