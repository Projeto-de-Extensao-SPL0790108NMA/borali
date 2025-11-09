"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/infra/queryKey/query-key";
import { getEventsList } from "../event-api";
import { EventListDTO, EventListPayload } from "../event-types";

export function useGetEventsList(payload: EventListPayload) {
  return useQuery<EventListDTO>({
    queryKey: queryKeys.event.list({
      companyId: payload.companyId,
      page: payload.page,
      per_page: payload.per_page,
    }),
    queryFn: () => getEventsList(payload),
    enabled: !!payload.companyId,
  });
}

