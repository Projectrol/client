import { UsersService } from "@/services/api/users-service";
import { useUserStore } from "@/services/zustand/user-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAuth() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const pathName = usePathname();
  const userStore = useUserStore();
  const [isAuthenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    if (router && setUser) {
      const authenticate = async () => {
        const response = await UsersService.Authenticate();
        if (response.status === "fail") {
          setUser(null);
        } else {
          setUser(response.data);
        }
        setAuthenticating(false);
      };
      authenticate();
    }
  }, [router, setUser, pathName]);

  return {
    user: userStore.user,
    isAuthenticating,
  };
}
