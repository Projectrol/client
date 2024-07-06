"use client";

import { UsersService } from "@/services/api/users-service";
import { setUser } from "@/services/redux/slices/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "./loading";

export default function Auth({ children }: { children: React.ReactNode }) {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router && dispatch) {
      const authenticate = async () => {
        const response = await UsersService.Authenticate();
        if (response.status === "fail") {
          dispatch(setUser(null));
          router.push("/login");
        } else {
          dispatch(setUser(response.data));
          setLoading(false);
        }
      };
      authenticate();
    }
  }, [router, dispatch]);

  if (isLoading) return <Loading />;
  return children;
}
