import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../consts";
import {
  Permission,
  WorkspacesService,
} from "@/services/api/workspaces-service";

async function getPermissions(): Promise<Permission[]> {
  const response = await WorkspacesService.GetPermissions();
  if (response.status === "success") {
    return response.data.permissions ?? [];
  }
  return [];
}

const usePermissions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.USE_PERMISSIONS],
    queryFn: getPermissions,
  });
  return {
    permissions: data ?? [],
    isLoadingPermissions: isLoading,
    getPermissionsError: error,
  };
};

export default usePermissions;
