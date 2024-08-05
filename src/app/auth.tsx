"use client";

import { UsersService } from "@/services/api/users-service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { useUserStore } from "@/services/zustand/user-store";

export default function Auth({ children }: { children: React.ReactNode }) {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const { setUser } = useUserStore();

  useEffect(() => {
    if (router && setUser) {
      const authenticate = async () => {
        const response = await UsersService.Authenticate();
        if (response.status === "fail") {
          setUser(null);
          router.push("/login");
        } else {
          setUser(response.data);
          setLoading(false);
        }
      };
      authenticate();
    }
  }, [router, setUser]);

  if (isLoading) return <Loading />;
  return children;
}
