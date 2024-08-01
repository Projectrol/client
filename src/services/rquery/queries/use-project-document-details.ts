import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../consts";
import {
  ProjectDocument,
  ProjectDocumentDetails,
  ProjectsService,
} from "@/services/api/projects-service";

async function getProjectDocumentDetails({
  queryKey,
}: {
  queryKey: any;
}): Promise<ProjectDocumentDetails | null> {
  const workspaceId = queryKey[1];
  const projectSlug = queryKey[2];
  const nanoid = queryKey[3];
  const response = await ProjectsService.GetProjectDocumentDetails(
    projectSlug,
    workspaceId,
    nanoid
  );
  if (response.status === "success") {
    return response.data.details;
  }
  return null;
}

const useProjectDocumentDetails = (
  workspaceId?: number,
  projectSlug?: string,
  nanoid?: string
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [
      QUERY_KEYS.USE_PROJECT_DOCUMENT_DETAILS,
      workspaceId,
      projectSlug,
      nanoid,
    ],
    queryFn: getProjectDocumentDetails,
    enabled: !!workspaceId && !!projectSlug && !!nanoid,
  });
  return {
    details: data ?? null,
    isLoading: isLoading,
    error: error,
  };
};

export default useProjectDocumentDetails;
