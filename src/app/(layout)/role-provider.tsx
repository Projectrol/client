"use client";

import { WorkspacesService } from "@/services/api/workspaces-service";
import { State } from "@/services/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const workspaceSlice = useSelector((state: State) => state.workspace);

  useEffect(() => {
    if (workspaceSlice.workspace?.general_information) {
      const wsId = workspaceSlice.workspace.general_information.id;
      const getUserRoleInWS = async () => {
        const response = await WorkspacesService.GetUserRoleInWorkspace(wsId);
        if (response.status === "success") {
        }
      };
      getUserRoleInWS();
    }
  }, [workspaceSlice]);

  return children;
};

export default RoleProvider;
