import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../consts";
import {
  ProjectDocument,
  ProjectsService,
} from "@/services/api/projects-service";

async function getProjectDocuments({
  queryKey,
}: {
  queryKey: any;
}): Promise<ProjectDocument[]> {
  const workspaceId = queryKey[1];
  const projectSlug = queryKey[2];
  const response = await ProjectsService.GetProjectDocuments(
    projectSlug,
    workspaceId
  );
  if (response.status === "success") {
    return response.data.documents ?? [];
  }
  return [];
}

const useProjectDocuments = (workspaceId?: number, projectSlug?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.USE_PROJECT_DOCUMENTS, workspaceId, projectSlug],
    queryFn: getProjectDocuments,
    enabled: !!workspaceId && !!projectSlug,
  });
  return {
    documents: data ?? [],
    isLoading: isLoading,
    error: error,
  };
};

export default useProjectDocuments;
