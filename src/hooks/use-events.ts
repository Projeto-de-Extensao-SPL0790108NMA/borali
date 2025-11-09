import { useInfiniteQuery } from "@tanstack/react-query";

type Filters = {
  title?: string;
  date?: string;
};

export function useEvents(filters: Filters) {
  const fetchEvents = async ({ pageParam = 1 }) => {
    const params = new URLSearchParams({
      page: String(pageParam),
      per_page: "6",
    });

    if (filters.title) params.append("title", filters.title);

    if (filters.date) params.append("date", filters.date);

    const response = await fetch(
      `https://api.boralimanaus.com.br/events?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar eventos");
    }

    return response.json();
  };

  return useInfiniteQuery({
    queryKey: ["events-infinite", { ...filters }],
    queryFn: fetchEvents,
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.pagination;
      return page < total_pages ? page + 1 : undefined;
    },
  });
}
