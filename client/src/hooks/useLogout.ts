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
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      logoutStore();
      toast.success("Logged out successfully");
      router.push("/");
    }
  };

  return { logout };
}
