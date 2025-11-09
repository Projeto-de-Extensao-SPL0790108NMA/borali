"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/infra/queryKey/query-key";
import { getEventById } from "../event-api";
import { EventDetailDTO } from "../event-types";

export function useGetEventById(eventId: string) {
  return useQuery<EventDetailDTO>({
    queryKey: queryKeys.event.details({ eventId }),
    queryFn: () => getEventById(eventId),
    enabled: !!eventId,
  });
}



