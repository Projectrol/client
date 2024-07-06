import { db } from "@/db";
import { Workspace } from "@/db/repositories/workspaces.repo";
import { QUERY_KEYS } from "@/services/rquery/consts";
import { useQuery } from "@tanstack/react-query";

const getWorkspaceSettings = async (): Promise<Workspace | null> => {
  return db.workspaces.getWorkspaceSettings(0);
};

export default function useWorkspace() {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.USE_WORKSPACE],
    queryFn: getWorkspaceSettings,
  });

  return {
    workspaceSettings: data,
    isLoading,
    error,
  };
}
