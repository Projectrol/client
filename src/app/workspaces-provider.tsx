"use client";

import { UsersService } from "@/services/api/users-service";
import { setWorkspace } from "@/services/redux/slices/workspace";
import { State } from "@/services/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./loading";

const WorkspacesProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setLoading] = useState(true);
  const [isNew, setNew] = useState(false);
  const router = useRouter();
  const userSlice = useSelector((state: State) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserWorkspaces = async () => {
      const response = await UsersService.GetUserWorkspaces();
      if (response.status === "fail") {
        setLoading(false);
        return;
      }
      if (response.data.workspaces === null) {
        setNew(true);
        router.push("/workspace-setup/new");
      } else {
        setNew(false);
        const { id, name, slug, settings } = response.data.workspaces[0];
        dispatch(
          setWorkspace({
            id,
            name,
            slug,
            settings,
          })
        );
      }
      setLoading(false);
    };
    if (userSlice.user) {
      getUserWorkspaces();
    }
  }, [userSlice, dispatch, router]);

  if (isLoading) {
    return <Loading />;
  } else {
    if (!isNew) {
      return children;
    }
  }
};

export default WorkspacesProvider;
