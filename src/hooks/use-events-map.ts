import { useQuery } from "@tanstack/react-query";

export interface EventMarker {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  address: string;
}

export function useEventMarkers() {
  return useQuery<EventMarker[]>({
    queryKey: ["event-markers"],
    queryFn: async () => {
      const res = await fetch("https://api.boralimanaus.com.br/events/map");
      const data = await res.json();

      return data.events;
    },
  });
}
