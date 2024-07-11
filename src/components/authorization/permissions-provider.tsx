"use client";

import { WorkspacesService } from "@/services/api/workspaces-service";
import { setPermissions } from "@/services/redux/slices/user";
import { State } from "@/services/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PermissionsProvider = ({ children }: { children: React.ReactNode }) => {
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const dispatch = useDispatch();

  useEffect(() => {
    if (workspaceSlice.workspace?.general_information) {
      const wsId = workspaceSlice.workspace.general_information.id;
      const getUserRoleInWS = async () => {
        const response = await WorkspacesService.GetUserRoleInWorkspace(wsId);
        if (response.status === "success") {
          dispatch(setPermissions(response.data.role.permissions));
        }
      };
      getUserRoleInWS();
    }
  }, [workspaceSlice, dispatch]);

  return children;
};

export default PermissionsProvider;
