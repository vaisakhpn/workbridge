import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authService } from "@/services/auth/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function useLogout() {
  const router = useRouter();

  const logoutStore = useAuthStore((state) => state.logout);

  const logout = async () => {
    try {
      await authService.logout();

      logoutStore();

      toast.success("Logged out successfully");

      router.replace("/login");
    } catch {
      toast.error("Failed to logout");
    }
  };

  return { logout };
}
