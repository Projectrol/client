"use client";

import { UsersService } from "@/services/api/users-service";
import {
  setWorkspace,
  setWorkspaceMembers,
  setWorkspaceRoles,
} from "@/services/redux/slices/workspace";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../loading";
import { WorkspacesService } from "@/services/api/workspaces-service";
import { useUserStore } from "@/services/zustand/user-store";

const WorkspacesProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setLoading] = useState(true);
  const [isNew, setNew] = useState(false);
  const router = useRouter();
  const userStore = useUserStore();
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
        const [getWSDetailsRes, getWSRolesRes, getWSMembersRes] =
          await Promise.all([
            await WorkspacesService.GetWorkspaceDetails(
              response.data.workspaces[0].id
            ),
            await WorkspacesService.GetWokspaceRoles(
              response.data.workspaces[0].id
            ),
            await WorkspacesService.GetWorkspaceMembers(
              response.data.workspaces[0].id
            ),
          ]);
        if (getWSDetailsRes.status === "success") {
          dispatch(setWorkspace(getWSDetailsRes.data.details));
        } else {
          dispatch(setWorkspace(null));
        }
        if (getWSRolesRes.status === "success") {
          dispatch(setWorkspaceRoles(getWSRolesRes.data.roles));
        } else {
          dispatch(setWorkspaceRoles([]));
        }
        if (getWSMembersRes.status === "success") {
          dispatch(setWorkspaceMembers(getWSMembersRes.data.members));
        } else {
          dispatch(setWorkspaceMembers([]));
        }
      }
      setLoading(false);
    };
    if (userStore.user) {
      getUserWorkspaces();
    }
  }, [userStore.user, dispatch, router]);

  if (isLoading) {
    return <Loading />;
  } else {
    if (!isNew) {
      return children;
    }
  }
};

export default WorkspacesProvider;
