"use client";

import { WorkspacesService } from "@/services/api/workspaces-service";
import { State } from "@/services/redux/store";
import { useUserStore } from "@/services/zustand/user-store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const PermissionsProvider = ({ children }: { children: React.ReactNode }) => {
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const { setPermissions } = useUserStore();

  useEffect(() => {
    if (workspaceSlice.workspace?.general_information) {
      const wsId = workspaceSlice.workspace.general_information.id;
      const getUserRoleInWS = async () => {
        const response = await WorkspacesService.GetUserRoleInWorkspace(wsId);
        if (response.status === "success") {
          setPermissions(response.data.role.permissions);
        }
      };
      getUserRoleInWS();
    }
  }, [workspaceSlice, setPermissions]);

  return children;
};

export default PermissionsProvider;
