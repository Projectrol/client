import { db } from "@/db";
import { Project } from "@/db/repositories/projects.repo";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../consts";
import { Card } from "@/db/repositories/cards.repo";

async function search({
  queryKey,
}: {
  queryKey: any;
}): Promise<{ projects: Project[]; cards: Card[] }> {
  const q = queryKey[1];
  const data = await db.search.search(q);
  return data;
}

const useSearch = (q: string, disabled: boolean) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.USE_SEARCH, q],
    queryFn: search,
  });
  return {
    data: data ?? { cards: [], projects: [] },
    disabled: disabled,
    isLoading,
    error,
  };
};

export default useSearch;
