import { useInfiniteQuery } from "@tanstack/react-query";

export function useEvents() {
  const fetchEvents = async ({ pageParam = 1 }) => {
    const response = await fetch(
      `https://api.boralimanaus.com.br/events?page=${pageParam}&per_page=6`
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar eventos");
    }

    return response.json();
  };

  return useInfiniteQuery({
    queryKey: ["events-infinite"],
    queryFn: fetchEvents,
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.pagination;
      return page < total_pages ? page + 1 : undefined;
    },
  });
}
