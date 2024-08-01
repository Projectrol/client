import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../consts";
import {
  Workspace,
  WorkspaceRole,
  WorkspacesService,
} from "@/services/api/workspaces-service";

async function getWorkspaceRoles({
  queryKey,
}: {
  queryKey: any;
}): Promise<WorkspaceRole[]> {
  const workspaceId = queryKey[1];
  const response = await WorkspacesService.GetWokspaceRoles(workspaceId);
  if (response.status === "success") {
    return response.data.roles;
  }
  return [];
}

const useWorkspaceRoles = (workspace: Workspace | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.USE_WORKSPACE_ROLES, workspace?.id],
    queryFn: getWorkspaceRoles,
    enabled: !!workspace,
  });
  return {
    roles: data ?? [],
    isLoadingWSRoles: isLoading,
    getWSRolesError: error,
  };
};

export default useWorkspaceRoles;
