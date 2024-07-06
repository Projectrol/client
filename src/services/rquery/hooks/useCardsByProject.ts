import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../consts";

async function getCardsByProjectSlug({
  queryKey,
}: {
  queryKey: any;
}): Promise<any[]> {
  const slug = queryKey[1];
  return [];
}

const useCardsByProjectSlug = (slug: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.USE_CARDS_BY_PROJECT_SLUG, slug],
    queryFn: getCardsByProjectSlug,
  });
  return {
    cards: data ?? [],
    isLoadingCardsByProjectSlug: isLoading,
    getCardsByProjectSlugError: error,
  };
};

export default useCardsByProjectSlug;
