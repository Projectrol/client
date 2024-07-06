import { UsersService } from "@/services/api/users-service";
import { setUser } from "@/services/redux/slices/user";
import { State } from "@/services/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathName = usePathname();
  const userSlice = useSelector((state: State) => state.user);
  const [isAuthenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    if (router && dispatch) {
      const authenticate = async () => {
        const response = await UsersService.Authenticate();
        if (response.status === "fail") {
          dispatch(setUser(null));
        } else {
          dispatch(setUser(response.data));
        }
        setAuthenticating(false);
      };
      authenticate();
    }
  }, [router, dispatch, pathName]);

  return {
    user: userSlice.user,
    isAuthenticating,
  };
}
