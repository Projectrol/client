import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../consts";
import {
  Workspace,
  WorkspaceDetails,
  WorkspacesService,
} from "@/services/api/workspaces-service";

async function getWorkspaceDetails({
  queryKey,
}: {
  queryKey: any;
}): Promise<WorkspaceDetails | null> {
  const workspaceId = queryKey[1];
  const response = await WorkspacesService.GetWorkspaceDetails(workspaceId);
  if (response.status === "success") {
    return response.data.details;
  }
  return null;
}

const useWorkspaceDetails = (workspace: Workspace | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.USE_WORKSPACE_DETAILS, workspace?.id],
    queryFn: getWorkspaceDetails,
    enabled: !!workspace,
  });
  return {
    details: data ?? null,
    isLoadingWSDetails: isLoading,
    getWSDetailsError: error,
  };
};

export default useWorkspaceDetails;
