import { db } from "@/db";
import { Project, projects } from "@/db/repositories/projects.repo";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../consts";

async function getAllProjects(): Promise<Project[]> {
  const projects = await db.projects.getAllProjects();
  return projects;
}

const useProjects = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.USE_PROJECTS],
    queryFn: getAllProjects,
  });
  return {
    projects: data ?? [],
    isLoadingProjects: isLoading,
    getProjectsError: error,
  };
};

export default useProjects;
